const {SlashCommandBuilder} = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName('keys')
    .setDescription('Keystone-bot root command')
    .addSubcommand((subcommand: any) => {
        return subcommand
            .setName('remove')
            .setDescription('Remove a keystone')
            .addStringOption((option: any) => {
                return option
                    .setName('character')
                    .setDescription('Character name')
                    .setRequired(true)
            })
    })
    .addSubcommand((subcommand: any) => {
        return subcommand
            .setName('clear')
            .setDescription('Clear all keystones')
    })
    .addSubcommand((subcommand: any) => {
        return subcommand
            .setName('tea')
            .setDescription('To all the connoisseurs')
    })
    .addSubcommand((subcommand: any) => {
        return subcommand
            .setName('coffee')
            .setDescription('Imagine drinking coffee')
    })
    .addSubcommand((subcommand: any) => {
        return subcommand
            .setName('neko')
            .setDescription('Have a catgirl')
    })
    .addSubcommand((subcommand: any) => {
        return subcommand
            .setName('ragequit')
            .setDescription('It is probably Gusev')
    })
    .addSubcommand((subcommand: any) => {
        return subcommand
            .setName('affixes')
            .setDescription('List current week affixes')
    })
    .addSubcommand((subcommand: any) => {
        return subcommand
            .setName('roll')
            .setDescription('Roll a dice')
            .addIntegerOption((option: any) => {
                return option
                    .setName('to')
                    .setDescription('Upper bound (included)')
                    .setRequired(false)
            })
    })
    .addSubcommand((subcommand: any) => {
        return subcommand
            .setName('list')
            .setDescription('List all keystones')
    })
    .addSubcommand((subcommand: any) => {
        return subcommand
            .setName('dungeons')
            .setDescription('List available dungeons')
    })
    .addSubcommand((subcommand: any) => {
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
                    .setDescription('Keystone level')
                    .setRequired(true)

            })
    })
    .addSubcommandGroup((subcommandGroup: any) => {
        return subcommandGroup
            .setName('alias')
            .setDescription('Manage aliases')
            .addSubcommand((subcommand: any) => {
                return subcommand
                    .setName('list')
                    .setDescription('List all aliases')
            })
            .addSubcommand((subcommand: any) => {
                return subcommand
                    .setName('get')
                    .setDescription('Get your alias')
            })
            .addSubcommand((subcommand: any) => {
                return subcommand
                    .setName('remove')
                    .setDescription('Remove your alias')
            })
            .addSubcommand((subcommand: any) => {
                return subcommand
                    .setName('set')
                    .setDescription('Set your alias')
                    .addStringOption((option: any) => {
                        return option
                            .setName('character')
                            .setDescription('Character name')
                            .setRequired(true)
                    })
            })

    });
export default data.toJSON();