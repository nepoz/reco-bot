require("dotenv").config()

module.exports = {
    DISCORD_TOKEN:process.env.DISCORD_TOKEN,
    PREFIX: process.env.PREFIX,
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    MONGODB_URI: process.env.MONGODB_URI,
    KEY: process.env.KEY,
    API_BASE_URL: 'https://api.spotify.com'
};