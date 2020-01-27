import {KeystoneEntry} from "../../model/KeystoneEntry";
import {StringResolvable} from "discord.js";
import FilterService from "../../service/FilterService";

import repositories from "../../repository/Repositories";
const repository = repositories.keystoneRepository();

module.exports = function(args: string[]): Promise<StringResolvable> {
    const BY_KEY = "bykey";
    const BY_DUNGEON = "bydungeon";
    const DEFAULT_SORTING = byDungeon;

    return repository.List().then(keystones => {
        if (keystones.length == 0) {
            return "No keystones available";
        }

        keystones = keystones.sort(byDungeon);

        if (args.length == 0) {
            let result = [];
            result.push('All keystones:');
            result.push(...keystones);
            return result;
        }

        const filter = FilterService.create(args[0]);
        if (filter) {
            let result = [];
            result.push(filter.header);
            keystones = keystones.filter(filter.filter);
            if (keystones.length == 0) {
                result.push("No keystones available");
            } else {
                result.push(...keystones);
            }
            return result;
        } else {
            return "Invalid filter";
        }
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
                case BY_KEY:
                    return byKey;
                case BY_DUNGEON:
                    return byDungeon;
                default:
                    throw `Invalid sorting. Available: **${BY_KEY}**, **${BY_DUNGEON}**`;
            }
        }
    }
};