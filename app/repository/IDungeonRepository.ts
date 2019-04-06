import {Dungeon} from "../model/Dungeon";

export interface IDungeonRepository {
    List():Dungeon[];
    Get(id:number):Dungeon;
    GetByName(name:string):Dungeon;
}