const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Check bot latency',
  async execute(message, _args, client) {
    const embed = new EmbedBuilder()
      .setDescription(`🏓 Bot latency: **${client.ws.ping}ms**`)
      .setColor('Purple')
      .setFooter({
        text: message.guild.name,
        iconURL: message.guild.iconURL({ dynamic: true }),
      })
      .setTimestamp();

    await message.channel.send({ embeds: [embed] });
  },
};
