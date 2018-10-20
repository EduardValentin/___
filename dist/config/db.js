"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client();
const pool = new pg_1.Pool();
// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});
// callback - checkout a client
pool.connect((err, client, done) => {
    if (err)
        throw err;
    client.query('SELECT * FROM users WHERE id = $1', [1], (err, res) => {
        done();
        if (err) {
            console.log(err.stack);
        }
        else {
            console.log(res.rows[0]);
        }
    });
});
//# sourceMappingURL=db.js.map