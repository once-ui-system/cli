import fs from 'fs-extra';
import path from 'path';
import { fetchComponentContent, fetchStyleContent } from './github.js';
import { getDependencies } from './parser.js';
import { createSpinner } from './spinner.js';
import { info } from './logger.js';

const GITHUB_STYLES_BASE = 'https://raw.githubusercontent.com/once-ui-system/magic-portfolio/main/src/once-ui/styles';
const GITHUB_TOKENS_BASE = 'https://raw.githubusercontent.com/once-ui-system/magic-portfolio/main/src/once-ui/tokens';
const GITHUB_ICONS_BASE = 'https://raw.githubusercontent.com/once-ui-system/magic-portfolio/main/src/once-ui/icons.ts';
const GITHUB_INTERFACES_BASE = 'https://raw.githubusercontent.com/once-ui-system/magic-portfolio/main/src/once-ui/interfaces.ts';
const GITHUB_TYPES_BASE = 'https://raw.githubusercontent.com/once-ui-system/magic-portfolio/main/src/once-ui/types.ts';
const GITHUB_USE_DEBOUNCE_BASE = 'https://raw.githubusercontent.com/once-ui-system/magic-portfolio/main/src/once-ui/hooks/useDebounce.ts';

const styles = [
  'background.scss',
  'border.scss',
  'breakpoints.scss',
  'color.scss',
  'display.scss',
  'flex.scss',
  'global.scss',
  'grid.scss',
  'index.scss',
  'layout.scss',
  'position.scss',
  'shadow.scss',
  'size.scss',
  'spacing.scss',
  'typography.scss',
  'utilities.scss'
];

const tokens = [
  'border.scss',
  'function.scss',
  'index.scss',
  'layout.scss',
  'scheme.scss',
  'shadow.scss',
  'theme.scss',
  'typography.scss'
];

async function fetchAndInstallStylesAndTokens(targetDir) {
  for (const style of styles) {
    const styleContent = await fetchStyleContent(style);
    if (styleContent) {
      await fs.writeFile(path.join(targetDir, style), styleContent);
    }
  }

  for (const token of tokens) {
    const tokenContent = await fetchStyleContent(token);
    if (tokenContent) {
      await fs.writeFile(path.join(targetDir, token), tokenContent);
    }
  }
}

async function fetchAndInstallIcons(targetDir) {
  try {
    const response = await axios.get(GITHUB_ICONS_BASE);
    await fs.writeFile(path.join(targetDir, 'icons.ts'), response.data);
  } catch (err) {
    error(`Error fetching icons: ${err.message}`);
  }
}

async function fetchAndInstallInterfacesAndTypes(targetDir) {
  try {
    const interfacesResponse = await axios.get(GITHUB_INTERFACES_BASE);
    await fs.writeFile(path.join(targetDir, 'interfaces.ts'), interfacesResponse.data);
    
    const typesResponse = await axios.get(GITHUB_TYPES_BASE);
    await fs.writeFile(path.join(targetDir, 'types.ts'), typesResponse.data);
  } catch (err) {
    error(`Error fetching interfaces or types: ${err.message}`);
  }
}

async function fetchAndInstallUseDebounce(targetDir) {
  try {
    const response = await axios.get(GITHUB_USE_DEBOUNCE_BASE);
    await fs.writeFile(path.join(targetDir, 'hooks', 'useDebounce.ts'), response.data);
  } catch (err) {
    error(`Error fetching useDebounce: ${err.message}`);
  }
}

async function installComponent(componentName, targetDir = null) {
  // Set targetDir to the new path for consistency
  if (!targetDir) {
    targetDir = path.join('src', 'once-ui', 'components');
  }

  const spinner = createSpinner(`Installing ${componentName}...`);

  try {
    await fs.ensureDir(targetDir);
    
    // Show installation directory on first component
    if (!global.installPathShown) {
      info(`Installing components in: ${targetDir}`);
      global.installPathShown = true;
    }

    // Fetch and install the component
    const content = await fetchComponentContent(componentName);
    if (!content) {
      spinner.fail(`Failed to fetch ${componentName}`);
      return;
    }

    // Install the component file
    await installFile(`${componentName}.tsx`, content, targetDir);
    
    // Fetch and install styles, tokens, icons, interfaces, types, and useDebounce
    await fetchAndInstallStylesAndTokens(targetDir);
    await fetchAndInstallIcons(targetDir);
    await fetchAndInstallInterfacesAndTypes(targetDir);
    await fetchAndInstallUseDebounce(targetDir);

    spinner.succeed(`${componentName} installed`);

    // Install dependencies
    const dependencies = await getDependencies(content);
    for (const dep of dependencies) {
      if (dep.endsWith('.module.scss')) {
        if (!await fs.pathExists(path.join(targetDir, dep))) {
          await installComponent(dep, targetDir);
        }
      } else if (!await fs.pathExists(path.join(targetDir, `${dep}.tsx`))) {
        await installComponent(dep, targetDir);
      }
    }
  } catch (error) {
    spinner.fail(`Failed to install ${componentName}: ${error.message}`);
  }
}
