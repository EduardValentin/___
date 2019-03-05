import { Pool } from "pg";

export default class DatabasePool {
  private pool: Pool = null;
  private static instance: DatabasePool = null;

  private constructor() {
    this.pool = new Pool();
  }

  public static getInstance() {
    if (!DatabasePool.instance) {
      DatabasePool.instance = new DatabasePool();
    }

    return this.instance;
  }

  public getPool() {
    return this.pool;
  }

  public endPool() {
    if (this.pool) {
      this.pool.end();
    }
  }
}