import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface UserAttributes {
  id?: number
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
}

export type UserInstance = Sequelize.Instance<UserAttributes> & UserAttributes;
export default (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<UserAttributes> = {
    firstName: { type: Sequelize.STRING, allowNull: false },
    lastName: { type: Sequelize.STRING, allowNull: false },
    // @ts-ignore
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        msg: 'Email address already exists',
      },
      validate: {
        isEmail: {
          msg: 'Email is not a valid email address'
        }
      }
    },
    // @ts-ignore
    username: { type: Sequelize.STRING, allowNull: false, unique: { msg: 'Username already exists' } },
    password: { type: Sequelize.STRING, allowNull: false },
  };

  const User = sequelize.define<UserInstance, UserAttributes>("User", attributes);
  User.associate = (models) => {
    User.belongsToMany(models.Role, {
      through: 'UserRole',
      foreignKey: 'user_id', 
      otherKey: 'role_id'
    });
  }
  return User;
};