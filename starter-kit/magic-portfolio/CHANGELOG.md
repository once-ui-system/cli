# Changelog

All notable changes to the Magic Portfolio CLI tool will be documented in this file.

   2024-03-25

### Added
- Professional header with gradient styling using `boxen` and `gradient-string`
- Node.js version check (requires v18.17.0 or higher)
- Template selection with three options:
  - Minimal (Recommended)
  - Creative
  - Professional
- Feature selection with checkboxes for:
  - Dark Mode
  - Blog Section
  - Project Showcase
  - Contact Form
  - Analytics Integration
  - SEO Optimization
  - Multi-language Support
  - Custom Animation
- Automatic dependency installation option
- Configuration file generation with feature-specific settings
- Feature-specific directory and file creation
- Progress indicators using `ora` for cloning and installation
- Terminal links for documentation
- Comprehensive error handling and timeout for cloning operations

### Changed
- Removed ASCII art logo in favor of professional header
- Updated color scheme for a more professional appearance
- Improved project structure organization
- Enhanced error messages and user feedback
- Streamlined installation process

### Fixed
- Configuration file creation and reading sequence
- Directory structure creation
- Dependency installation process
- Git clone timeout handling

### Dependencies
- Added `boxen` for styled terminal boxes
- Added `gradient-string` for gradient text effects
- Added `terminal-link` for clickable links
- Added `semver` for version checking
- Updated all dependencies to latest stable versions

## [1.0.0] - 2024-03-24

### Initial Release
- Basic CLI functionality
- Project creation and setup
- Git repository cloning
- Basic configuration management

### Added
- 🎉 Initial release of Magic Portfolio CLI
- ✨ Professional CLI interface with interactive setup
- 🎨 Clean and modern design with professional color scheme
- ⚡ Fast project creation with automatic dependency installation
- 🔄 Progress indicators for cloning and installation
- ⏱️ 5-minute timeout for cloning operations
- 📝 Clear error messages and troubleshooting guides
- 🎯 Project structure setup with Next.js and Once UI
- 📦 Automatic dependency management
- 📚 Comprehensive documentation

### Features
- Interactive project naming
- Automatic/manual dependency installation options
- Progress spinners for long-running operations
- Error handling with user-friendly messages
- Clear next steps instructions
- Professional header and UI elements
- Timeout handling for network operations
- Repository cloning with progress indication

### Technical Improvements
- Proper error handling for network issues
- Timeout implementation for long-running operations
- Progress indicators for better UX
- Clean project structure setup
- Professional color scheme implementation
- Modular code organization

### Documentation
- Added comprehensive README
- Installation instructions
- Project structure guide
- Configuration documentation
- Development guidelines
- Deployment options
- Contributing guidelines

### Dependencies
- commander: ^11.1.0
- inquirer: ^8.2.6
- chalk: ^4.1.2
- ora: ^5.4.1
- simple-git: ^3.22.0
- fs-extra: ^11.2.0
- boxen: ^7.1.1
- terminal-link: ^2.1.1

---

<div align="center">
  <sub>Built with ❤️ by the Once UI Team</sub>
</div> 