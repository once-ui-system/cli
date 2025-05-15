import { getComponents } from '../utils/components.js';
import { installComponent } from '../utils/installer.js';
import { error, success, info } from '../utils/logger.js';
import boxen from 'boxen';
import inquirer from 'inquirer';
import chalk from 'chalk';

function getProgress(current, total) {
  const width = 20;
  const filled = Math.round((current / total) * width);
  const bar = '█'.repeat(filled) + '░'.repeat(width - filled);
  const percent = Math.round((current / total) * 100);
  return `${bar} ${percent}%`;
}

async function installComponents(componentsToInstall) {
  if (componentsToInstall.length === 0) return;

  console.log(boxen(
    `\n🚀 Adding ${componentsToInstall.length} components: ${componentsToInstall.join(', ')}\n`,
    { padding: 1, borderStyle: 'round', borderColor: 'cyan' }
  ));

  info('Adding components in: ./once-ui/components\n');

  for (let i = 0; i < componentsToInstall.length; i++) {
    const component = componentsToInstall[i];
    try {
      const progress = getProgress(i + 1, componentsToInstall.length);
      process.stdout.write(chalk.cyan(`[${progress}] Installing ${component}...\r`));
      await installComponent(component);
      console.log(chalk.green(`✓ ${component} installed                                 `));
    } catch (err) {
      error(`Failed to add ${component}: ${err.message}`);
    }
  }

  console.log(boxen(
    `\n✨ All components have been added!\n`,
    { padding: 1, borderStyle: 'round', borderColor: 'cyan' }
  ));
}

export async function add(componentName) {
  const components = await getComponents();

    if (!components || components.length === 0) {
        error('No components found');
        return;
    }
  // If no component name provided, show interactive selection
  if (!componentName) {
    const choices = components.map(c => ({ name: c, value: c }));
    const { selectedComponents } = await inquirer.prompt([{
      type: 'checkbox',
      name: 'selectedComponents',
      message: 'Select components to add (space to select, a to select all):',
      choices,
      pageSize: 15,
      loop: true
    }]);

    return installComponents(selectedComponents);
  }

  // Handle direct component names
  const requestedComponents = componentName.split(' ').filter(Boolean);
  const validComponents = requestedComponents.filter(name => 
    components.find(c => c.toLowerCase() === name.toLowerCase())
  );

  if (validComponents.length !== requestedComponents.length) {
    const invalidComponents = requestedComponents.filter(name => 
      !components.find(c => c.toLowerCase() === name.toLowerCase())
    );
    error(`Some components were not found: ${invalidComponents.join(', ')}`);
    console.log(boxen(
      `Available components:\n${components.join(', ')}`,
      { padding: 1, margin: 1, borderStyle: 'round', borderColor: 'cyan' }
    ));
    return;
  }

  return installComponents(validComponents);
}
