const axios = require('axios');
const config = require('../../config/config');
const logger = require('../utils/logger');

class TwitchService {
  constructor() {
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  async getAccessToken() {
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const response = await axios.post('https://id.twitch.tv/oauth2/token', {
        client_id: config.twitch.clientId,
        client_secret: config.twitch.clientSecret,
        grant_type: 'client_credentials',
      });

      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + (response.data.expires_in * 1000) - 60000; // 1 minute buffer

      logger.info('Successfully obtained Twitch access token');
      return this.accessToken;
    } catch (error) {
      logger.error('Failed to obtain Twitch access token:', error);
      throw new Error('Failed to authenticate with Twitch API');
    }
  }

  async getUserByUsername(username) {
    try {
      const token = await this.getAccessToken();

      const response = await axios.get(`https://api.twitch.tv/helix/users?login=${username}`, {
        headers: {
          'Client-ID': config.twitch.clientId,
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.data.length === 0) {
        return null;
      }

      return response.data.data[0];
    } catch (error) {
      logger.error(`Failed to get user ${username}:`, error);
      throw new Error('Failed to fetch user from Twitch API');
    }
  }

  async getUserFollowers(userId) {
    try {
      const token = await this.getAccessToken();

      const response = await axios.get(`https://api.twitch.tv/helix/channels/followers?broadcaster_id=${userId}`, {
        headers: {
          'Client-ID': config.twitch.clientId,
          'Authorization': `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      logger.error(`Failed to get followers for user ${userId}:`, error);
      throw new Error('Failed to fetch followers from Twitch API');
    }
  }

  // Note: Following users programmatically requires user access tokens and violates Twitch ToS
  // This method is kept for educational purposes but should not be used
  async followUser(_targetUserId, _userToken) {
    logger.warn('Attempted to use deprecated follow functionality - this violates Twitch ToS');
    throw new Error('Following users programmatically is not supported and violates Twitch Terms of Service');
  }
}

module.exports = new TwitchService();
