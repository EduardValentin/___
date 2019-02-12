"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
exports.default = (sequelize) => {
    const attributes = {
        title: { type: Sequelize.STRING },
    };
    const Article = sequelize.define("Article", attributes);
    Article.associate = (models) => {
        Article.belongsTo(models.User, {
            foreignKey: 'user_id',
            targetKey: 'id',
        });
        Article.belongsToMany(models.Tag, {
            through: 'ArticlesTags',
            foreignKey: 'article_id',
            otherKey: 'tag_id'
        });
    };
    return Article;
};
//# sourceMappingURL=Article.js.map