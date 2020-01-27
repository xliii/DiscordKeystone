import {Command} from "./model/Command";
import fs = require("fs");
import path = require("path");
import {Message} from "discord.js";
import {CommandResult} from "./CommandResult";

class CommandProcessor {
    commands: Command[];

    constructor() {
        this.commands = [];
        let self:CommandProcessor = this;
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

    public process(command: string, args: string[], message: Message): Promise<CommandResult> {
        let cmd: Command | undefined = this.commands.filter(cmd => cmd.matches(command)).pop();
        if (cmd) {
            console.log(`Processing command: ${cmd.name()} - ${args}`);
            let clearInput: boolean = cmd.clearInput();
            return cmd.process(args, message).then(result => new CommandResult(result, clearInput));
        } else {
            return Promise.resolve(new CommandResult(`Unknown command: **${message}**`, false));
        }
    }
}

export default new CommandProcessor();