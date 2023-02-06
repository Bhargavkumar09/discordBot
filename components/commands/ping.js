const {SlashCommandBuilder} = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    async execute(interaction) {
        // await interaction.deferReply();
        // await wait(2000);
        // await interaction.editReply("Pong again!");
        // await interaction.followUp("Ping is Pong!");
        // await interaction.deleteReply();
        await interaction.reply(`Pong! is in ${interaction.locale} language`);
        // const message =await interaction.fetchReply();
        // console.log(message);
    }
}