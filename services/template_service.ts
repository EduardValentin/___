import Database from '../models/index';
import { FindOptions } from 'sequelize';
import { EntityAttributes } from '../models/Entity';
import { TemplateAttributes } from '../models/Template';
import BaseService from './base_service';

export default class TemplateService extends BaseService {

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