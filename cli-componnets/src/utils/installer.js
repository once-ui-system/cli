import fs from 'fs-extra';
import path from 'path';
import { fetchComponentContent, fetchStyleContent } from './github.js';
import { getDependencies } from './parser.js';
import { createSpinner } from './spinner.js';
import { info } from './logger.js';

async function detectProjectStructure() {
  // Check for Next.js app directory structure
  if (await fs.pathExists('./app')) {
    return './app/components/once-ui-comp';
  }
  // Check for src directory structure
  if (await fs.pathExists('./src')) {
    return './src/components/once-ui-comp';
  }
  // Default to root components directory
  return './components/once-ui-comp';
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

  const spinner = createSpinner(`Installing ${componentName}...`);

  try {
    await fs.ensureDir(targetDir);
    
    // Show installation directory on first component
    if (!global.installPathShown) {
      info(`Installing components in: ${targetDir}`);
      global.installPathShown = true;
    }
    
    // If it's a SCSS file
    if (componentName.endsWith('.module.scss')) {
      const componentBaseName = componentName.replace('.module.scss', '');
      const styleContent = await fetchStyleContent(componentBaseName);
      if (styleContent) {
        await installFile(componentName, styleContent, targetDir);
        spinner.succeed(`Installed style: ${componentName}`);
      }
      return;
    }

    // Fetch and install the component
    const content = await fetchComponentContent(componentName);
    if (!content) {
      spinner.fail(`Failed to fetch ${componentName}`);
      return;
    }

    // Install the component file
    await installFile(`${componentName}.tsx`, content, targetDir);
    
    // Fetch and install the component's style file
    const styleContent = await fetchStyleContent(componentName);
    if (styleContent) {
      await installFile(`${componentName}.module.scss`, styleContent, targetDir);
    }

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