# Magic Portfolio

A professional portfolio generator built with Next.js and Once UI components. Create stunning portfolio websites with minimal effort.

![Magic Portfolio](https://github.com/once-ui-system/magic-portfolio/blob/main/public/images/cover.jpg?raw=true)

## Quick Start

```bash
# Create a new portfolio project
npx create-magic-portfolio@latest
```

## Features

### Core Features
- 🎨 Modern and professional design
- ⚡ Built with Next.js for optimal performance
- 🎯 SEO optimized
- 📱 Fully responsive
- 🎭 Easy customization
- 📝 Markdown support for content
- 🔍 Dark/Light mode
- 🌐 Multi-language support
- 📊 Analytics integration
- 🔒 Security best practices

### Templates
- **Minimal (Recommended)**: Clean and minimal design with focus on content
- **Creative**: Bold and creative design with animations
- **Professional**: Corporate-style portfolio with advanced features

### Feature Selection
Choose from a variety of features during setup:
- 🌓 Dark Mode - Automatic theme switching with system preference
- 📝 Blog Section - Create and manage blog posts
- 🎯 Project Showcase - Display your work with filtering
- 📬 Contact Form - Built-in contact form with API endpoint
- 📊 Analytics - Integration with popular analytics platforms
- 🔍 SEO Optimization - Meta tags, OpenGraph, and Twitter Cards
- 🌐 Multi-language Support - Multiple language support with i18n
- ✨ Custom Animations - Smooth page transitions and effects

## Installation

### Using CLI (Recommended)

```bash
# Using npx
npx create-magic-portfolio@latest

# Or install globally
npm install -g create-magic-portfolio
create-magic-portfolio
```

### Manual Installation

```bash
# Clone the repository
git clone https://github.com/once-ui-system/magic-portfolio.git my-portfolio

# Navigate to project directory
cd my-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structure

```
my-portfolio/
├── src/
│   ├── app/
│   │   ├── resources/
│   │   │   ├── config/     # Configuration files
│   │   │   ├── content/    # Content files (Markdown)
│   │   │   └── i18n/       # Translation files
│   │   ├── api/           # API routes
│   │   ├── providers/     # React providers
│   │   └── components/    # React components
│   └── styles/           # Global styles
├── public/               # Static assets
└── package.json
```

## Configuration

### Basic Configuration

Edit `src/app/resources/config/site.js` to customize your portfolio:

```javascript
module.exports = {
  template: 'minimal',
  features: ['darkMode', 'projects', 'contact'],
  featureConfigs: {
    darkMode: {
      enabled: true,
      defaultTheme: 'light'
    },
    // ... other feature configurations
  }
}
```

### Feature Configuration

Each feature can be configured in `site.js`:

- **Dark Mode**: Theme preferences and storage
- **Blog**: Posts per page and categories
- **Projects**: Layout and filtering options
- **Contact**: Form fields and endpoint
- **Analytics**: Provider and tracking ID
- **SEO**: Meta tags and social cards
- **i18n**: Languages and fallbacks
- **Animations**: Types and durations

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test
```

## Deployment

Magic Portfolio can be deployed to any platform that supports Next.js:

- Vercel (Recommended)
- Netlify
- GitHub Pages
- AWS
- DigitalOcean

## Requirements

- Node.js v18.17.0 or higher
- npm or yarn package manager
- Git

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT

---

<div align="center">
  <sub>Built with ❤️ by the Once UI Team</sub>
</div> 