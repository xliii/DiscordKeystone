import AffixesService from "../service/AffixesService";

module.exports = function processCommand(options: any, user: any): Promise<any> {
    return AffixesService.getAffixes();
};