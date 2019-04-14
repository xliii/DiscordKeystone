import {Dungeon} from "../model/Dungeon";
import {IRepository} from "./IRepository";

export interface IDungeonRepository extends IRepository<Dungeon> {
    Get(id:number):Promise<Dungeon>;
    GetByName(name:string):Promise<Dungeon>;
}