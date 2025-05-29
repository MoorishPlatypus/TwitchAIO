const { EmbedBuilder } = require('discord.js');
const twitchService = require('../services/twitchService');
const logger = require('../utils/logger');

module.exports = {
  name: 'userinfo',
  description: 'Get information about a Twitch user',
  async execute(message, args) {
    if (!args[0]) {
      const embed = new EmbedBuilder()
        .setColor('Red')
        .setDescription('❌ Please provide a Twitch username!');
      return message.channel.send({ embeds: [embed] });
    }

    const username = args[0].toLowerCase();

    try {
      const user = await twitchService.getUserByUsername(username);

      if (!user) {
        const embed = new EmbedBuilder()
          .setColor('Red')
          .setDescription(`❌ User **${username}** not found on Twitch!`);
        return message.channel.send({ embeds: [embed] });
      }

      const embed = new EmbedBuilder()
        .setColor(0x9146ff)
        .setTitle(`${user.display_name}`)
        .setURL(`https://twitch.tv/${user.login}`)
        .setThumbnail(user.profile_image_url)
        .addFields(
          { name: 'Username', value: user.login, inline: true },
          { name: 'Display Name', value: user.display_name, inline: true },
          { name: 'User ID', value: user.id, inline: true },
          { name: 'Account Type', value: user.broadcaster_type || 'Regular', inline: true },
          { name: 'Account Created', value: new Date(user.created_at).toLocaleDateString(), inline: true },
          { name: 'View Count', value: user.view_count.toLocaleString(), inline: true },
        )
        .setFooter({
          text: 'Twitch User Information',
          iconURL: 'https://static.twitchcdn.net/assets/favicon-32-d6025c14e900565d6177.png',
        })
        .setTimestamp();

      if (user.description) {
        embed.addFields({ name: 'Description', value: user.description, inline: false });
      }

      await message.channel.send({ embeds: [embed] });

      logger.info(`User info requested for ${username} by ${message.author.tag}`);
    } catch (error) {
      logger.error('Error fetching user info:', error);

      const embed = new EmbedBuilder()
        .setColor('Red')
        .setDescription('❌ An error occurred while fetching user information. Please try again later.');

      await message.channel.send({ embeds: [embed] });
    }
  },
};
