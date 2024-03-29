import repositories from "../repository/Repositories";
const keystoneRepo = repositories.keystoneRepository();
import AffixesService from "./AffixesService";

class WeeklyService {

    public weeklyReset(): Promise<any> {
        return AffixesService.getAffixes().then(affixes => {
            return keystoneRepo.Clear().then(() => {
                return `**New week has started!**\nKeystones have been cleared\nCurrent week affixes: **${affixes}**`;
            });
        });
    }

    public weekStart(): Date {
        let date = new Date();
        let day = date.getDay();
        let daysDiff = (day < 3) ? (7 - 3 + day) : (day - 3);

        date.setDate(date.getDate() - daysDiff);
        date.setHours(7);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        return date;
    }
}

export default new WeeklyService();