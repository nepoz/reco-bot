const axios = require('axios');
const mongoose = require('mongoose');
const Cryptr = require('cryptr');
const queryString = require('query-string');
const AuthInformation = require('../models/AuthInformation');
const { KEY, MONGODB_URI } = require('../config.js');
const endpoints = require('../utils/endpoints')

const cryptr = new Cryptr(KEY);

module.exports = {
  name: 'current',
  description: 'Lets user recommend song currently being played on their Spotify.',
  args: false,

  /**
     * Returns information about the song currently being played by a user
     * @param message: The message object which triggered this command
     * @param args: Any further arguments that were passed with the request
     */
  execute: async (message, args) => {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

    // Retrieve user's auth info and decrypt tokens
    const tokens = await AuthInformation
      .find({ id: message.author.id.toString() })
      .then((authInfo) => authInfo.map((result) => result.toJSON()))
      .then((authInfo) => authInfo.find((entry) => entry.id === message.author.id.toString()))
      .then((encryptedInfo) => {
        const userInfo = {
          access_token: cryptr.decrypt(encryptedInfo.auth.access_token),
          refresh_token: cryptr.decrypt(encryptedInfo.auth.refresh_token),
          expires_at: encryptedInfo.expires_at,
        };

        return userInfo;
      });
    mongoose.connection.close();

    // Retrieve song currently being played from Spotify API
    const currentlyPlayingPromise = axios
      .get(endpoints.currentlyPlaying, { headers: { Authorization: `Bearer ${tokens.access_token}` } })
      .then((res) => res.data);

    if (tokens.expires_at <= Date.now()) {
      await axios.get(`${endpoints.refresh}?${queryString.stringify({ id: message.author.id.toString() })}`);
    }

    const current = await currentlyPlayingPromise
      .catch((err) => {
        console.log(err);
      });

    const track = current.item;

    // Send relevant information back to text channel
    message.channel.send(`${message.author.username} recommends ${track.name}!`);
    message.channel.send(track.external_urls.spotify);
  },
};
