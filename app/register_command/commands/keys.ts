const {SlashCommandBuilder} = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName('keys')
    .setDescription('Keystone-bot root command')
    .addSubcommand((subcommand: any) => {
        return subcommand
            .setName('list')
            .setDescription('List keystones')
    }).addSubcommand((subcommand: any) => {
        return subcommand
            .setName('add')
            .setDescription('Add keystone')
            .addStringOption((option: any) => {
                return option
                    .setName('dungeon')
                    .setDescription('Dungeon')
                    .setRequired(true)
                    .addChoice('Necrotic Wake', 'nw')
                    .addChoice('De Other Side', 'dos')
                    .addChoice('Plaguefall', 'pf')
                    .addChoice('Halls of Atonement', 'hoa')
                    .addChoice('Mists of Tirna Scithe', 'mots')
                    .addChoice('Sanguine Depths', 'sd')
                    .addChoice('Spires of Ascension', 'soa')
                    .addChoice('Theater of Pain', 'top')
            })
            .addIntegerOption((option: any) => {
                return option
                    .setName('level')
                    .setDescription('Keystone Level')
                    .setRequired(true)

            })
    }).addSubcommandGroup((subcommandGroup: any) => {
        return subcommandGroup
            .setName('alias')
            .setDescription('Manage aliases')
            .addSubcommand((subcommand: any) => {
                return subcommand
                    .setName('list')
                    .setDescription('List aliases')
            })
    });
export default data.toJSON();