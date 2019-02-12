"use strict";
exports.__esModule = true;
var Sequelize = require("sequelize");
exports["default"] = (function (sequelize) {
    var attributes = {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: Sequelize.STRING },
        color: { type: Sequelize.STRING }
    };
    var Tag = sequelize.define('Tag', attributes);
    Tag.associate = function (models) {
        Tag.belongsTo(models.User, {
            foreignKey: 'user_id',
            targetKey: 'id'
        });
        Tag.belongsToMany(models.Article, { through: 'ArticlesTags', foreignKey: 'tag_id', otherKey: 'article_id' });
    };
    return Tag;
});
//# sourceMappingURL=Tag.js.map