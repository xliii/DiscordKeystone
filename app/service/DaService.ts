import {Message} from "discord.js";

class DaService {

    //TODO: Diacritics
    private regex = /^([дd]+[аa]+[.!?]*)$/gi;
    private prefix = 'Пиз';
    private GusevID = '114965863844544516';

    public matches(message: Message): boolean {
        return message.author.id == this.GusevID &&
               message.content.match(this.regex) != null;
    }

    public response(message: Message): string {
        return this.prefix + message.content;
    }
}

export default new DaService();