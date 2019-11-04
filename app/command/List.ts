import repository from "../repository/file/KeystoneEntryFileRepository";
import {KeystoneEntry} from "../model/KeystoneEntry";
import {StringResolvable} from "discord.js";

module.exports = function(args: string[]): Promise<StringResolvable> {
    const BY_KEY = "bykey";
    const BY_DUNGEON = "bydungeon";
    const DEFAULT_SORTING = byDungeon;

    return repository.List().then(keystones => {
        return keystones.length > 0 ?
            keystones.sort(getSorting(args)) :
            "No keystones available";
    });

    function byKey(a: KeystoneEntry, b: KeystoneEntry): number {
        return a.keystone.key - b.keystone.key;
    }

    function byDungeon(a: KeystoneEntry, b: KeystoneEntry): number {
        return a.keystone.dungeon.name.localeCompare(b.keystone.dungeon.name);
    }

    function getSorting(args: string[]): any {
        if (args.length < 1) return DEFAULT_SORTING;
        if (args.length === 1) {
            switch (args[0]) {
                case BY_KEY: return byKey;
                case BY_DUNGEON: return byDungeon;
                default: throw `Invalid sorting. Available: **${BY_KEY}**, **${BY_DUNGEON}**`;
            }
        }
    }
};