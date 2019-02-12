"use strict";
exports.__esModule = true;
var Sequelize = require("sequelize");
exports["default"] = (function (sequelize) {
    var attributes = {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        label: { type: Sequelize.STRING, allowNull: false },
        link: { type: Sequelize.STRING, allowNull: false, unique: true }
    };
    var Page = sequelize.define('Page', attributes);
    Page.associate = function (models) {
        Page.belongsTo(models.User, {
            foreignKey: 'user_id',
            targetKey: 'id'
        });
        Page.belongsToMany(models.Article, {
            through: 'PagesTemplates',
            foreignKey: 'page_id',
            otherKey: 'template_id'
        });
    };
    return Page;
});
//# sourceMappingURL=Page.js.map