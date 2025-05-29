const { EmbedBuilder } = require('discord.js');
const config = require('../../config/config');

module.exports = {
  name: 'help',
  description: 'Display available commands',
  async execute(message) {
    const embed = new EmbedBuilder()
      .setColor(0x7d06cc)
      .setTitle('TwitchAIO Commands')
      .addFields(
        {
          name: 'General Commands',
          value: [
            `\`${config.discord.prefix}help\` - Show this help message`,
            `\`${config.discord.prefix}ping\` - Check bot latency`,
            `\`${config.discord.prefix}userinfo <username>\` - Get Twitch user info`,
          ].join('\n'),
          inline: false,
        },
        {
          name: 'Admin Commands',
          value: [
            `\`${config.discord.prefix}lock\` - Lock the current channel`,
            `\`${config.discord.prefix}unlock\` - Unlock the current channel`,
            `\`${config.discord.prefix}nuke\` - Delete and recreate the channel`,
          ].join('\n'),
          inline: false,
        },
      )
      .setFooter({
        text: message.guild.name,
        iconURL: message.guild.iconURL({ dynamic: true }),
      })
      .setTimestamp();

    await message.channel.send({ embeds: [embed] });
  },
};
