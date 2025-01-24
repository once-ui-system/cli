#!/usr/bin/env node

import { program } from 'commander';
import { init } from '../src/commands/init.js';
import { add } from '../src/commands/add.js';
import { list } from '../src/commands/list.js';
import { welcome } from '../src/utils/ui.js';

welcome();

program
  .name('once-ui-cli')
  .description('CLI tool for installing Once UI Kit components')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize and select components to install')
  .action(init);

program
  .command('add <component>')
  .description('Add a specific component')
  .action(add);

program
  .command('list')
  .description('List all available components')
  .action(list);

program.parse();
