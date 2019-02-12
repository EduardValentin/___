import * as Sequelize from 'sequelize';

export default {
  up: (queryInterface: Sequelize.QueryInterface, DataTypes: Sequelize.DataTypes) => {
    queryInterface.createTable('Tags',{
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      color: { type: DataTypes.STRING, allowNull: false, },
      name: { type: DataTypes.STRING, allowNull: false, unique: true, },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
    });
  },

  down: (queryInterface: Sequelize.QueryInterface, DataTypes: Sequelize.Sequelize) => {
    queryInterface.dropTable('Tags');
  }
}