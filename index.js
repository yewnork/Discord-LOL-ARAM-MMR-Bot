const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });


client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// Loads commands from ./commands directory
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

// Bot is online and ready to accept commands
client.once('ready', () => {
	console.log(" ");
	console.log(" ");
	console.log(" ");
	console.log("+++++++++++++++++++++++++++++++++++++++++++++++");
	console.log("-----------------------------------------------");
	console.log("--------- Y E W B O T  i s  R E A D Y ---------");
	console.log("---------                             ---------");
	console.log("---------    V E R S I O N   1.0.2    ---------");
	console.log("-----------------------------------------------");
	console.log("+++++++++++++++++++++++++++++++++++++++++++++++");
	console.log(" ");
	console.log(" ");
	console.log(" ");
});

// Received a command
client.on('interactionCreate', async interaction => {
	console.log("-----------------------------------------------");
	console.log("COMMAND RECEIVED:", interaction.commandName);
	console.log("COMMAND SENT BY:", interaction.member.user.username);
	console.log("-----------------------------------------------");
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


client.login(token); // Logs in the Bot