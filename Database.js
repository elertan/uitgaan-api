import { createConnection } from 'mysql';

class Database {
  static connect() {
    // eslint-disable-next-line
    return new Promise((resolve, reject) => {
      if (Database.conn) {
        return resolve();
      }
      const {
        DB_HOST,
        DB_USER,
        DB_PASS,
        DB_NAME,
      } = process.env;
      this.conn = createConnection({
        database: DB_NAME,
        host: DB_HOST,
        multipleStatements: true,
        password: DB_PASS,
        user: DB_USER,
      });
      Database.conn.connect((err) => {
        if (err) {
          return reject(err);
        }

        return resolve();
      });
    });
  }

  static prepQuery(queryString, preps) {
    return new Promise((resolve, reject) => {
      Database.conn.query(queryString, preps, (err, results) => {
        if (err) {
          return reject(err);
        }

        return resolve(results);
      });
    });
  }
}

export default Database;
