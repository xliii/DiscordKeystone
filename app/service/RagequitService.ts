import {Job, scheduleJob} from "node-schedule";
import BlobService from "./BlobService";
import {Client} from "discord.js";
import {announce} from "./Util";

class RagequitService {
    private ragequitJob?: Job;

    private read(): Promise<number> {
        return BlobService.readBlob('ragequit.txt').then(value => {
            return parseInt(value);
        }).catch(() => {
            return 0;
        });
    }

    private write(counter: number): void {
        BlobService.writeBlob('ragequit.txt', counter.toString());
    }

    public userLeft(client: Client, username: string): void {
        this.getCounter().then(counter => {
            announce(client, `**${username}** left. Days since last rage quit: ~~${counter}~~ **0**`);
            this.write(0);
        });
    }

    public scheduleRagequitCounter():void {
        this.ragequitJob = scheduleJob("0 0 7 * * *", () => {
            this.read().then(counter => {
                this.write(counter + 1);
            })
        });
    }

    public getCounter(): Promise<number> {
        return this.read();
    }
}

export default new RagequitService();