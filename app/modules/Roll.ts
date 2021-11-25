import {RollService} from "../service/RollService";

module.exports = function processCommand(options: any, user: any): Promise<any> {
    const from = 1;
    let to = options.getInteger('to', false);
    if (!to) {
       to = 100;
    }

    return Promise.resolve(new RollService().roll(from, to).toString());
};