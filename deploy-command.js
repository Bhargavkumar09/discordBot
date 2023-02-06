require("dotenv").config();
const {REST, Routes} = require("discord.js");
const fs = require("node:fs");
const {
    DISCORD_BOT_TOKEN: token,
    DISCORD_CLIENT_ID: clientId,
    DISCORD_GUILD_ID: guildId
} = process.env;

const commands = [];

const commandFiles = fs
    .readdirSync(__dirname + '/components/commands')
    .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./components/commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({version:"10"}).setToken(token);

(async ()=> {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            {body:commands}
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();   