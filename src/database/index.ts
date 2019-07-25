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
        return this.pouch.get(doc._id, { attachments: false }).then(() => {
            return this.update(doc, options);
        }).catch(() => {
            return this.create(doc, options);
        });
    }

    public async create(doc: PouchDB.Core.PutDocument<Record>, options?: PouchDB.Core.PutOptions): Promise<PouchDB.Core.Response> {
        try {
            return this.pouch.put(doc, { ...options, force: true });
        } catch (error) {
            throw new Error(error);
        }
    }

    public async update(doc: PouchDB.Core.PutDocument<Record>, options?: PouchDB.Core.PutOptions): Promise<PouchDB.Core.Response> {
        try {
            const findDoc = await this.pouch.get(doc._id);
            const mergedDoc = Object.assign({}, findDoc, doc);
            return this.pouch.put(mergedDoc, { ...options, force: true });
        } catch (error) {
            throw new Error(error);
        }
    }

    public async delete(id: string, options?: PouchDB.Core.Options): Promise<PouchDB.Core.Response> {
        try {
            const findDoc = await this.pouch.get(id);
            return this.pouch.remove({ _id: findDoc._id, _rev: findDoc._rev }, options);
        } catch (error) {
            throw new Error(error);
        }
    }

    public async getById(id: string): Promise<PouchDB.Core.Response & PouchDB.Core.IdMeta & PouchDB.Core.GetMeta> {
        try {
            return this.pouch.get(id, { attachments: true });
        } catch (error) {
            throw new Error(error);
        }
    }

    public async saveBlob(id: string, attachmentId: string, attachment: PouchDB.Core.AttachmentData, type: string): Promise<PouchDB.Core.Response> {
        try {
            const findDoc = await this.pouch.get(id, { attachments: true });
            if (!findDoc._attachments) {
                findDoc._attachments = {};
            }
            Object.assign(findDoc._attachments, {
                [attachmentId]: {
                    content_type: type,
                    data: attachment,
                },
            });
            return this.pouch.put(findDoc, { force: true });
        } catch (error) {
            throw new Error(error);
        }
    }

    public async bulkBlobs(doc: PouchDB.Core.PutDocument<Record>): Promise<PouchDB.Core.Response> {
        try {
            const findDoc = await this.pouch.get(doc._id, { attachments: true });
            if (!findDoc._attachments) {
                findDoc._attachments = {};
            }
            Object.assign(findDoc._attachments, doc._attachments);
            return this.pouch.put(findDoc, { force: true });
        } catch (error) {
            throw new Error(error);
        }
    }

    public async getBlob(id: string, attachmentId: string, rev: string): Promise<Blob | Buffer> {
        try {
            return this.pouch.getAttachment(id, attachmentId, { rev });
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
