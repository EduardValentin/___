// src/typings/DbInterface/index.d.ts
import * as Sequelize from "sequelize";
import { UserAttributes, UserInstance } from "../../models/User";
import { RoleAttributes, RoleInstance } from "../../models/Role";
import { SettingsAttributes, SettingsInstance } from "../../models/Settings";
import { EntityAttributes, EntityInstance } from "../../models/Entity";
import { UIControlAttributes, UIControlInstance } from "../../models/UIControl";

export interface DatabasebInterface {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  User: Sequelize.Model<UserInstance, UserAttributes>;
  Role: Sequelize.Model<RoleInstance, RoleAttributes>;
  Settings: Sequelize.Model<SettingsInstance, SettingsAttributes>;
  Entity: Sequelize.Model<EntityInstance, EntityAttributes>;
  UIControl: Sequelize.Model<UIControlInstance, UIControlAttributes>;

}