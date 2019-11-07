import {StringResolvable} from "discord.js";

module.exports = function(): Promise<StringResolvable> {
    return Promise.resolve('https://i.ytimg.com/vi/755BDwzxv5c/hqdefault.jpg');
};