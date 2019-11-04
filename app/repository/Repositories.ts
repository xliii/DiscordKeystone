import {IAliasRepository} from "./IAliasRepository";

import dungeonFile from "../repository/file/DungeonFileRepository";
import dungeonBlob from "../repository/blob/DungeonBlobRepository";
import aliasFile from "../repository/file/AliasFileRepository";
import aliasBlob from "../repository/blob/AliasBlobRepository";
import keystoneFile from "../repository/file/KeystoneEntryFileRepository";
import keystoneBlob from "../repository/blob/KeystoneEntryBlobRepository";
import {IDungeonRepository} from "./IDungeonRepository";
import {IKeystoneEntryRepository} from "./IKeystoneEntryRepository";

class Repositories {

    public aliasRepository(): IAliasRepository {
        return this.useFileRepository() ? aliasFile : aliasBlob;
    }

    public dungeonRepository(): IDungeonRepository {
        return this.useFileRepository() ? dungeonFile : dungeonBlob;
    }

    public keystoneRepository(): IKeystoneEntryRepository {
        return this.useFileRepository() ? keystoneFile : keystoneBlob;
    }

    private useFileRepository(): boolean {
        return process.env.USE_FILE_REPOSITORY === 'true';
    }
}

export default new Repositories();