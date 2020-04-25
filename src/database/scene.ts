import Database from './database';

class SceneDatabase extends Database {
    constructor(dbname: string, options?: PouchDB.Configuration.DatabaseConfiguration) {
        super(dbname, options);
    }
};

export default new SceneDatabase('scenes');
