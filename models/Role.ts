import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface RoleAttributes {
  id?: number,
	name: string;
}

export type RoleInstance = Sequelize.Instance<RoleAttributes> & RoleAttributes;

export default (sequelize: Sequelize.Sequelize) => {
    const attributes: SequelizeAttributes<RoleAttributes> = {
      id: { type: Sequelize.INTEGER, primaryKey: true },
			name: { type: Sequelize.STRING },
    };
    const Role = sequelize.define<RoleInstance, RoleAttributes>("Role", attributes);
    Role.associate = (models) => {
      Role.belongsToMany(models.User, {
        through: 'UserRole',
        foreignKey: 'role_id', 
        otherKey: 'user_id'
      });
    };
    return Role;
  };

 