import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface UIControlAttributes {
  id?: number;
  entity_id?: number,
  name: string,
  type: string,
}

export type UIControlInstance = Sequelize.Instance<UIControlAttributes> & UIControlAttributes;

export default (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<UIControlAttributes> = {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING, allowNull: false, },
    type: { type: Sequelize.STRING, allowNull: false, },
    entity_id: {
      type: Sequelize.INTEGER, references: {
        model: 'Entities',
        key: 'id',
      }
    }
  };
  const UIControl = sequelize.define<UIControlInstance, UIControlAttributes>("UIControl", attributes);
  UIControl.associate = (models) => {
    UIControl.belongsTo(models.Entity, {
      foreignKey: 'entity_id',
      targetKey: 'id',
    });
  };
  return UIControl;
};

