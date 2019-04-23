import {StringResolvable, TextChannel} from "discord.js";
import {KeystoneEntryFileRepository} from "../repository/file/KeystoneEntryFileRepository";
import {IKeystoneEntryRepository} from "../repository/IKeystoneEntryRepository";

export class WeeklyService {

    private entryRepo: IKeystoneEntryRepository;
    private channel: TextChannel;
    private affixesRequest: () => Promise<StringResolvable>;

    constructor(channel:TextChannel) {
        this.channel = channel;
        this.entryRepo = new KeystoneEntryFileRepository();
        this.affixesRequest = require('../command/Affixes');
    }

    public weeklyReset(): void {
        this.affixesRequest().then(affixes => {
            this.entryRepo.Clear().then(() => {
                this.channel.send(`**New week has started!**\nKeystones have been cleared\nCurrent week affixes: **${affixes}**`);
            });
        });
    }
}