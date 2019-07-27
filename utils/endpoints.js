const { API_BASE_URL } = require('../config');

const endpoints = {
    currentlyPlaying: `${API_BASE_URL}/v1/currently-playing`, 
};

module.exports = endpoints;