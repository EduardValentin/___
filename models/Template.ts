import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface TemplateAttributes {
  id: number;
  path: string;
  name: string;
}

export type TemplateInstance = Sequelize.Instance<TemplateAttributes> & TemplateAttributes;

export default (sequelize: Sequelize.Sequelize) => {
    const attributes: SequelizeAttributes<TemplateAttributes> = {
			id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      path: { type: Sequelize.STRING, allowNull:false, unique: true },
			name: { type: Sequelize.STRING, allowNull:false, unique: true },      
    };
    const Template = sequelize.define<TemplateInstance, TemplateAttributes>("Template", attributes);
    Template.associate = (models) => {
      Template.belongsToMany(models.Entity, {
        through: 'TemplatesEntities',
        foreignKey: 'template_id',
        otherKey: 'entity_id',
      });

      Template.belongsToMany(models.Page, {
        through: 'PagesTemplates',
        foreignKey: 'template_id',
        otherKey: 'page_id',
      });
    };
    return Template;
  };

 