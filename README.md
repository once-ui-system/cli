# Once UI Ecosystem 🎨

A comprehensive toolkit for building beautiful Next.js applications with Once UI components. This repository includes two powerful tools:

1. **Once UI Kit CLI** - Install and manage Once UI components in your existing projects
2. **create-once-ui-app** - Bootstrap new projects with the Once UI Next.js starter kit

![Once UI Kit CLI](https://raw.githubusercontent.com/once-ui-system/nextjs-starter/main/public/once-ui-banner.png)

## 🚀 Quick Start

### Create a New Project

```bash
# Create a new Once UI project
npx create-once-ui-app@latest
```

### Add Components to Existing Project

```bash
# Install components in your project
npx once-ui-kit init
```

## ✨ Features

### Once UI Kit CLI
- 🎯 Interactive component selection
- 🔄 Automatic dependency resolution
- 🎨 SCSS module support
- 📁 Smart project structure detection
- 💅 Professional CLI interface
- ⚡ Fast and easy installation
- 🔍 Component preview and search
- 🛠️ Zero configuration needed

### create-once-ui-app
- 🏗️ Clones the official Once UI Next.js starter kit
- 🤖 Interactive CLI interface
- 📂 Flexible project location options
- 📦 Automatic dependency installation
- 🎮 Simple setup process

## 📦 Installation & Usage

### Create New Project

```bash
# Using npx (recommended)
npx create-once-ui-app@latest

# Or install globally
npm install -g create-once-ui-app
create-once-ui-app
```

Follow the interactive prompts to:
1. Choose project location (current directory or new folder)
2. Provide project name (if creating new directory)
3. Wait for automatic setup and installation

### Install Components

```bash
# Using npx (recommended)
npx once-ui-kit <command>

# Or install globally
npm install -g once-ui-kit
once-ui-kit <command>
```

Available commands:

```bash
# Initialize and select components
npx once-ui-kit init

# Add a specific component
npx once-ui-kit add <component-name>

# List all available components
npx once-ui-kit list
```

## 📚 Available Components

<details>
<summary>Click to expand component list</summary>

- Accordion
- Arrow
- Avatar
- AvatarGroup
- Badge
- Background
- Button
- Carousel
- Card
- Column
- Checkbox
- Chip
- ColorInput
- DateInput
- DatePicker
- DateRangePicker
- Dialog
- Dropdown
- DropdownWrapper
- Fade
- Feedback
- Flex
- GlitchFx
- Grid
- Heading
- HoloFx
- Icon
- IconButton
- InlineCode
- Input
- InteractiveDetails
- Kbd
- LetterFx
- Line
- Logo
- LogoCloud
- NavIcon
- NumberInput
- Option
- PasswordInput
- RadioButton
- RevealFx
- Row
- Scroller
- SegmentedControl
- Select
- Skeleton
- SmartImage
- SmartLink
- Spinner
- StatusIndicator
- StylePanel
- StyleOverlay
- Switch
- Tag
- TagInput
- Text
- Textarea
- TiltFx
- Toast
- Toaster
- ToastProvider
- ToggleButton
- Tooltip
- User
- UserMenu

</details>

## 🔄 Smart Features

### Automatic Dependency Resolution
When installing components, the CLI automatically:
1. Detects and installs required component dependencies
2. Installs associated SCSS modules
3. Maintains the component hierarchy
4. Preserves style dependencies

### Project Structure Detection
Components are installed in the appropriate location based on your project structure:

```
📁 Your Next.js Project
├── 📁 app/                      # Next.js App Router
│   └── 📁 components/
│       └── 📁 once-ui-comp/    # Components installed here
├── 📁 src/                      # Next.js Pages Router
│   └── 📁 components/
│       └── 📁 once-ui-comp/    # Or here
└── 📁 components/              # Or in root components
    └── 📁 once-ui-comp/        # If no src or app directory
```

## ⚙️ Requirements

- Node.js 14.0.0 or later
- Git installed on your system
- npm or yarn package manager

## 📄 License

MIT

---

<div align="center">
  <sub>Built with ❤️ by the Once UI Team</sub>
</div>
