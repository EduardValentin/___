"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
exports.default = (sequelize) => {
    const attributes = {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: Sequelize.STRING },
        color: { type: Sequelize.STRING },
    };
    const Tag = sequelize.define('Tag', attributes);
    Tag.associate = (models) => {
        Tag.belongsTo(models.User, {
            foreignKey: 'user_id',
            targetKey: 'id',
        });
        Tag.belongsToMany(models.Article, { through: 'ArticlesTags', foreignKey: 'tag_id', otherKey: 'article_id' });
    };
    return Tag;
};
//# sourceMappingURL=Tag.js.map