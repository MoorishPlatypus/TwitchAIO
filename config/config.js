const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const config = {
  discord: {
    token: process.env.DISCORD_TOKEN,
    clientId: process.env.DISCORD_CLIENT_ID,
    prefix: process.env.BOT_PREFIX || '!',
  },
  twitch: {
    clientId: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.TWITCH_CLIENT_SECRET,
  },
  channels: {
    chat: process.env.CHAT_CHANNEL_ID,
    gen: process.env.GEN_CHANNEL_ID,
  },
  admins: process.env.ADMIN_IDS ? process.env.ADMIN_IDS.split(',') : [],
  server: {
    port: process.env.PORT || 3000,
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
  // Role-based follower limits (role ID -> follower count)
  roleConfig: {
    '1252626868734001259': 1000,
    '838871745821016074': 400,
    '838871751663550555': 375,
    '838871755518247013': 300,
    '1252626874216222740': 100,
    '1252626874996228138': 50,
    '1221115618779201597': 25,
    '1257605515178152059': 10,
  },
};

// Validate required configuration
const requiredFields = [
  'discord.token',
  'twitch.clientId',
  'twitch.clientSecret',
];

for (const field of requiredFields) {
  const value = field.split('.').reduce((obj, key) => obj?.[key], config);
  if (!value) {
    throw new Error(`Missing required configuration: ${field}`);
  }
}

module.exports = config;