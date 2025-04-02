import { installSharedResources } from '../utils/installer.js';
import { success, info } from '../utils/logger.js';
import { createSpinner } from '../utils/spinner.js';
import gradient from 'gradient-string';
import boxen from 'boxen';

export async function init() {
  const spinner = createSpinner('Preparing to install shared resources...');
  
  try {
    console.log(boxen(
      gradient.morning('\n📦 Installing shared resources...\n'),
      { padding: 1, borderStyle: 'round', borderColor: 'cyan' }
    ));

    await installSharedResources();

    success('All shared resources installed successfully! 🎉');
  } catch (error) {
    spinner.fail(`Initialization failed: ${error.message}`);
  }
}
