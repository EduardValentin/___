"use strict";
exports.__esModule = true;
var Sequelize = require("sequelize");
exports["default"] = (function (sequelize) {
    var attributes = {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        path: { type: Sequelize.STRING, allowNull: false, unique: true },
        name: { type: Sequelize.STRING, allowNull: false, unique: true }
    };
    var Template = sequelize.define("Template", attributes);
    Template.associate = function (models) {
        Template.belongsToMany(models.Entity, {
            through: 'TemplatesEntities',
            foreignKey: 'template_id',
            otherKey: 'entity_id'
        });
        Template.belongsToMany(models.Page, {
            through: 'PagesTemplates',
            foreignKey: 'template_id',
            otherKey: 'page_id'
        });
    };
    return Template;
});
//# sourceMappingURL=Template.js.map