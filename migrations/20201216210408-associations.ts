import * as Sequelize from 'sequelize';

export default {
  up: (queryInterface: Sequelize.QueryInterface, DataTypes: Sequelize.DataTypes) => {
    return Promise.all([

      // -- Articles
      queryInterface.addColumn('Articles', 'user_id', {
        // Article belongs to User 
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        }
      }),
      queryInterface.addColumn('Articles', 'text_id', {
        // Article has one text
        type: DataTypes.INTEGER,
        references: {
          model: 'Texts',
          key: 'id',
        }
      }),
      queryInterface.addColumn('Comments', 'parent_id', {
        // Comment belongs to Comment
        type: DataTypes.INTEGER,
        references: {
          model: 'Comments',
          key: 'id',
        }
      }),

      // -- Comments
      queryInterface.addColumn('Comments', 'user_id', {
        // Comment belongs to User
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        }
      }),

      queryInterface.addColumn('Comments', 'article_id', {
        // Comment belongs to Article
        type: DataTypes.INTEGER,
        references: {
          model: 'Articles',
          key: 'id',
        }
      }),

      // -- MediaFiles
      queryInterface.addColumn('MediaFiles', 'user_id', {
        // MediaFile belongs to User
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        }
      }),

      // MediaGroup has many MediaFiles
      queryInterface.addColumn('MediaFiles', 'media_group_id', {
        type: DataTypes.INTEGER,
        references: {
          model: 'MediaGroups',
          key: 'id',
        }
      }),

      // Entitiy has many UIControls
      queryInterface.addColumn('UIControls', 'entity_id', {
        type: DataTypes.INTEGER,
        references: {
          model: 'Entities',
          key: 'id',
        },
      }),

      // User has many entities
      queryInterface.addColumn('Entities', 'user_id', {
        type: DataTypes.INTEGER,
        defaultValue: null,
        references: {
          model: 'Users',
          key: 'id',
        },
      }),
    ]);
  },

  down: (queryInterface: Sequelize.QueryInterface, DataTypes: Sequelize.Sequelize) => {
    Promise.all([
      queryInterface.removeColumn('Articles', 'user_id'),
      queryInterface.removeColumn('Articles', 'text_id'),
      queryInterface.removeColumn('Comments', 'parent_id'),
      queryInterface.removeColumn('Comments', 'user_id'),
      queryInterface.removeColumn('Comments', 'article_id'),
      queryInterface.removeColumn('MediaFiles', 'user_id'),
      queryInterface.removeColumn('MediaFiles', 'media_group_id'),
      queryInterface.removeColumn('UIControls', 'entity_id'),
      queryInterface.removeColumn('Entities', 'user_id'),
    ]);
  }
}