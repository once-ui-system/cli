# Once UI cli CLI 🎨

A powerful command-line interface for installing Once UI cli components in your Next.js projects. Seamlessly integrate beautiful, reusable UI components with automatic dependency resolution and SCSS support.

![Once UI CLI](https://raw.githubusercontent.com/once-ui-system/nextjs-starter/main/public/once-ui-banner.png)

## ✨ Features

- 🎯 Interactive component selection
- 🔄 Automatic dependency resolution
- 🎨 SCSS module support
- 📁 Smart project structure detection
- 💅 Professional CLI interface
- ⚡ Fast and easy installation
- 🔍 Component preview and search
- 🛠️ Zero configuration needed

## 🚀 Quick Start

```bash
# Install globally (optional)
npm install -g once-ui-cli

# Or use directly with npx
npx once-ui-cli init
```

## 📦 Installation

You can install Once UI cli CLI globally:

```bash
npm install -g once-ui-cli
```

Or use it directly with npx (recommended):

```bash
npx once-ui-cli <command>
```

## 🛠️ Usage

### Initialize and Select Components

```bash
npx once-ui-cli init
```

This launches an interactive component selector where you can choose which components to install. Components will be installed in the appropriate directory based on your project structure:

- Next.js App Router: `app/components/once-ui-comp/`
- Next.js Pages Router: `src/components/once-ui-comp/`
- Default: `components/once-ui-comp/`

### Add a Specific Component

```bash
npx once-ui-cli add <component-name>
```

Example:
```bash
npx once-ui-cli add Accordion
```

This will install the Accordion component along with its:
- Required dependencies
- SCSS modules
- Associated styles

### List Available Components

```bash
npx once-ui-cli list
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

## 🔄 Automatic Dependency Resolution

When you install a component, the CLI automatically:

1. Detects and installs required component dependencies
2. Installs associated SCSS modules
3. Maintains the component hierarchy
4. Preserves style dependencies

## 🎯 Project Structure Detection

The CLI automatically detects your project structure and installs components in the appropriate location:

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

## 📄 License

MIT

---

<div align="center">
  <sub>Built with ❤️ by the Once UI Team</sub>
</div>