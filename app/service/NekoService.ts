import {Message} from "discord.js";

const client = require('nekos.life');
const neko = new client();

class NekoService {

    //TODO: tag support
    //https://github.com/Nekos-life/nekos-dot-life

    public getNeko():Promise<any> {
        return neko.sfw.neko().then((response: { url: any; }) => response.url);
    }

    public matches(message:Message) {
        return message.content === ';;neko';
    }
}

export default new NekoService();