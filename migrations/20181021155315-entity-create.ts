import * as Sequelize from 'sequelize';
import Database from '../models/index';
import { appendTablePrefix } from '../utils/utils';

export default {
  up: (queryInterface: Sequelize.QueryInterface, DataTypes: Sequelize.DataTypes) => {
    return queryInterface.createTable('Entities', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false, unique: true, },
      template_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Templates',
          key: 'id'
        },
        allowNull: true
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: async (queryInterface: Sequelize.QueryInterface, DataTypes: Sequelize.Sequelize) => {
    const entities = await Database.Entity.findAll();
    const promises = [];
    entities.forEach(entity => {
      promises.push(queryInterface.dropTable(appendTablePrefix(entity.name)));
    });

    await Promise.all(promises);

    queryInterface.dropTable('Entities');

  }
}