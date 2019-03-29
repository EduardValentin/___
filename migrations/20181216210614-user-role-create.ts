import * as Sequelize from 'sequelize';

export default {
  up: (queryInterface: Sequelize.QueryInterface, DataTypes: Sequelize.DataTypes) => {
    return queryInterface.createTable('UserRoles', {
      user_id: { type: DataTypes.INTEGER, primaryKey: true, },
      role_id: { type: DataTypes.INTEGER, primaryKey: true, },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: (queryInterface: Sequelize.QueryInterface, DataTypes: Sequelize.Sequelize) => {
    return queryInterface.dropTable('UserRoles');
  }
}