# TwitchAIO

TwitchAIO is a modern Discord bot designed to interact with Twitch and provide various Discord server management functionalities. Built with Node.js and Discord.js v14, it features secure configuration management, comprehensive logging, and a modular command structure.

## ✨ Features

- **🎮 Twitch Integration**: Get user information and interact with Twitch API
- **🔧 Discord Channel Management**: Lock, unlock, and nuke channels
- **📊 Bot Information**: Check bot latency and status
- **🛡️ Admin Commands**: Restricted commands for bot administrators
- **📝 Comprehensive Logging**: Winston-based logging system
- **🔒 Secure Configuration**: Environment-based configuration management
- **🎯 Modern Architecture**: Built with Discord.js v14 and modern JavaScript

## 🚀 Installation

### Prerequisites

- Node.js 16.0.0 or higher
- npm or yarn package manager
- Discord Bot Token
- Twitch API credentials

### Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/quehole/TwitchAIO.git
   cd TwitchAIO
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   Copy the example environment file and configure it:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configuration:

   ```env
   # Discord Bot Configuration
   DISCORD_TOKEN=your_discord_bot_token_here
   DISCORD_CLIENT_ID=your_discord_client_id_here

   # Twitch API Configuration
   TWITCH_CLIENT_ID=your_twitch_client_id_here
   TWITCH_CLIENT_SECRET=your_twitch_client_secret_here

   # Bot Configuration
   BOT_PREFIX=!
   CHAT_CHANNEL_ID=your_chat_channel_id_here
   GEN_CHANNEL_ID=your_gen_channel_id_here

   # Admin Configuration (comma-separated user IDs)
   ADMIN_IDS=your_admin_user_id_here

   # Server Configuration
   PORT=3000
   NODE_ENV=development
   LOG_LEVEL=info
   ```

4. **Run the Bot**

   ```bash
   # Production
   npm start

   # Development (with auto-restart)
   npm run dev
   ```

## 📋 Commands

### General Commands
- `!help` - Display available commands
- `!ping` - Check bot latency
- `!userinfo <username>` - Get Twitch user information

### Admin Commands (Restricted)
- `!lock` - Lock the current channel
- `!unlock` - Unlock the current channel  
- `!nuke` - Delete and recreate the current channel

## 🏗️ Project Structure

```
TwitchAIO/
├── src/
│   ├── commands/          # Command modules
│   ├── services/          # Service modules (Twitch API, etc.)
│   ├── utils/             # Utility modules (logger, etc.)
│   ├── index.js           # Main bot file
│   └── server.js          # Keep-alive server
├── config/
│   └── config.js          # Configuration management
├── logs/                  # Log files
├── .env.example           # Environment variables template
├── .eslintrc.js           # ESLint configuration
├── .prettierrc            # Prettier configuration
└── package.json           # Dependencies and scripts
```

## 🛠️ Development

### Code Quality

The project includes ESLint and Prettier for code quality:

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### Adding New Commands

1. Create a new file in `src/commands/`
2. Follow the command structure:

```javascript
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'commandname',
  description: 'Command description',
  async execute(message, args, client) {
    // Command logic here
  },
};
```

## 🔒 Security Features

- Environment-based configuration (no hardcoded secrets)
- Input validation and sanitization
- Proper error handling and logging
- Admin permission checks
- Rate limiting considerations

## 📊 Logging

The bot uses Winston for comprehensive logging:

- **Error logs**: `logs/error.log`
- **Combined logs**: `logs/combined.log`
- **Console output**: Development mode only

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all linting passes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Important Notes

- This bot is for educational and legitimate server management purposes
- Ensure compliance with Discord's Terms of Service and Twitch's API Terms
- The bot requires appropriate permissions in your Discord server
- Keep your environment variables secure and never commit them to version control

## 📞 Support

For questions, issues, or feature requests:

- Open an issue on GitHub
- Contact: **quehole**

## 🔄 Changelog

### Version 2.0.0
- Complete rewrite with Discord.js v14
- Modern ES6+ JavaScript
- Environment-based configuration
- Comprehensive logging system
- Improved security and error handling
- Modular command structure
- Updated Twitch API integration
