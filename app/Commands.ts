import {Command} from "./model/Command";
import fs = require("fs");
import path = require("path");
import {Message, StringResolvable} from "discord.js";

class Commands {
    commands: Command[];

    constructor() {
        this.commands = [];
        let self:Commands = this;
        fs.readdir(path.join(__dirname, 'command'), function(err, files) {
            if (err) {
                console.error(err);
                return;
            }

            let promises: Promise<any>[] = [];

            files.forEach(function(file) {
                const commandName = file.split('.')[0];
                let promise = import('./command/' + commandName).then(imported => {
                    let cmd: Command = imported.default;
                    self.addCommand(cmd);
                });
                promises.push(promise);
            });

            Promise.all(promises).then(() => {
                console.log(`${self.commands.length} commands registered`)
            });
        });
    }

    private addCommand(cmd: Command): void {
        console.log(`Registering command: ${cmd.name()}`);
        this.commands.push(cmd);
    }

    public process(command: string, args: string[], message: Message): Promise<StringResolvable> {
        let cmd: Command | undefined = this.commands.filter(cmd => cmd.matches(command)).pop();
        if (cmd) {
            console.log(`Processing command: ${cmd.name()} - ${args}`);
            return cmd.process(args, message);
        } else {
            return Promise.resolve(`Unknown command: **${message}**`);
        }
    }
}

export default new Commands();