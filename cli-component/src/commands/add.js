import { components } from '../utils/components.js';
import { installComponent } from '../utils/installer.js';
import { error, info } from '../utils/logger.js';
import gradient from 'gradient-string';
import boxen from 'boxen';

export async function add(componentName) {
  if (!components.includes(componentName)) {
    error(`Component "${componentName}" not found.`);
    info('\nAvailable components:');
    console.log(boxen(
      gradient.cristal(components.join(', ')),
      { padding: 1, margin: 1, borderStyle: 'round', borderColor: 'cyan' }
    ));
    return;
  }

  await installComponent(componentName);
}