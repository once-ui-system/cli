import fs from 'fs-extra';
import path from 'path';
import axios from 'axios';
import { fetchComponentContent, fetchStyleContent, fetchStyleFile, fetchTokenFile } from './github.js';
import { getDependencies } from './parser.js';

async function detectProjectStructure() {
  // Check for Next.js app directory structure
  if (await fs.pathExists('./app')) {
    return './once-ui/components';
  }
  // Check for src directory structure
  if (await fs.pathExists('./src')) {
    return './src/once-ui/components';
  }
  // Default to root components directory
  return './once-ui/components';
}

async function installFile(fileName, content, targetDir) {
  if (content) {
    await fs.writeFile(
      path.join(targetDir, fileName),
      content
    );
    return true;
  }
  return false;
}

export async function installComponent(componentName, targetDir = null) {
  // Detect project structure if targetDir not provided
  if (!targetDir) {
    targetDir = await detectProjectStructure();
  }

  try {
    await fs.ensureDir(targetDir);

    // If it's a SCSS file
    if (componentName.endsWith('.module.scss')) {
      const componentBaseName = componentName.replace('.module.scss', '');
      const styleContent = await fetchStyleContent(componentBaseName);
      if (styleContent) {
        await installFile(componentName, styleContent, targetDir);
      }
      return;
    }

    // Fetch and install the component
    const content = await fetchComponentContent(componentName);
    if (!content) {
      return;
    }

    // Install the component file
    await installFile(`${componentName}.tsx`, content, targetDir);

    // Fetch and install the component's style file
    const styleContent = await fetchStyleContent(componentName);
    if (styleContent) {
      await installFile(`${componentName}.module.scss`, styleContent, targetDir);
    }

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

    // Install styles and tokens
    await installStylesAndTokens();

    // Create icons.ts file
    await createIconsFile();

    // Install interfaces and types
    await installInterfacesAndTypes();

    // Create hooks directory and install useDebounce
    await installUseDebounce();

    // Install config.js file
    await installConfigFile();
  } catch (error) {
    throw error;
  }
}

async function createIconsFile() {
  const iconsFilePath = './once-ui/icons.ts';
  const iconsContent = await fetchIconsContent();
  await installFile('icons.ts', iconsContent, './once-ui');
}

async function fetchIconsContent() {
  const GITHUB_ICONS_URL = 'https://raw.githubusercontent.com/once-ui-system/nextjs-starter/main/src/once-ui/icons.ts';
  try {
    const response = await axios.get(GITHUB_ICONS_URL);
    return response.data;
  } catch (err) {
    return '';
  }
}

async function installInterfacesAndTypes() {
  const interfacesContent = await fetchInterfacesContent();
  const typesContent = await fetchTypesContent();
  await installFile('interfaces.ts', interfacesContent, './once-ui');
  await installFile('types.ts', typesContent, './once-ui');
}

async function fetchInterfacesContent() {
  const GITHUB_INTERFACES_URL = 'https://raw.githubusercontent.com/once-ui-system/nextjs-starter/main/src/once-ui/interfaces.ts';
  try {
    const response = await axios.get(GITHUB_INTERFACES_URL);
    return response.data;
  } catch (err) {
    return '';
  }
}

async function fetchTypesContent() {
  const GITHUB_TYPES_URL = 'https://raw.githubusercontent.com/once-ui-system/nextjs-starter/main/src/once-ui/types.ts';
  try {
    const response = await axios.get(GITHUB_TYPES_URL);
    return response.data;
  } catch (err) {
    return '';
  }
}

async function installUseDebounce() {
  const hooksDir = './once-ui/hooks';
  await fs.ensureDir(hooksDir);
  const useDebounceContent = await fetchUseDebounceContent();
  await installFile('useDebounce.ts', useDebounceContent, hooksDir);
}

async function fetchUseDebounceContent() {
  const GITHUB_USE_DEBOUNCE_URL = 'https://raw.githubusercontent.com/once-ui-system/nextjs-starter/main/src/once-ui/hooks/useDebounce.ts';
  try {
    const response = await axios.get(GITHUB_USE_DEBOUNCE_URL);
    return response.data;
  } catch (err) {
    return '';
  }
}

async function installConfigFile() {
  const resourcesDir = './once-ui/resources';
  await fs.ensureDir(resourcesDir);
  const configContent = await fetchConfigContent();
  await installFile('config.js', configContent, resourcesDir);
}

async function fetchConfigContent() {
  const GITHUB_CONFIG_URL = 'https://raw.githubusercontent.com/once-ui-system/nextjs-starter/main/src/once-ui/resources/config.js';
  try {
    const response = await axios.get(GITHUB_CONFIG_URL);
    return response.data;
  } catch (err) {
    return '';
  }
}

async function installStylesAndTokens() {
  const stylesDir = './once-ui/styles';
  const tokensDir = './once-ui/tokens';

  await fs.ensureDir(stylesDir);
  await fs.ensureDir(tokensDir);

  const styles = [
    'background.scss', 'border.scss', 'breakpoints.scss',
    'color.scss', 'display.scss', 'flex.scss', 'global.scss',
    'grid.scss', 'index.scss', 'layout.scss', 'position.scss',
    'shadow.scss', 'size.scss', 'spacing.scss', 'typography.scss',
    'utilities.scss'
  ];

  for (const style of styles) {
    const styleContent = await fetchStyleFile(style);
    await installFile(style, styleContent, stylesDir);
  }

  const tokens = [
    'border.scss', 'function.scss', 'index.scss',
    'layout.scss', 'scheme.scss', 'shadow.scss',
    'theme.scss', 'typography.scss'
  ];

  for (const token of tokens) {
    const tokenContent = await fetchTokenFile(token);
    await installFile(token, tokenContent, tokensDir);
  }
}