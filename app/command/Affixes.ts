import {Message, StringResolvable} from "discord.js";
const axios = require('axios');

module.exports = function(args: string[], message:Message): Promise<StringResolvable> {
    return axios.get("https://raider.io/api/v1/mythic-plus/affixes?region=eu").then((response: any) => {
       return Promise.resolve(response.data.title);
    });
};