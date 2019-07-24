const { DISCORD_TOKEN, PREFIX } = require('./config');
const fs = require('fs');

//Instances of client and container for command handlers
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

//Event listener for messages in channel
client.on('message', message => {
    //No need to process message if it doesn't start with the prefix or if the message is sent by a bot
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;
    
    const args = message.content
        .slice(PREFIX.length)       //remove prefix from arguments
        .split(/ +/)                //split across whitespace
        .filter(arg => !arg.match(/^$| +/));    //Remove all empty characters/spaces
    if (!args.length) return;          //Currently, if no command, nothing to do

    const commandName = args.shift().toLowerCase();     //command user wants to execute will be FIRST in argList
    const command = client.commands.get(commandName);   //Retrieve specific command handler from Collection
    
    try { 
        command.execute(message, args);
    } catch(err) {
        console.error(`An error occured: ${err.message}`);
        message.channel.send('Sorry, I didn\'t quite get that');
    }
    
});

client.login(DISCORD_TOKEN)
    .then(() => {
        console.log('Successfully logged in');
    })
    .catch(err => {
        console.log('An error occured logging in: ', err.message);
    });
