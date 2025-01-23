import { components } from '../utils/components.js';
import gradient from 'gradient-string';
import boxen from 'boxen';
import figlet from 'figlet';

export async function list() {
  console.log(
    gradient.pastel(
      figlet.textSync('Once UI Kit', { font: 'Small' })
    )
  );

  console.log(boxen(
    gradient.morning('\nAvailable Components:\n\n') +
    components.map(c => gradient.cristal(`• ${c}`)).join('\n'),
    { padding: 1, margin: 1, borderStyle: 'round', borderColor: 'cyan' }
  ));
}