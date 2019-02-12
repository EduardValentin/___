"use strict";
exports.__esModule = true;
exports["default"] = {
    up: function (queryInterface, DataTypes) {
        return Promise.all([
            // -- Articles
            queryInterface.addColumn('Articles', 'user_id', {
                // Article belongs to User 
                type: DataTypes.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            }),
            queryInterface.addColumn('Articles', 'text_id', {
                // Article has one text
                type: DataTypes.INTEGER,
                references: {
                    model: 'Texts',
                    key: 'id'
                }
            }),
            queryInterface.addColumn('Comments', 'parent_id', {
                // Comment belongs to Comment
                type: DataTypes.INTEGER,
                references: {
                    model: 'Comments',
                    key: 'id'
                }
            }),
            // -- Comments
            queryInterface.addColumn('Comments', 'user_id', {
                // Comment belongs to User
                type: DataTypes.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            }),
            queryInterface.addColumn('Comments', 'article_id', {
                // Comment belongs to Article
                type: DataTypes.INTEGER,
                references: {
                    model: 'Articles',
                    key: 'id'
                }
            }),
            // -- MediaFiles
            queryInterface.addColumn('MediaFiles', 'user_id', {
                // MediaFile belongs to User
                type: DataTypes.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            }),
            queryInterface.addColumn('MediaFiles', 'media_group_id', {
                // MediaGroup has many MediaFiles
                type: DataTypes.INTEGER,
                references: {
                    model: 'MediaGroups',
                    key: 'id'
                }
            }),
        ]);
    },
    down: function (queryInterface, DataTypes) {
        Promise.all([
            queryInterface.removeColumn('Articles', 'user_id'),
            queryInterface.removeColumn('Articles', 'text_id'),
            queryInterface.removeColumn('Comments', 'parent_id'),
            queryInterface.removeColumn('Comments', 'user_id'),
            queryInterface.removeColumn('Comments', 'article_id'),
            queryInterface.removeColumn('MediaFiles', 'user_id'),
            queryInterface.removeColumn('MediaFiles', 'media_group_id'),
        ]);
    }
};
//# sourceMappingURL=20201216210408-associations.js.map