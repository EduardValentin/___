import DatabasePool from '../DatabasePool';
import Database from '../models/index';
import { Pool } from 'pg';
import { Sequelize, FindOptions } from 'sequelize';
import { EntityAttributes } from '../models/Entity';

export default class EntityService {
  private pool: Pool;

  constructor() {
    this.pool = DatabasePool.getInstance().getPool();
  }

  public find = async (clause: FindOptions<EntityAttributes>) => {
    return Database.Entity.find(clause);
  }



}