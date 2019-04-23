import {StringResolvable} from "discord.js";
import {KeystoneEntryFileRepository} from "../repository/file/KeystoneEntryFileRepository";

export class WeeklyService {

    private affixesRequest: () => Promise<StringResolvable>;

    constructor() {
        this.affixesRequest = require('../command/Affixes');
    }

    public weeklyReset(): Promise<StringResolvable> {
        return this.affixesRequest().then(affixes => {
            new KeystoneEntryFileRepository().Clear().then(() => {
                return `**New week has started!**\nKeystones have been cleared\nCurrent week affixes: **${affixes}**`;
            });
        });
    }

    public weekStart(): Date {
        let date = new Date();
        let day = date.getDay();
        let daysDiff = (day <= 3) ? (7 - 3 + day) : (day - 3);

        date.setDate(date.getDate() - daysDiff);
        date.setHours(10);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        return date;
    }
}