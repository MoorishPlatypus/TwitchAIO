const { Client, GatewayIntentBits, Collection, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('../config/config');
const logger = require('./utils/logger');

// Create Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// Create commands collection
client.commands = new Collection();

// Load commands
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.name, command);
  logger.info(`Loaded command: ${command.name}`);
}

// Bot ready event
client.once('ready', () => {
  logger.info(`${client.user.tag} is ready!`);
  client.user.setActivity(`${config.discord.prefix}help`, { type: 'WATCHING' });
});

// Message handler
client.on('messageCreate', async message => {
  // Ignore bot messages and messages without prefix
  if (message.author.bot || !message.content.startsWith(config.discord.prefix)) {
    return;
  }

  const args = message.content.slice(config.discord.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, args, client);
    logger.info(`Command ${commandName} executed by ${message.author.tag} in ${message.guild?.name || 'DM'}`);
  } catch (error) {
    logger.error(`Error executing command ${commandName}:`, error);
    
    const errorEmbed = new EmbedBuilder()
      .setColor('Red')
      .setDescription('❌ An error occurred while executing this command.');
    
    try {
      await message.channel.send({ embeds: [errorEmbed] });
    } catch (replyError) {
      logger.error('Failed to send error message:', replyError);
    }
  }
});

// Guild member add event
client.on('guildMemberAdd', async member => {
  if (!config.channels.gen) return;

  try {
    const channel = member.guild.channels.cache.get(config.channels.gen);
    if (!channel) return;

    const welcomeMessage = await channel.send(`${member}, **Welcome to the server!**`);
    
    // Delete welcome message after 5 seconds
    setTimeout(() => {
      welcomeMessage.delete().catch(() => {
        // Ignore errors if message is already deleted
      });
    }, 5000);
    
    logger.info(`Welcome message sent for ${member.user.tag}`);
  } catch (error) {
    logger.error('Error sending welcome message:', error);
  }
});

// Error handling
client.on('error', error => {
  logger.error('Discord client error:', error);
});

process.on('unhandledRejection', error => {
  logger.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', error => {
  logger.error('Uncaught exception:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
  logger.info('Received SIGINT, shutting down gracefully...');
  client.destroy();
  process.exit(0);
});

process.on('SIGTERM', () => {
  logger.info('Received SIGTERM, shutting down gracefully...');
  client.destroy();
  process.exit(0);
});

// Start the bot
client.login(config.discord.token).catch(error => {
  logger.error('Failed to login:', error);
  process.exit(1);
});

// Start keep-alive server
const keepAlive = require('./server');
keepAlive();