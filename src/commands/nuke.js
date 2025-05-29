const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../../config/config');

module.exports = {
  name: 'nuke',
  description: 'Delete and recreate the current channel (Admin only)',
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
      const position = message.channel.position;
      const channelData = {
        name: message.channel.name,
        type: message.channel.type,
        topic: message.channel.topic,
        nsfw: message.channel.nsfw,
        rateLimitPerUser: message.channel.rateLimitPerUser,
        parent: message.channel.parent,
        permissionOverwrites: message.channel.permissionOverwrites.cache,
      };

      const newChannel = await message.channel.clone(channelData);
      await newChannel.setPosition(position);
      await message.channel.delete();

      const embed = new EmbedBuilder()
        .setDescription('💥 Channel has been nuked and recreated!')
        .setColor('Red')
        .setFooter({
          text: message.guild.name,
          iconURL: message.guild.iconURL({ dynamic: true }),
        })
        .setTimestamp();

      await newChannel.send({ embeds: [embed] });
    } catch (error) {
      const embed = new EmbedBuilder()
        .setColor('Red')
        .setDescription('❌ Failed to nuke the channel. Please check my permissions.');
      
      await message.channel.send({ embeds: [embed] });
    }
  },
};