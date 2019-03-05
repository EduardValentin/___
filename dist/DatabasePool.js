"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
class DatabasePool {
    constructor() {
        this.pool = null;
        this.pool = new pg_1.Pool();
    }
    static getInstance() {
        if (!DatabasePool.instance) {
            DatabasePool.instance = new DatabasePool();
        }
        return this.instance;
    }
    getPool() {
        return this.pool;
    }
    endPool() {
        if (this.pool) {
            this.pool.end();
        }
    }
}
DatabasePool.instance = null;
exports.default = DatabasePool;
//# sourceMappingURL=DatabasePool.js.map