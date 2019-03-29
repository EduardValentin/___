import DatabasePool from '../DatabasePool';
import Database from '../models/index';
import { Pool } from 'pg';
import { Sequelize, FindOptions } from 'sequelize';
import { EntityAttributes } from '../models/Entity';
import { TemplateAttributes } from '../models/Template';

export default class TemplateService {
  private pool: Pool;

  constructor() {
    this.pool = DatabasePool.getInstance().getPool();
  }

  public find = async (clause: FindOptions<EntityAttributes>) => {
    return Database.Template.find(clause);
  }

  public insert = async (attributes: TemplateAttributes) => {
    return Database.Template.create(attributes);
  }

  public all = async () => {
    return Database.Template.all();
  }

  public delete = async (id) => {
    return Database.Template.destroy({
      where: {
        id,
      }
    })
  }
}