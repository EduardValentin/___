"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    up: (queryInterface, DataTypes) => {
        queryInterface.createTable('ArticlesTags', {
            article_id: { type: DataTypes.INTEGER, primaryKey: true },
            tag_id: { type: DataTypes.INTEGER, primaryKey: true },
            createdAt: { type: DataTypes.DATE, allowNull: false },
            updatedAt: { type: DataTypes.DATE, allowNull: false },
        });
    },
    down: (queryInterface, DataTypes) => {
        queryInterface.dropTable('ArticlesTags');
    }
};
//# sourceMappingURL=20181216154637-article-tag-create.js.map