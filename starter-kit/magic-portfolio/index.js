#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const simpleGit = require('simple-git');
const fs = require('fs-extra');
const path = require('path');
const gradient = require('gradient-string');
const { default: boxen } = require('boxen');
const terminalLink = require('terminal-link');

const git = simpleGit();

// Professional Header
const header = boxen(
  chalk.blue('MAGIC PORTFOLIO') + '\n' +
  chalk.gray('Professional Portfolio Generator'),
  {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'blue',
    backgroundColor: 'white'
  }
);

async function createMagicPortfolio() {
  // Clear console and show header
  console.clear();
  console.log(header);
  console.log(boxen(chalk.blue('Create your professional portfolio with Magic Portfolio CLI'), {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'blue'
  }));
  
  // Welcome message
  console.log(chalk.blue('\nWelcome to Magic Portfolio CLI\n'));
  
  // Ask for project name
  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: chalk.blue('What would you like to name your project?'),
      default: 'my-portfolio',
      validate: (input) => {
        if (input.trim().length === 0) {
          return chalk.red('Project name cannot be empty');
        }
        return true;
      }
    }
  ]);

  // Ask for installation type
  const { installType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'installType',
      message: chalk.blue('How would you like to install dependencies?'),
      choices: [
        { name: 'Automatic (recommended)', value: 'auto' },
        { name: 'Manual', value: 'manual' }
      ],
      default: 'auto'
    }
  ]);

  const projectPath = path.join(process.cwd(), projectName);
  
  // Create project directory
  try {
    await fs.ensureDir(projectPath);
    console.log(chalk.green(`\n📁 Created project directory: ${projectName}`));
  } catch (error) {
    console.error(chalk.red('Error creating project directory:', error));
    process.exit(1);
  }

  // Clone repository
  const spinner = ora({
    text: chalk.blue('Cloning Magic Portfolio repository...'),
    color: 'blue'
  }).start();
  
  try {
    // Set a timeout for the clone operation
    const clonePromise = git.clone('https://github.com/once-ui-system/magic-portfolio.git', projectPath);
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Clone operation timed out after 5 minutes')), 5 * 60 * 1000);
    });

    await Promise.race([clonePromise, timeoutPromise]);
    spinner.succeed(chalk.green('Repository cloned successfully!'));
  } catch (error) {
    spinner.fail(chalk.red('Error cloning repository:'));
    if (error.message.includes('timed out')) {
      console.log(chalk.yellow('\nThe cloning process is taking too long. This might be due to:'));
      console.log(chalk.yellow('1. Slow internet connection'));
      console.log(chalk.yellow('2. Large repository size'));
      console.log(chalk.yellow('3. GitHub rate limiting'));
      console.log(chalk.yellow('\nPlease try again or check your internet connection.'));
    } else {
      console.log(chalk.red(error.message));
    }
    process.exit(1);
  }

  // Install dependencies if automatic
  if (installType === 'auto') {
    const installSpinner = ora({
      text: chalk.blue('Installing dependencies...'),
      color: 'blue'
    }).start();
    
    try {
      await new Promise((resolve, reject) => {
        const { exec } = require('child_process');
        exec('npm install', { cwd: projectPath }, (error) => {
          if (error) reject(error);
          else resolve();
        });
      });
      installSpinner.succeed(chalk.green('Dependencies installed successfully!'));
    } catch (error) {
      installSpinner.fail(chalk.red('Error installing dependencies:', error));
      console.log(chalk.yellow('\nYou can install dependencies manually by running:'));
      console.log(chalk.cyan(`cd ${projectName} && npm install`));
    }
  } else {
    console.log(chalk.yellow('\nTo install dependencies, run:'));
    console.log(chalk.cyan(`cd ${projectName} && npm install`));
  }

  // Final instructions with box
  const nextSteps = boxen(
    chalk.green('Magic Portfolio setup complete!\n\n') +
    chalk.blue('Next steps:\n') +
    chalk.white(`1. cd ${projectName}\n`) +
    chalk.white('2. npm run dev\n') +
    chalk.white('3. Edit src/app/resources/config for configuration\n') +
    chalk.white('4. Edit src/app/resources/content for content\n\n') +
    chalk.blue('Documentation: ') + terminalLink('https://magic-portfolio.com', 'https://magic-portfolio.com'),
    {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'blue'
    }
  );
  
  console.log(nextSteps);
}

program
  .name('magic-portfolio-cli')
  .description('✨ Professional CLI tool for creating Magic Portfolio projects')
  .action(createMagicPortfolio);

program.parse(); 