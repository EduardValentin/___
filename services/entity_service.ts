import Database from '../models/index';
import { Sequelize, FindOptions } from 'sequelize';
import { EntityAttributes } from '../models/Entity';

export default class EntityService {

  constructor() {
  }

  public find = async (clause: FindOptions<EntityAttributes>) => {
    return Database.Entity.find(clause);
  }



}