import * as azurestorage from "azure-storage";
import BlobService = azurestorage.services.blob.blobservice.BlobService;
import {StorageError} from "azure-storage";

class AzureBlobService {

    blobService: BlobService;
    private containerName: string = 'keystone-bot';

    constructor() {
        console.log('Creating blob service');
        let azure = require('azure-storage');
        this.blobService = azure.createBlobService();
        this.blobService.createContainerIfNotExists(this.containerName, function(error, result, response) {
            if (error) {
                console.error('Error while creating blob container', error);
                return;
            }

            //console.log('Created blob container', result);
        });
    }

    public writeBlob(blobName: string, data: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.blobService.createBlockBlobFromText(this.containerName, blobName, data, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        });
    }

    public readBlob(blobName: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.blobService.getBlobToText(this.containerName, blobName, (err, data) => {
                if (err) {
                    reject(err);
                } else{
                    resolve(data);
                }
            });
        });
    }
}

export default new AzureBlobService();