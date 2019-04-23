import {Job, scheduleJob} from "node-schedule";
import {TextChannel} from "discord.js";
import {WeeklyService} from "./WeeklyService";

export class Scheduler {

    private weeklyResetJob?: Job;
    private weeklyService: WeeklyService;

    constructor(channel:TextChannel) {
        this.weeklyService = new WeeklyService(channel);
    }

    public scheduleWeeklyReset():void {
        this.weeklyResetJob = scheduleJob("0 10 10 * * 3", this.weeklyService.weeklyReset);
    }
}