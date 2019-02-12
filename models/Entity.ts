import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface EntityAttributes    {
		name: string;
		type: string;
		route: string;
}

export type EntityInstance = Sequelize.Instance<EntityAttributes> & EntityAttributes;

export default (sequelize: Sequelize.Sequelize) => {
    const attributes: SequelizeAttributes<EntityAttributes> = {
			name: { type: Sequelize.STRING },
			type: { type: Sequelize.STRING },
			route: { type: Sequelize.STRING, unique: true },
    };

    const Entity = sequelize.define<EntityInstance, EntityAttributes>("Entity", attributes);
    Entity.associate = (models) => {
      Entity.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'id',
      });
    }
    return Entity;
  };