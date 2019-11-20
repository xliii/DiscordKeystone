import {Job, scheduleJob} from "node-schedule";
import {TextChannel} from "discord.js";
import weeklyService from "./WeeklyService";
import {sendMessage} from "./Util";

export class Scheduler {

    private weeklyResetJob?: Job;
    private channel: TextChannel;

    constructor(channel:TextChannel) {
        this.channel = channel;
    }

    public scheduleWeeklyReset():void {
        this.weeklyResetJob = scheduleJob("0 10 7 * * 3", () => {
            weeklyService.weeklyReset().then(result => {
                sendMessage(this.channel, result);
            })
        });

        scheduleJob("0 35 9 * * *", () => {
            sendMessage(this.channel, "it's 11:35 AM")
        });
    }
}