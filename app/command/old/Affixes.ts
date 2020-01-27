import {StringResolvable} from "discord.js";
import Axios from "axios";

module.exports = function(): Promise<StringResolvable> {
    return Axios.get("https://raider.io/api/v1/mythic-plus/affixes?region=eu").then((response: any) => {
        return Promise.resolve(response.data.title);
    });
};