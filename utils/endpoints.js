const { API_BASE_URL } = require('../config');

const endpoints = {
    currentlyPlaying: `${API_BASE_URL}/v1/me/player/currently-playing`, 
};

module.exports = endpoints;
