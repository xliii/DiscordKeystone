import {StringResolvable} from "discord.js";

export class CommandResult {
    response: StringResolvable;
    clearInput: boolean;


    constructor(response: StringResolvable, clearInput: boolean) {
        this.response = response;
        this.clearInput = clearInput;
    }
}