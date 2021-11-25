import AffixesService from "../service/AffixesService";

module.exports = function processCommand(options: any, user: any): Promise<any> {
    const command = options.getSubcommand();
    switch (command) {
        case 'affixes':
            return AffixesService.getAffixes();
        default:
            return Promise.resolve('Unknown command');
    }
};