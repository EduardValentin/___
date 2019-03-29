import * as Sequelize from 'sequelize';

export default {
  up: (queryInterface: Sequelize.QueryInterface, DataTypes: Sequelize.DataTypes) => {
    return queryInterface.createTable('ArticlesTags', {
      article_id: { type: DataTypes.INTEGER, primaryKey: true },
      tag_id: { type: DataTypes.INTEGER, primaryKey: true },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
    });
  },

  down: (queryInterface: Sequelize.QueryInterface, DataTypes: Sequelize.Sequelize) => {
    return queryInterface.dropTable('ArticlesTags');
  }
}