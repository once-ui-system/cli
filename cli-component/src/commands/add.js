import { components } from '../utils/components.js';
import { installComponent } from '../utils/installer.js';
import { error, success } from '../utils/logger.js';
import boxen from 'boxen';

export async function add(componentName) {
  // Convert component name to lowercase for case-insensitive comparison
  const normalizedComponentName = componentName.toLowerCase();
  const normalizedComponents = components.map(c => c.toLowerCase());
  
  // Find the original case version of the component
  const originalComponentName = components.find(c => c.toLowerCase() === normalizedComponentName);
  
  // Check if the component exists
  if (!normalizedComponents.includes(normalizedComponentName)) {
    error(`Component "${componentName}" not found.`);
    console.log(boxen(
      `Available components:\n${components.join(', ')}`,
      { padding: 1, margin: 1, borderStyle: 'round', borderColor: 'cyan' }
    ));
    return;
  }

  // Proceed to install the component using the original case version
  try {
    await installComponent(originalComponentName);
    success(`${originalComponentName} added successfully!`);
  } catch (err) {
    error(`Failed to add ${originalComponentName}: ${err.message}`);
  }
}
