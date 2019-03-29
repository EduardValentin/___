import * as Sequelize from 'sequelize';
import Database from '../models/index';
import { appendTablePrefix } from '../utils/utils';

export default {
  up: (queryInterface: Sequelize.QueryInterface, DataTypes: Sequelize.DataTypes) => {
    return queryInterface.createTable('Pages', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
      label: { type: DataTypes.STRING, allowNull: false },
      link: { type: DataTypes.STRING, allowNull: false, unique: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: async (queryInterface: Sequelize.QueryInterface, DataTypes: Sequelize.Sequelize) => {
    const entities = await Database.Entity.findAll();
    const promises = [];
    entities.forEach(entity => {
      console.log(entity.toJSON());

      promises.push(queryInterface.dropTable(appendTablePrefix(entity.name)));
    });

    await Promise.all(promises);

    return queryInterface.dropTable('Pages');
  }
}