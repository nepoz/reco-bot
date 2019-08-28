const { API_BASE_URL, RECO_BASE_URL } = require('../config');

const endpoints = {
  currentlyPlaying: `${API_BASE_URL}/v1/me/player/currently-playing`,
  refresh: `${RECO_BASE_URL}/refresh`,
};

module.exports = endpoints;
