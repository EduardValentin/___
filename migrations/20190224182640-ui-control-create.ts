import * as Sequelize from 'sequelize';

export default {
  up: (queryInterface: Sequelize.QueryInterface, DataTypes: Sequelize.DataTypes) => {
    // comment
    return queryInterface.createTable('UIControls', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false, },
      type: { type: DataTypes.STRING, allowNull: false, },
      entity_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Entities',
          key: 'id',
        }
      },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
    });
  },

  down: (queryInterface: Sequelize.QueryInterface, DataTypes: Sequelize.Sequelize) => {
    return queryInterface.dropTable('UIControls');
  }
} 