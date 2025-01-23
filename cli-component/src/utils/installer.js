import fs from 'fs-extra';
import path from 'path';
import { fetchComponentContent, fetchStyleContent } from './github.js';
import { getDependencies } from './parser.js';
import { createSpinner } from './spinner.js';
import { info } from './logger.js';

const GITHUB_STYLES_BASE = 'https://raw.githubusercontent.com/once-ui-system/magic-portfolio/main/src/once-ui/styles';
const GITHUB_TOKENS_BASE = 'https://raw.githubusercontent.com/once-ui-system/magic-portfolio/main/src/once-ui/tokens';

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

async function installComponent(componentName, targetDir = null) {
  // Detect project structure if targetDir not provided
  if (!targetDir) {
    targetDir = await detectProjectStructure();
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
    
    // Fetch and install styles and tokens
    await fetchAndInstallStylesAndTokens(targetDir);

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
