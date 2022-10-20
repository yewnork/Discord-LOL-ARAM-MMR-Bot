const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('mmr')
        .setDescription('Retrieves the LOL ARAM MMR info for an account')
        .addStringOption(option => option.setName('summoner').setDescription('Type in the LOL summoner name').setRequired(true)),
    async execute(interaction) {
        const exampleEmbed = new MessageEmbed()
            .setColor('#3da368')
        console.log(CurrentDateTime());
        console.log(" ");
        console.log(" ");
        const summoner_name = interaction.options.getString("summoner")
        await interaction.deferReply();

        (async function () {
            try {
                let response = await getSummonerData(summoner_name);

                if (response.status == 200) {
                    console.log("Found Data For Summoner:", summoner_name);
                    aram_data = response.data.ARAM;
                    var num = 100 - aram_data.percentile;
                    var tier_percent = `${num.toFixed(2)}%`
                    if (aram_data.avg == null) {
                        throw new NotEnoughSoloGamesException(`Not Enough Solo Games Played`);
                    }
                    str = aram_data.closestRank.split(" ")[0];
                    rank_image_url = `https://xpulz.com/img/game/lol/Emblem_${str}.png`


                    console.log("Parsed tier from WIMMMR", str)
                    console.log("MMR:", aram_data.avg)
                    console.log("Closest Rank:", aram_data.closestRank)
                    console.log("Closest Rank URL:", rank_image_url)
                    console.log("MMR:", aram_data.avg)
                    console.log("Tier Percent", aram_data.percentile)
                    console.log("Tier Percent", num)
                    console.log("Tier Percent", tier_percent)


                    exampleEmbed.setAuthor({ name: summoner_name })
                        .setThumbnail(rank_image_url)
                        .addFields(
                            { name: 'MMR', value: `${aram_data.avg} ±${aram_data.err}`, inline: true },
                            { name: 'Rank', value: `${aram_data.closestRank}`, inline: true },
                            { name: 'Top', value: `${tier_percent}`, inline: true }
                        )
                } else if (response.status == 404) {
                    console.log("Failure:", response.data.error.message);
                    exampleEmbed.setAuthor({ name: summoner_name }).addFields(
                        { name: 'Error', value: `${response.data.error.message}`, inline: true })
                } else {
                    console.log("Error Getting Data For Summoner:", summoner_name);
                    console.log(response.status);
                    exampleEmbed.setAuthor({ name: `WhatIsMyMMR.com error: ${response.data.error.message}` })
                }


            } catch (e) {
                exampleEmbed.setAuthor({ name: summoner_name }).addFields(
                    { name: 'Error', value: e.message, inline: true })
                console.log("e:", { status: 500, message: e.message });
            }


            await interaction.editReply({ embeds: [exampleEmbed] });
            console.log(" ");
            console.log(" ");
            console.log(CurrentDateTime());
            console.log("-----------------------------------------------");
            console.log("---------------------E N D---------------------");
            console.log("-----------------------------------------------");
            console.log(" ");
            console.log(" ");
        })()
    },
};





function NotEnoughSoloGamesException(message) {
    this.message = message;
    this.name = 'NotEnoughSoloGamesException';
}

async function getSummonerData(summoner_name) {
    try {
        url = `https://na.whatismymmr.com/api/v1/summoner?name=${summoner_name}`;
        console.log("Going to to get summoner data at...", url);
        return await axios.get(url)
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return error.response;
            });

    } catch (e) {
        console.log("getSummonerData", e);
        throw Error(`Failed to evaluate transaction: ${e}`)
    }
}

function CurrentDateTime() {
    var current = new Date();
    var timestamp = current.toLocaleString();
    return timestamp;
}