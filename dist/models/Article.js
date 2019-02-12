"use strict";
exports.__esModule = true;
var Sequelize = require("sequelize");
exports["default"] = (function (sequelize) {
    var attributes = {
        title: { type: Sequelize.STRING }
    };
    var Article = sequelize.define("Article", attributes);
    Article.associate = function (models) {
        Article.belongsTo(models.User, {
            foreignKey: 'user_id',
            targetKey: 'id'
        });
        Article.belongsToMany(models.Tag, {
            through: 'ArticlesTags',
            foreignKey: 'article_id',
            otherKey: 'tag_id'
        });
    };
    return Article;
});
//# sourceMappingURL=Article.js.map