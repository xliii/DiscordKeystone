import {Dungeon} from "../model/Dungeon";

export interface IDungeonRepository {
    List():Dungeon[];
    Get(name:string):Dungeon;
}