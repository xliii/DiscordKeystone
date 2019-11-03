import {Message} from "discord.js";

class PizdaService {

    //TODO: Diacritics
    private regex = /^[пp]+[иií]+[зz]+([дd]+[аa]+[.!?]*)$/gi;

    public matches(message: Message): boolean {
        return message.content.match(this.regex) != null;
    }

    public response(message: Message): string {
        return message.content.replace(this.regex, '$1');
    }
}

export default new PizdaService();