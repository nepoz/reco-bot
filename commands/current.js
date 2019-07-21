module.exports = {
    name: 'current',
    description: 'Lets user recommend song currently being played on their Spotify.',
    args: false,
    
    execute (message, args) {
        message.channel.send(`${message.author} recommends current song`);
    }
};