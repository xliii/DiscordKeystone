import Axios from "axios";

class AffixesService {

    private url: string = "https://raider.io/api/v1/mythic-plus/affixes?region=eu";

    public getAffixes():Promise<String> {
        return Axios.get(this.url).then((response: any) => {
            return Promise.resolve(response.data.title);
        });
    }
}

export default new AffixesService();