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
  // Check for Next.js pages directory structure
  if (await fs.pathExists('./pages')) {
    return './once-ui/components';
  }
  // Check for src directory structure
  if (await fs.pathExists('./src')) {
    if (await fs.pathExists('./src/app')) {
      return './src/once-ui/components';
    }
    if (await fs.pathExists('./src/pages')) {
      return './src/once-ui/components';
    }
  }
  // Default to root components directory
  return './once-ui/components';
}

async function detectAppStructure() {
  // Check for Next.js app directory structure
  if (await fs.pathExists('./app')) {
    return './app';
  }
  // Check for Next.js pages directory structure
  if (await fs.pathExists('./pages')) {
    return './pages';
  }
  // Check for src directory structure
  if (await fs.pathExists('./src')) {
    if (await fs.pathExists('./src/app')) {
      return './src/app';
    }
    if (await fs.pathExists('./src/pages')) {
      return './src/pages';
    }
  }
  // Default to app directory
  return './app';
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

async function ensureLayoutImports() {
  const appDir = await detectAppStructure();
  const layoutPath = path.join(appDir, 'layout.css');

  const imports = [
    '@import "@/once-ui/styles/index.scss";',
    '@import "@/once-ui/tokens/index.scss";'
  ];

  try {
    let content = '';
    if (await fs.pathExists(layoutPath)) {
      content = await fs.readFile(layoutPath, 'utf-8');
    }

    // Check if imports already exist
    const hasImports = imports.every(imp => content.includes(imp));
    if (!hasImports) {
      // Add imports at the beginning of the file
      const newContent = imports.join('\n') + '\n\n' + content;
      await fs.writeFile(layoutPath, newContent);
    }
  } catch (err) {
    console.error('Failed to update layout.css:', err.message);
  }
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

    // Ensure layout.css has required imports
    await ensureLayoutImports();
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

async function fetchConfigContent() {
  const GITHUB_CONFIG_URL = 'https://raw.githubusercontent.com/once-ui-system/nextjs-starter/main/src/app/resources/config.js';
  try {
    const response = await axios.get(GITHUB_CONFIG_URL);
    return response.data;
  } catch (err) {
    console.error('Failed to fetch config file:', err.message);
    return '';
  }
}

async function installConfigFile() {
  const appDir = await detectAppStructure();
  const resourcesDir = path.join(appDir, 'resources');

  try {
    await fs.ensureDir(resourcesDir);
    const configContent = await fetchConfigContent();
    if (configContent) {
      await installFile('config.js', configContent, resourcesDir);
      console.log('✓ Config file installed');
    } else {
      console.error('Failed to install config file: No content received');
    }
  } catch (err) {
    console.error('Failed to install config file:', err.message);
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