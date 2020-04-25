import Database from './database';

class ImageDatabase extends Database {
    constructor(dbname: string, options?: PouchDB.Configuration.DatabaseConfiguration) {
        super(dbname, options);
    }
};

export default new ImageDatabase('images');
