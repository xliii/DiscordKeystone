import {KeystoneEntry} from "../model/KeystoneEntry";
import {Filter} from "../model/Filter";

const exact = /^([0-9]+)$/;
const plus = /^([0-9]+)\+$/;
const minus = /^([0-9]+)-$/;
const more = /^>([0-9]+)$/;
const less = /^<([0-9]+)$/;
const range = /^([0-9]+)-([0-9]+)$/;

class FilterService {

    public create(filter: string) {
        //10
        let match = filter.match(exact);
        if (match) {
            console.log("exact:" + filter);
            let value = this.extractValue(match, 1);
            return new Filter(filter, (k, d) => k == value);
        }
        //10+
        match = filter.match(plus);
        if (match) {
            console.log("plus: " + filter);
            let value = this.extractValue(match, 1);
            return new Filter(filter, (k, d) => k >= value);
        }
        //10-
        match = filter.match(minus);
        if (match) {
            console.log("minus: " + filter);
            let value = this.extractValue(match, 1);
            return new Filter(filter, (k, d) => k <= value);
        }
        //>10
        match = filter.match(more);
        if (match) {
            console.log("more: " + filter);
            let value = this.extractValue(match, 1);
            return new Filter(filter, (k, d) => k > value);
        }
        //<1
        match = filter.match(less);
        if (match) {
            let value = this.extractValue(match, 1);
            return new Filter(filter, (k, d) => k < value);
        }
        //10-15
        match = filter.match(range);
        if (match) {
            console.log("range: " + filter);
            let from = this.extractValue(match, 1);
            let to = this.extractValue(match, 2);
            return new Filter(filter, (k, d) => k >= from && k <= to);
        }

        console.log("undefined: " + filter);
        return undefined
    }

    private extractValue(match: RegExpMatchArray | null, index: number) {
        if (match == null) {
            throw "Fatal error";
        }

        return parseInt(match[index]);
    }

    private createFilter(lambda: (key: number, dungeon: string) => boolean) {
        return (e:KeystoneEntry) => lambda(e.keystone.key, e.keystone.dungeon.name)
    }
}

export default new FilterService();