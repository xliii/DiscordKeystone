const processKeystones = require("./Keystones");
const processRoll = require("./Roll");
const processAffixes = require("./Affixes");

import RagequitService from "../service/RagequitService";
import NekoService from "../service/NekoService";

function coffee(): Promise<any> {
    return Promise.resolve("IDI NAHUJ");
}

function tea(): Promise<any> {
    return Promise.resolve("https://i.ytimg.com/vi/755BDwzxv5c/hqdefault.jpg");
}

function ragequit(): Promise<any> {
    return RagequitService.getCounter().then(counter => {
            return `Days since last ragequit: ${counter}`;
        }
    )
}

function neko(): Promise<any> {
    return NekoService.getNeko();
}

module.exports = function processCommand(options: any, user: any): Promise<any> {
    const command = options.getSubcommand();
    switch (command) {
        case 'neko':
            return neko();
        case 'ragequit':
            return ragequit();
        case 'tea':
            return tea();
        case 'coffee':
            return coffee();
        case 'roll':
            return processRoll(options, user);
        case 'affixes':
            return processAffixes(options, user);
        default:
            return processKeystones(options, user);
    }
};