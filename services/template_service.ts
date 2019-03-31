import Database from '../models/index';
import { FindOptions } from 'sequelize';
import { EntityAttributes } from '../models/Entity';
import { TemplateAttributes } from '../models/Template';

export default class TemplateService {

  constructor() {
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