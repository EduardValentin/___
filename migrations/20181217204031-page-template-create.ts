import * as Sequelize from 'sequelize';

export default {
  up: (queryInterface: Sequelize.QueryInterface, DataTypes: Sequelize.DataTypes) => {
    queryInterface.createTable('PagesTemplates',{
      page_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      template_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: (queryInterface: Sequelize.QueryInterface, DataTypes: Sequelize.Sequelize) => {
    queryInterface.dropTable('PagesTemplates');
  }
}
