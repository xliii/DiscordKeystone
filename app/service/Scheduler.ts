import {Job, scheduleJob} from "node-schedule";
import {Channel} from "discord.js";
import weeklyService from "./WeeklyService";
import {sendMessage} from "./Util";

export class Scheduler {

    private weeklyResetJob?: Job;
    private channel: Channel;

    constructor(channel:Channel) {
        this.channel = channel;
    }

    public scheduleWeeklyReset():void {
        this.weeklyResetJob = scheduleJob("0 10 7 * * 3", () => {
            weeklyService.weeklyReset().then(result => {
                sendMessage(this.channel, result);
            });
        });
    }
}