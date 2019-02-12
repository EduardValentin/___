import * as Sequelize from 'sequelize';

export default {
  up: (queryInterface: Sequelize.QueryInterface, DataTypes: Sequelize.DataTypes) => {
    queryInterface.createTable('Texts',{
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
      content: { type: DataTypes.STRING, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: (queryInterface: Sequelize.QueryInterface, DataTypes: Sequelize.Sequelize) => {
    queryInterface.dropTable('Texts');
  }
}