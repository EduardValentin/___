// src/typings/DbInterface/index.d.ts
import * as Sequelize from "sequelize";
import { UserAttributes, UserInstance } from "../../models/User";
import { RoleAttributes, RoleInstance } from "../../models/Role";
import { SettingsAttributes, SettingsInstance } from "../../models/Settings";
import { EntityAttributes, EntityInstance } from "../../models/Entity";
import { UIControlAttributes, UIControlInstance } from "../../models/UIControl";
import { TemplateInstance, TemplateAttributes } from "../../models/Template";
import { PageInstance, PageAttributes } from "../../models/Page";
import { EntityPageInstance, EntityPageAttributes } from "../../models/EntityPage";
import { MediaFileInstance, MediaFileAttributes } from "../../models/MediaFile";
import { MediaGroupInstance, MediaGroupAttributes } from "../../models/MediaGroup";

export interface DatabasebInterface {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  User: Sequelize.Model<UserInstance, UserAttributes>;
  Role: Sequelize.Model<RoleInstance, RoleAttributes>;
  Settings: Sequelize.Model<SettingsInstance, SettingsAttributes>;
  Entity: Sequelize.Model<EntityInstance, EntityAttributes>;
  UIControl: Sequelize.Model<UIControlInstance, UIControlAttributes>;
  Template: Sequelize.Model<TemplateInstance, TemplateAttributes>;
  Page: Sequelize.Model<PageInstance, PageAttributes>;
  EntityPage: Sequelize.Model<EntityPageInstance, EntityPageAttributes>;
  MediaFile: Sequelize.Model<MediaFileInstance, MediaFileAttributes>;
  MediaGroup: Sequelize.Model<MediaGroupInstance, MediaGroupAttributes>;
}