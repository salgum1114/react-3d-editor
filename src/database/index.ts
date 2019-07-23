import PouchDB from 'pouchdb';
import warning from 'warning';

import { Record } from '../types/utils';

export class Database {
    pouch: PouchDB.Database;
    dbname: string;
    constructor(dbname: string, options?: PouchDB.Configuration.DatabaseConfiguration) {
        warning(dbname && dbname.length, 'Dbname is required value.');
        this.dbname = dbname;
        if (!this.pouch) {
            this.pouch = new PouchDB(dbname, options);
        }
    }

    public getPouch() {
        return this.pouch;
    }

    public save(doc: PouchDB.Core.PutDocument<Record>, options?: PouchDB.Core.PutOptions): Promise<PouchDB.Core.Response> {
        return this.pouch.get(doc._id).then(() => {
            return this.update(doc, options);
        }).catch(() => {
            return this.create(doc, options);
        });
    }

    public async create(doc: PouchDB.Core.PutDocument<Record>, options?: PouchDB.Core.PutOptions): Promise<PouchDB.Core.Response> {
        try {
            return await this.pouch.put(doc, { ...options, force: true });
        } catch (error) {
            throw new Error(error);
        }
    }

    public async update(doc: PouchDB.Core.PutDocument<Record>, options?: PouchDB.Core.PutOptions): Promise<PouchDB.Core.Response> {
        try {
            const findDoc = await this.pouch.get(doc._id);
            const mergedDoc = Object.assign({}, findDoc, doc);
            return await this.pouch.put(mergedDoc, { ...options, force: true });
        } catch (error) {
            throw new Error(error);
        }
    }

    public async delete(id: string, options?: PouchDB.Core.Options): Promise<PouchDB.Core.Response> {
        try {
            const findDoc = await this.pouch.get(id);
            return await this.pouch.remove({ _id: findDoc._id, _rev: findDoc._rev }, options);
        } catch (error) {
            throw new Error(error);
        }
    }

    public clear(): void {
        this.pouch.destroy().then(() => {
            this.pouch = new PouchDB(this.dbname);
        });
    }

}

export default new Database('react-3d-editor');
