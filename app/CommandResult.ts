export class CommandResult {
    response: any;
    clearInput: boolean;


    constructor(response: any, clearInput: boolean) {
        this.response = response;
        this.clearInput = clearInput;
    }
}