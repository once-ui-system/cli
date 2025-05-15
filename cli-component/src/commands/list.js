import { getComponents } from '../utils/components.js';
import gradient from 'gradient-string';
import boxen from 'boxen';
import figlet from 'figlet';
import { error } from "../utils/logger.js";

export async function list() {
  console.log(
    gradient.pastel(
      figlet.textSync('Once UI CLI', { font: 'Small' })
    )
  );

  const components = await getComponents();

    if (!components || components.length === 0) {
      error('No components found');
    }

  console.log(boxen(
    gradient.morning('\nAvailable Components:\n\n') +
    components.map(c => gradient.cristal(`• ${c}`)).join('\n'),
    { padding: 1, margin: 1, borderStyle: 'round', borderColor: 'cyan' }
  ));
}
