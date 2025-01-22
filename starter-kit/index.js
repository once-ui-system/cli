#!/usr/bin/env node

import inquirer from 'inquirer';
import { simpleGit } from 'simple-git';
import shell from 'shelljs';
import chalk from 'chalk';
import ora from 'ora';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const REPO_URL = 'https://github.com/once-ui-system/nextjs-starter.git';

async function main() {
  console.log(chalk.blue('\n📦 Welcome to create-once-ui-app!\n'));

  try {
    // Check if git is installed
    if (!shell.which('git')) {
      console.error(chalk.red('Error: git is required but not installed.'));
      process.exit(1);
    }

    // Prompt for project location
    const { location } = await inquirer.prompt([
      {
        type: 'list',
        name: 'location',
        message: 'Where would you like to create your project?',
        choices: [
          { name: 'Current directory', value: 'current' },
          { name: 'New directory', value: 'new' }
        ]
      }
    ]);

    let projectPath = process.cwd();

    if (location === 'new') {
      const { projectName } = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'What is the name of your project?',
          validate: input => {
            if (/^([A-Za-z\-_\d])+$/.test(input)) return true;
            return 'Project name may only include letters, numbers, underscores and hashes.';
          }
        }
      ]);

      projectPath = path.join(process.cwd(), projectName);
      shell.mkdir('-p', projectPath);
    }

    // Clone repository
    const spinner = ora('Cloning starter repository...').start();
    const git = simpleGit();
    
    try {
      await git.clone(REPO_URL, projectPath);
      spinner.succeed('Repository cloned successfully');
    } catch (error) {
      spinner.fail('Failed to clone repository');
      console.error(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }

    // Install dependencies
    const installSpinner = ora('Installing dependencies...').start();
    shell.cd(projectPath);
    
    if (shell.exec('npm install').code !== 0) {
      installSpinner.fail('Failed to install dependencies');
      console.error(chalk.red('Error: npm install failed'));
      process.exit(1);
    }
    
    installSpinner.succeed('Dependencies installed successfully');

    // Success message
    console.log(chalk.green('\n✨ Project created successfully!\n'));
    console.log(chalk.cyan('To get started:'));
    
    if (location === 'new') {
      console.log(chalk.white(`  cd ${path.basename(projectPath)}`));
    }
    
    console.log(chalk.white('  npm run dev\n'));

  } catch (error) {
    console.error(chalk.red(`\nError: ${error.message}`));
    process.exit(1);
  }
}

main().catch(error => {
  console.error(chalk.red(`\nUnexpected error: ${error.message}`));
  process.exit(1);
});