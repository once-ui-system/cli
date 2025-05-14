import inquirer from 'inquirer';
import { getComponents } from '../utils/components.js';
import { installComponent } from '../utils/installer.js';
import { success, info } from '../utils/logger.js';
import { createSpinner } from '../utils/spinner.js';
import gradient from 'gradient-string';
import boxen from 'boxen';

export async function init() {
  const components = await getComponents();
  const spinner = createSpinner('Preparing component list...');
  
  try {
    const answers = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'components',
        message: 'Select components to add:',
        choices: components.map(c => ({
          name: c,
          value: c
        })),
        pageSize: 20,
        loop: false
      }
    ]);

    if (answers.components.length === 0) {
      info('No components selected');
      return;
    }

    console.log(boxen(
      gradient.morning('\n🚀 Adding selected components...\n'),
      { padding: 1, borderStyle: 'round', borderColor: 'cyan' }
    ));

    for (const component of answers.components) {
      await installComponent(component);
    }

    success('All components added successfully! 🎉');
  } catch (error) {
    spinner.fail(`Initialization failed: ${error.message}`);
  }
}
