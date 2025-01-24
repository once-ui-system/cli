import { components } from '../utils/components.js';
import { installComponent } from '../utils/installer.js';
import { error, success } from '../utils/logger.js';
import gradient from 'gradient-string';
import boxen from 'boxen';

export async function add(componentName) {
  // Check if the component exists
  if (!components.includes(componentName)) {
    error(`Component "${componentName}" not found.`);
    console.log(boxen(
      gradient.cristal(`Available components:\n${components.join(', ')}`),
      { padding: 1, margin: 1, borderStyle: 'round', borderColor: 'cyan' }
    ));
    return;
  }

  // Proceed to install the component
  try {
    await installComponent(componentName);
    success(`${componentName} added successfully!`);
  } catch (err) {
    error(`Failed to add ${componentName}: ${err.message}`);
  }
}
