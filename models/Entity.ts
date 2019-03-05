import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface EntityAttributes {
  id?: number,
  name: string;
}

export type EntityInstance = Sequelize.Instance<EntityAttributes> & EntityAttributes;

export default (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<EntityAttributes> = {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, },
    name: { type: Sequelize.STRING, allowNull: false, unique: true, },
  };

  const Entity = sequelize.define<EntityInstance, EntityAttributes>("Entity", attributes);
  Entity.associate = (models) => {
    Entity.belongsTo(models.User, {
      foreignKey: 'user_id',
      targetKey: 'id',
    });

    Entity.hasMany(models.UIControl, {
      foreignKey: 'entity_id',
    });
  }
  return Entity;
};