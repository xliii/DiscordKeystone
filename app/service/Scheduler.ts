import {Job, scheduleJob} from "node-schedule";
import {StringResolvable, TextChannel} from "discord.js";
import {KeystoneEntryFileRepository} from "../repository/file/KeystoneEntryFileRepository";
import {IKeystoneEntryRepository} from "../repository/IKeystoneEntryRepository";

export class Scheduler {

    entryRepo: IKeystoneEntryRepository;
    channel: TextChannel;
    affixesRequest: () => Promise<StringResolvable>;
    scheduleJob?: Job;


    constructor(channel:TextChannel) {
        this.channel = channel;
        this.entryRepo = new KeystoneEntryFileRepository();
        this.affixesRequest = require('../command/Affixes');
    }

    public scheduleWeeklyReset():void {
        this.scheduleJob = scheduleJob("0 10 10 * * 3", () => {
            this.affixesRequest().then(affixes => {
                this.entryRepo.Clear().then(() => {
                    this.channel.send(`**New week has started!**\nKeystones have been cleared\nCurrent week affixes: **${affixes}**`);
                });
            });
        });
    }
}