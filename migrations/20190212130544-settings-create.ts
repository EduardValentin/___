import * as Sequelize from 'sequelize';

export default {
  up: (queryInterface: Sequelize.QueryInterface, DataTypes: Sequelize.DataTypes) => {
    // comment
    queryInterface.createTable('Settings',{
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      setting_name: { type: Sequelize.STRING, allowNull: false, },
      setting_value: { type: Sequelize.STRING, allowNull: false, },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
    });
  },

  down: (queryInterface: Sequelize.QueryInterface, DataTypes: Sequelize.Sequelize) => {
    queryInterface.dropTable('Settings');
  }
} 