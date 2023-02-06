const fs = require("node:fs");
const path = require("node:path");
const {Collection} = require("discord.js");

class ComponentHandler {
    constructor (client, baseDir = path.join(__dirname, "..", "components")) {
        this.client = client;
        this.baseDir = baseDir;
    }

    addCommands(dir = "commands") {
        this.client.commands = new Collection();

        const commandsPath = path.join(path.join(this.baseDir),dir);
        const commandFiles = fs
            .readdirSync(commandsPath)
            .filter(file => file.endsWith(".js"));
        
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);

            if("data" in command && "execute" in command) {
                this.client.commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
            }
        }
    }
}

module.exports = ComponentHandler;