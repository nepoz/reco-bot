const { TOKEN, PREFIX } = require('./config');
const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

//Find all the command handlers available
const commandFiles = fs.readdirSync('./commands')
    .filter(file => file.endsWith('.js'));

//Populate commands Collection with (command's name, command obj)
commandFiles.forEach(file => {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
});

client.once('ready', () => {
    console.log('We ready!');
});

client.on('message', message => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;
    
    const args = message.content
        .slice(PREFIX.length)
        .split(/ +/)
        .filter(arg => !arg.match(/^$| +/));
    if (!args.length) return;

    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);
    
    try { 
        command.execute(message, args);
    } catch(err) {
        console.error(`An error occured: ${err.message}`);
        message.channel.send('Sorry, I didn\'t quite get that');
    }
    
});

client.login(TOKEN)
    .then(() => {
        console.log('Successfully logged in');
    })
    .catch(err => {
        console.log('An error occured logging in: ', err.message);
    });
