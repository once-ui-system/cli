import gradient from 'gradient-string';
import figlet from 'figlet';
import boxen from 'boxen';

export function welcome() {
  console.log('\n' + gradient.morning(
    figlet.textSync('Once UI CLI', {
      font: 'Small',
      horizontalLayout: 'full'
    })
  ));
  
  console.log(boxen(
    gradient.cristal('Welcome to Once UI CLI'),
    { 
      padding: 1,
      borderStyle: 'round',
      borderColor: 'cyan'
    }
  ));
}