import * as Sequelize from 'sequelize';

export default {
  up: (queryInterface: Sequelize.QueryInterface, DataTypes: Sequelize.DataTypes) => {
    queryInterface.createTable('Articles',{
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: DataTypes.STRING, allowNull: false, unique: true, },
      publish_date: { type: DataTypes.DATE, allowNull: true, },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
    });
  },

  down: (queryInterface: Sequelize.QueryInterface, DataTypes: Sequelize.Sequelize) => {
    queryInterface.dropTable('Articles');
  }
}