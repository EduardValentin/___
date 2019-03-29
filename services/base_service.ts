import { Pool } from 'pg';
import DatabasePool from '../DatabasePool';

export default class BaseService {
  protected pool: Pool;

  constructor() {
    this.pool = DatabasePool.getInstance().getPool();
  }
}