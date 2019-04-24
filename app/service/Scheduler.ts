import {Job, scheduleJob} from "node-schedule";
import {TextChannel} from "discord.js";
import {WeeklyService} from "./WeeklyService";
import {sendMessage} from "./Util";

export class Scheduler {

    private weeklyResetJob?: Job;
    private weeklyService: WeeklyService;
    private channel: TextChannel;

    constructor(channel:TextChannel) {
        this.weeklyService = new WeeklyService();
        this.channel = channel;
    }

    public scheduleWeeklyReset():void {
        this.weeklyResetJob = scheduleJob("0 10 10 * * 3", () => {
            this.weeklyService.weeklyReset().then(result => {
                sendMessage(this.channel, result);
            })
        });
    }
}