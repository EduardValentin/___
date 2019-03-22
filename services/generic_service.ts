import DatabasePool from '../DatabasePool';
import Database from '../models/index';
import { Pool } from 'pg';
import { appendTablePrefix } from '../utils/utils';

export default class GenericService {
  private pool: Pool;

  constructor() {
    this.pool = DatabasePool.getInstance().getPool();
  }

  find = (clause: Object) => {

  }

  public query = async (queryText: string, placeholdersValues?: string[]) => {
    return this.pool.query(queryText, placeholdersValues || []);
  }

  public selectAllRows = async (entity_id: number) => {
    const entity = await Database.Entity.find({ where: { id: entity_id } });
    return this.pool.query(`SELECT * FROM ${appendTablePrefix(entity.name)}`);
  }

  public findOneRow = async (entity_id: number, record_id: number) => {
    const entity = await Database.Entity.find({ where: { id: entity_id } });
    return this.pool.query(`SELECT * FROM ${appendTablePrefix(entity.name)} WHERE id=$1`, [record_id])
  }
}