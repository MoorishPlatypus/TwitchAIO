# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2024-05-29

### Added
- Complete rewrite with Discord.js v14
- Environment-based configuration system
- Winston logging system with file and console outputs
- Modular command structure
- ESLint and Prettier for code quality
- Comprehensive error handling
- Modern Twitch API integration (Helix)
- Health check endpoints for monitoring
- Graceful shutdown handling
- Input validation and sanitization
- Admin permission system
- New `userinfo` command for Twitch user information
- Proper project structure with organized directories
- MIT License
- Comprehensive documentation

### Changed
- Updated all dependencies to latest versions
- Migrated from Discord.js v12 to v14
- Replaced deprecated Twitch API v5 with Helix API
- Improved security by removing hardcoded credentials
- Enhanced error handling and logging
- Modernized JavaScript syntax (ES6+)
- Restructured project files for better organization

### Removed
- Deprecated follower botting functionality (ToS violation)
- Hardcoded admin IDs and API credentials
- Legacy settings.json configuration
- Outdated dependencies with security vulnerabilities
- Poorly formatted and insecure code patterns

### Security
- Removed hardcoded API credentials and tokens
- Implemented environment-based configuration
- Added input validation for all commands
- Improved permission checking system
- Removed functionality that violates platform ToS

## [1.0.0] - Previous

### Initial Release
- Basic Discord bot functionality
- Twitch integration (deprecated methods)
- Channel management commands
- Basic command system