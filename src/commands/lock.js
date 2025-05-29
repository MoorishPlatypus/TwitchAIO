const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../../config/config');

module.exports = {
  name: 'lock',
  description: 'Lock the current channel (Admin only)',
  async execute(message) {
    // Check if user is admin
    if (!config.admins.includes(message.author.id)) {
      const embed = new EmbedBuilder()
        .setColor('Red')
        .setDescription('❌ You do not have permission to use this command.');
      return message.channel.send({ embeds: [embed] });
    }

    // Check if bot has permission
    if (!message.guild.members.me.permissions.has(PermissionFlagsBits.ManageChannels)) {
      const embed = new EmbedBuilder()
        .setColor('Red')
        .setDescription('❌ I do not have permission to manage channels.');
      return message.channel.send({ embeds: [embed] });
    }

    try {
      await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
        SendMessages: false,
      });

      const embed = new EmbedBuilder()
        .setDescription('🔒 This channel has been locked')
        .setColor('Orange')
        .setFooter({
          text: message.guild.name,
          iconURL: message.guild.iconURL({ dynamic: true }),
        })
        .setTimestamp();

      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      const embed = new EmbedBuilder()
        .setColor('Red')
        .setDescription('❌ Failed to lock the channel. Please check my permissions.');

      await message.channel.send({ embeds: [embed] });
    }
  },
};
