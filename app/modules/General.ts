const processKeystones = require("./Keystones");
const processRoll = require("./Roll");
const processAffixes = require("./Affixes");

module.exports = function processCommand(options: any, user: any): Promise<any> {
    const command = options.getSubcommand();
    switch (command) {
        case 'roll':
            return processRoll(options, user);
        case 'affixes':
            return processAffixes(options, user);
        default:
            return processKeystones(options, user);
    }
};