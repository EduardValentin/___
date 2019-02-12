"use strict";
exports.__esModule = true;
exports["default"] = {
    up: function (queryInterface, DataTypes) {
        queryInterface.createTable('ArticlesTags', {
            article_id: { type: DataTypes.INTEGER, primaryKey: true },
            tag_id: { type: DataTypes.INTEGER, primaryKey: true },
            createdAt: { type: DataTypes.DATE, allowNull: false },
            updatedAt: { type: DataTypes.DATE, allowNull: false }
        });
    },
    down: function (queryInterface, DataTypes) {
        queryInterface.dropTable('ArticlesTags');
    }
};
//# sourceMappingURL=20181216154637-article-tag-create.js.map