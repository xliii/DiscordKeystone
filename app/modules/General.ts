
const processKeystones = require("./Keystones");
const processAffixes = require("./Affixes");

module.exports = function processCommand(options: any, user: any): Promise<any> {
    const command = options.getSubcommand();
    switch (command) {
        case 'affixes':
            return processAffixes(options, user);
        default:
            return processKeystones(options, user);
    }
};