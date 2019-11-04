import BlobService from "../../service/BlobService";
import {StorageError} from "azure-storage";

export abstract class AbstractBlobRepository {

    protected abstract blobName(): string;

    protected write(entity:any): Promise<void> {
        const data = JSON.stringify(entity, null, 2);
        return BlobService.writeBlob(this.blobName(), data);
    }

    private read(defaultValue: any): Promise<any> {
        return new Promise<object>((resolve, reject) => {
            BlobService.readBlob(this.blobName()).then(data => {
                resolve(JSON.parse(data));
            }).catch(err => {
                let code = (err as StorageError).statusCode;
                if (code == 404) {
                    resolve(defaultValue);
                } else {
                    reject(err);
                }
            });
        });
    }

    protected readArray(): Promise<any> {
        return this.read([]);
    }

    protected readObject(): Promise<any> {
        return this.read({});
    }
}