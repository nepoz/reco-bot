const open = require('open');
require('dotenv').config();
const queryString = require('query-string')

const baseUrl = 'https://accounts.spotify.com/authorize?';

module.exports = {
    name: 'login',
    description: 'login to Spotify using Spotify auth flow',

    execute: async (message, args) => {
        const requestParams = {
            client_id: process.env.SPOTIFY_CLIENT_ID,
            response_type: 'code', 
            redirect_uri: 'https://www.google.com'
        } 

        const query = baseUrl + queryString.stringify(requestParams);
        await open(query);
    }   
}