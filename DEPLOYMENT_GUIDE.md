# 🚀 TwitchAIO v2.0.0 Deployment Guide

## Quick Start

### 1. **Environment Setup**
```bash
# Copy the environment template
cp .env.example .env

# Edit the .env file with your credentials
nano .env
```

### 2. **Required Credentials**

#### Discord Bot Token
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application or select existing
3. Go to "Bot" section
4. Copy the token and add to `.env`:
   ```
   DISCORD_TOKEN=your_discord_bot_token_here
   ```

#### Twitch API Credentials
1. Go to [Twitch Developer Console](https://dev.twitch.tv/console)
2. Create a new application
3. Copy Client ID and Client Secret to `.env`:
   ```
   TWITCH_CLIENT_ID=your_twitch_client_id_here
   TWITCH_CLIENT_SECRET=your_twitch_client_secret_here
   ```

### 3. **Installation**
```bash
# Install dependencies
npm install

# Run tests to verify setup
npm test

# Start the bot
npm start
```

## 🔧 Configuration Options

### Environment Variables (.env)
```env
# Discord Configuration
DISCORD_TOKEN=your_discord_bot_token
DISCORD_PREFIX=!

# Twitch Configuration
TWITCH_CLIENT_ID=your_twitch_client_id
TWITCH_CLIENT_SECRET=your_twitch_client_secret

# Server Configuration
PORT=3000
NODE_ENV=production

# Logging Configuration
LOG_LEVEL=info
```

### Bot Permissions
Ensure your Discord bot has these permissions:
- Send Messages
- Manage Messages
- Manage Channels
- Read Message History
- Use Slash Commands

## 📋 Available Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `!help` | Show all available commands | `!help` |
| `!ping` | Check bot latency | `!ping` |
| `!userinfo` | Get Twitch user information | `!userinfo <username>` |
| `!lock` | Lock current channel | `!lock [reason]` |
| `!unlock` | Unlock current channel | `!unlock` |
| `!nuke` | Delete and recreate channel | `!nuke` |

## 🛠️ Development Mode

### Running in Development
```bash
# Start with auto-restart on file changes
npm run dev

# Run linting
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code
npm run format
```

### Adding New Commands
1. Create new file in `src/commands/`
2. Follow the existing command structure
3. Export the command object with `name`, `description`, and `execute` function

Example:
```javascript
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'example',
  description: 'Example command',
  async execute(message, args) {
    // Command logic here
  },
};
```

## 🐳 Docker Deployment (Optional)

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
EXPOSE 3000

CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  twitchaio:
    build: .
    environment:
      - DISCORD_TOKEN=${DISCORD_TOKEN}
      - TWITCH_CLIENT_ID=${TWITCH_CLIENT_ID}
      - TWITCH_CLIENT_SECRET=${TWITCH_CLIENT_SECRET}
    ports:
      - "3000:3000"
    restart: unless-stopped
```

## 📊 Monitoring & Logs

### Log Files
- Application logs: `logs/app.log`
- Error logs: `logs/error.log`
- Combined logs: `logs/combined.log`

### Health Check
The bot includes a health check endpoint at `http://localhost:3000/health`

## 🔒 Security Best Practices

1. **Never commit .env files** - Already in .gitignore
2. **Use environment variables** - All sensitive data externalized
3. **Regular updates** - Keep dependencies updated
4. **Monitor logs** - Watch for suspicious activity
5. **Limit permissions** - Only grant necessary Discord permissions

## 🚨 Troubleshooting

### Common Issues

#### Bot Not Responding
1. Check Discord token is valid
2. Verify bot has necessary permissions
3. Check console for error messages

#### Twitch Commands Failing
1. Verify Twitch API credentials
2. Check if Twitch username exists
3. Monitor rate limits in logs

#### Permission Errors
1. Ensure bot role is above target roles
2. Check channel-specific permissions
3. Verify bot has administrator permissions for moderation commands

### Debug Mode
```bash
# Enable debug logging
LOG_LEVEL=debug npm start
```

## 📈 Performance Optimization

### Production Settings
```env
NODE_ENV=production
LOG_LEVEL=warn
```

### Memory Usage
- Expected RAM usage: 50-100MB
- Scales with server count and activity

## 🔄 Updates & Maintenance

### Updating Dependencies
```bash
# Check for outdated packages
npm outdated

# Update all dependencies
npm update

# Run tests after updates
npm test
```

### Backup Strategy
- Backup your `.env` file
- Keep logs for debugging
- Monitor bot uptime

---

## 🆘 Support

If you encounter issues:
1. Check the logs in `logs/` directory
2. Verify all environment variables are set
3. Ensure Discord and Twitch credentials are valid
4. Check bot permissions in Discord server

The bot is now production-ready with comprehensive error handling and logging!