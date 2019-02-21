// src/typings/DbInterface/index.d.ts
import * as Sequelize from "sequelize";
import { UserAttributes, UserInstance } from "../../models/User";
import { RoleAttributes, RoleInstance } from "../../models/Role";
import { SettingsAttributes, SettingsInstance } from "../../models/Settings";


export interface DatabasebInterface {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  User: Sequelize.Model<UserInstance, UserAttributes>;
  Role: Sequelize.Model<RoleAttributes, RoleInstance>;
  Settings: Sequelize.Model<RoleAttributes, RoleInstance>;
}