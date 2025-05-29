const config = require('../config/config');

// Mock environment variables for testing
process.env.DISCORD_TOKEN = 'test_discord_token';
process.env.TWITCH_CLIENT_ID = 'test_twitch_client_id';
process.env.TWITCH_CLIENT_SECRET = 'test_twitch_client_secret';

describe('Configuration', () => {
  test('should load configuration correctly', () => {
    expect(config.discord.token).toBe('test_discord_token');
    expect(config.twitch.clientId).toBe('test_twitch_client_id');
    expect(config.twitch.clientSecret).toBe('test_twitch_client_secret');
  });

  test('should have default values', () => {
    expect(config.discord.prefix).toBe('!');
    expect(config.server.port).toBe(3000);
    expect(config.logging.level).toBe('info');
  });

  test('should have role configuration', () => {
    expect(config.roleConfig).toBeDefined();
    expect(typeof config.roleConfig).toBe('object');
  });
});