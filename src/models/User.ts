import * as Sequelize from 'sequelize';

export interface UserAttributes    {
    id?: number;              // id is an auto-generated UUID
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    createdAt?: string;
    updatedAt?: string;
}

export type UserInstance = Sequelize.Instance<UserAttributes> & UserAttributes;

export default (sequelize: Sequelize.Sequelize) => {
    const attributes: SequelizeAttributes<UserAttributes> = {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      firstName: { type: Sequelize.STRING, allowNull: false },
      lastName: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false },
      username: { type: Sequelize.STRING, allowNull: false },
      password: { type: Sequelize.STRING, allowNull: false },
    };

    return sequelize.define<UserInstance, UserAttributes>("User", attributes);
  };