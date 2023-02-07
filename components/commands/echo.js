const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("echo")
        .setDescription("Replies with your input!")
        .addStringOption(option => 
            option.setName("input")
                .setDescription("The input to echo back")
                .setRequired(true)
        )
        .addChannelOption(option => 
            option.setName("channel")
                .setDescription("The channel to echo into")
        )
        .addBooleanOption(option => 
            option.setName("ephemeral")
                .setDescription("Whether or not the echo should be ephemeral")
                .setRequired(true)
        ),

    async execute(interaction) {
        console.log(interaction.options, "interaction")
        await interaction.reply({content:`${interaction.options.getString("input")} ${interaction.options.getChannel("channel")} ${interaction.options.getBoolean("ephemeral")}`,ephemeral:interaction.options.getBoolean("ephemeral")});
    }
    
}