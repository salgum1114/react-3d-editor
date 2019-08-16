import Database from './database';

class MarkerDatabase extends Database {
    constructor(dbname: string, options?: PouchDB.Configuration.DatabaseConfiguration) {
        super(dbname, options);
    }
};

export default new MarkerDatabase('markers');
