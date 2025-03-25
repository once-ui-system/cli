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
const { execSync } = require('child_process');
const semver = require('semver');

const git = simpleGit();

// Check Node.js version
const requiredNodeVersion = '18.17.0';
if (!semver.satisfies(process.version, `>=${requiredNodeVersion}`)) {
  console.error(chalk.red(`Error: Node.js version ${requiredNodeVersion} or higher is required.`));
  process.exit(1);
}

// Available templates
const templates = [
  {
    name: 'Minimal (Recommended)',
    value: 'minimal',
    description: 'Clean and minimal design with focus on content'
  },
  {
    name: 'Creative',
    value: 'creative',
    description: 'Bold and creative design with animations'
  },
  {
    name: 'Professional',
    value: 'professional',
    description: 'Corporate-style portfolio with advanced features'
  }
];

// Professional Header with gradient
const header = boxen(
  gradient.pastel('MAGIC PORTFOLIO') + '\n' +
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
        if (!/^[a-zA-Z0-9-_]+$/.test(input)) {
          return chalk.red('Project name can only contain letters, numbers, hyphens, and underscores');
        }
        return true;
      }
    }
  ]);

  // Ask for template selection
  const { template } = await inquirer.prompt([
    {
      type: 'list',
      name: 'template',
      message: chalk.blue('Choose a template for your portfolio:'),
      choices: templates,
      default: 'minimal'
    }
  ]);

  // Ask for features
  const { features } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'features',
      message: chalk.blue('Select additional features:'),
      choices: [
        { name: 'Dark Mode', value: 'darkMode', checked: true },
        { name: 'Blog Section', value: 'blog' },
        { name: 'Project Showcase', value: 'projects', checked: true },
        { name: 'Contact Form', value: 'contact', checked: true },
        { name: 'Analytics Integration', value: 'analytics' },
        { name: 'SEO Optimization', value: 'seo', checked: true },
        { name: 'Multi-language Support', value: 'i18n' },
        { name: 'Custom Animations', value: 'animations' }
      ]
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

  // Configure project based on selections
  try {
    const configDir = path.join(projectPath, 'src/app/resources/config');
    const configPath = path.join(configDir, 'site.js');
    
    // Create default config
    const defaultConfig = {
      template: 'minimal',
      features: [],
      featureConfigs: {
        darkMode: {
          enabled: false,
          defaultTheme: 'light',
          storageKey: 'theme-preference'
        },
        blog: {
          enabled: false,
          postsPerPage: 10,
          categories: ['All', 'Technology', 'Design', 'Development']
        },
        projects: {
          enabled: false,
          layout: 'grid',
          filterable: true,
          categories: ['All', 'Web', 'Mobile', 'Design']
        },
        contact: {
          enabled: false,
          formEndpoint: '/api/contact',
          fields: ['name', 'email', 'message']
        },
        analytics: {
          enabled: false,
          provider: 'google',
          trackingId: ''
        },
        seo: {
          enabled: false,
          defaultTitle: 'My Portfolio',
          defaultDescription: 'A professional portfolio built with Magic Portfolio',
          openGraph: true,
          twitterCards: true
        },
        i18n: {
          enabled: false,
          defaultLocale: 'en',
          locales: ['en', 'es', 'fr'],
          fallbackLocale: 'en'
        },
        animations: {
          enabled: false,
          type: 'fade',
          duration: 500,
          easing: 'ease-in-out'
        }
      }
    };

    // Ensure config directory exists
    await fs.ensureDir(configDir);
    
    // Create initial config file
    await fs.writeFile(configPath, `module.exports = ${JSON.stringify(defaultConfig, null, 2)}`);
    
    // Update config with selected features
    const config = defaultConfig;
    config.template = template;
    config.features = features;
    
    // Configure each selected feature
    Object.keys(config.featureConfigs).forEach(feature => {
      if (features.includes(feature)) {
        config.featureConfigs[feature].enabled = true;
      }
    });
    
    // Write updated config
    await fs.writeFile(configPath, `module.exports = ${JSON.stringify(config, null, 2)}`);

    // Create feature-specific files and directories
    const featureSetup = async () => {
      // Create blog directory if enabled
      if (features.includes('blog')) {
        await fs.ensureDir(path.join(projectPath, 'src/app/resources/content/blog'));
        await fs.writeJson(path.join(projectPath, 'src/app/resources/content/blog/index.json'), {
          posts: [],
          categories: config.featureConfigs.blog.categories
        });
      }

      // Create projects directory if enabled
      if (features.includes('projects')) {
        await fs.ensureDir(path.join(projectPath, 'src/app/resources/content/projects'));
        await fs.writeJson(path.join(projectPath, 'src/app/resources/content/projects/index.json'), {
          projects: [],
          categories: config.featureConfigs.projects.categories
        });
      }

      // Create i18n translations if enabled
      if (features.includes('i18n')) {
        const i18nDir = path.join(projectPath, 'src/app/resources/i18n');
        await fs.ensureDir(i18nDir);
        for (const locale of config.featureConfigs.i18n.locales) {
          await fs.writeJson(path.join(i18nDir, `${locale}.json`), {
            common: {
              nav: {},
              footer: {},
              buttons: {}
            },
            home: {},
            about: {},
            projects: {},
            contact: {}
          });
        }
      }

      // Create contact API route if enabled
      if (features.includes('contact')) {
        const apiDir = path.join(projectPath, 'src/app/api/contact');
        await fs.ensureDir(apiDir);
        await fs.writeFile(path.join(apiDir, 'route.js'), `
export async function POST(req) {
  try {
    const body = await req.json();
    // Add your email service integration here
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
        `);
      }

      // Create theme provider if dark mode is enabled
      if (features.includes('darkMode')) {
        const providersDir = path.join(projectPath, 'src/app/providers');
        await fs.ensureDir(providersDir);
        await fs.writeFile(path.join(providersDir, 'ThemeProvider.js'), `
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-preference') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme-preference', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
        `);
      }
    };

    await featureSetup();
  } catch (error) {
    console.log(chalk.yellow('\nWarning: Could not update configuration file. You may need to configure it manually.'));
    console.log(chalk.red(error.message));
  }

  // Install dependencies if automatic
  if (installType === 'auto') {
    const installSpinner = ora({
      text: chalk.blue('Installing dependencies...'),
      color: 'blue'
    }).start();
    
    try {
      execSync('npm install', { cwd: projectPath, stdio: 'inherit' });
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