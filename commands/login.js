const open = require('open');

// Base URL that handles OAuth flow with Spotify authentication server
const loginUrl = 'http://localhost:8080/spotify-login';

module.exports = {
  name: 'login',
  description: 'login to Spotify using Spotify auth flow',

  /**
     * Opens user's default browser and begins authentication flow
     * @param message: Message object that triggers command
     * @param args: Additonal arguments passed with the command
     */
  execute: async (message, args) => {
    await open(`${loginUrl}?userid=${message.author.id}`);
  },
};
