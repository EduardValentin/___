import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface TemplateAttributes {
  id?: number;
  entity_id?: number,
  name: string;
  description: string;
}

export type TemplateInstance = Sequelize.Instance<TemplateAttributes> & TemplateAttributes;

export default (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<TemplateAttributes> = {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING, allowNull: false, unique: true },
    description: { type: Sequelize.STRING, allowNull: true, },
    entity_id: {
      type: Sequelize.INTEGER, allowNull: true, references: {
        model: 'Entities',
        key: 'id',
      }
    }
  };
  const Template = sequelize.define<TemplateInstance, TemplateAttributes>("Template", attributes);

  return Template;
};

