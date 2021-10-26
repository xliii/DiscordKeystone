import {Message, StringResolvable} from "discord.js";

const client = require('nekos.life');
const neko = new client();

class NekoService {

    public getNeko():Promise<StringResolvable> {
        return neko.sfw.neko().then((response: { url: any; }) => response.url);
    }

    public matches(message:Message) {
        return message.content === ';;neko';
    }
}

export default new NekoService();