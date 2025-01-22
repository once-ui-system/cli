# create-once-ui-app

A CLI tool to quickly create new projects using the Once UI Next.js starter kit.

## Features

- Clones the official Once UI Next.js starter kit
- Interactive CLI interface
- Option to create project in current directory or new folder
- Automatic dependency installation
- Simple and straightforward setup process

## Installation

You can use this package directly with npx (recommended):

```bash
npx create-once-ui-app@latest
```

Or install it globally:

```bash
npm install -g create-once-ui-app
```

## Usage

### Using npx (recommended)

```bash
npx create-once-ui-app@latest
```

### If installed globally

```bash
create-once-ui-app
```

Follow the interactive prompts to:
1. Choose whether to use the current directory or create a new one
2. If creating a new directory, provide a name for your project

The tool will then:
1. Clone the Once UI Next.js starter kit
2. Install all dependencies
3. Set up your project and make it ready for development

## Development

After creating your project:

1. Navigate to your project directory (if a new directory was created)
2. Start the development server:
   ```bash
   npm run dev
   ```

## How it Works

The tool performs the following steps:

1. Checks if git is installed on your system
2. Prompts you for project location preferences
3. Clones the Once UI Next.js starter repository
4. Automatically installs all required dependencies
5. Sets up your project for immediate development

## Requirements

- Node.js 14.0.0 or later
- Git installed on your system
- npm or yarn package manager

## License

MIT