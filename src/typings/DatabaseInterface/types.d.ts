// src/typings/DbInterface/index.d.ts
import * as Sequelize from "sequelize";
import { UserAttributes, UserInstance } from "../../models/User";

export interface DatabasebInterface {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  User: Sequelize.Model<UserInstance, UserAttributes>;
}