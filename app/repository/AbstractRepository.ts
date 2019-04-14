import * as fs from "fs";

export abstract class AbstractRepository {

    protected abstract repoPath(): string;

    protected write(entity:any): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const data = JSON.stringify(entity, null, 2);
            fs.writeFile(this.repoPath(), data, "utf8", err => {
                if (err) {
                    return reject(err);
                }

                return resolve();
            });
        });
    }

    private read(defaultValue: any): Promise<any> {
        return new Promise<object>((resolve, reject) => {
            fs.readFile(this.repoPath(), "utf8", ((err, data: string) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        return resolve(defaultValue);
                    } else {
                        return reject(err);
                    }
                }

                resolve(JSON.parse(data));
            }));
        })
    }

    protected readArray(): Promise<any> {
        return this.read([]);
    }

    protected readObject(): Promise<any> {
        return this.read({});
    }
}