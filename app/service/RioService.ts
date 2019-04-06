import Axios from "axios";

export class RioService {

    template: string = "https://raider.io/api/v1/characters/profile?region=eu&realm=Twisting%20Nether&name={}&fields=mythic_plus_scores_by_season%3Acurrent";

    public RioScore(character:string):Promise<String> {
        const url = this.template.replace('{}', character);

        return Axios.get(url).then((response: any) => {
            return Promise.resolve(response.data.mythic_plus_scores_by_season[0].scores.all);
        }).catch((error: any) => {
            return Promise.reject(error.response.data.message);
        });
    }
}