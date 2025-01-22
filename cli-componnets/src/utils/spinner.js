import ora from 'ora';
import gradient from 'gradient-string';

export function createSpinner(text) {
  return ora({
    text: gradient.pastel(text),
    spinner: 'dots',
    color: 'cyan'
  });
}