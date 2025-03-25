# Magic Portfolio

A professional portfolio generator built with Next.js and Once UI components. Create stunning portfolio websites with minimal effort.

![Magic Portfolio](https://github.com/once-ui-system/magic-portfolio/blob/main/public/images/cover.jpg?raw=true)

## Quick Start

```bash
# Create a new portfolio project
npx create-magic-portfolio@latest
```

## Features

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
│   │   │   └── content/    # Content files (Markdown)
│   │   └── components/     # React components
│   └── styles/            # Global styles
├── public/                # Static assets
└── package.json
```

## Configuration

### Basic Configuration

Edit `src/app/resources/config/site.js` to customize your portfolio:

```javascript
export default {
  name: 'Your Name',
  title: 'Your Portfolio',
  description: 'A brief description of your portfolio',
  url: 'https://your-portfolio.com',
  // ... more options
}
```

### Content Management

All content is managed through Markdown files in `src/app/resources/content/`:

- `about.md` - About section
- `projects.md` - Projects showcase
- `skills.md` - Skills and expertise
- `contact.md` - Contact information

## Customization

### Styling

1. Global styles are in `src/styles/globals.css`
2. Theme configuration in `src/app/resources/config/theme.js`
3. Component-specific styles in their respective directories

### Components

All components are built using Once UI. You can customize them by:

1. Modifying component props
2. Overriding styles
3. Creating new components

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

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT

---

<div align="center">
  <sub>Built with ❤️ by the Once UI Team</sub>
</div> 