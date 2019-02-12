"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
exports.default = (sequelize) => {
    const attributes = {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        path: { type: Sequelize.STRING, allowNull: false, unique: true },
        name: { type: Sequelize.STRING, allowNull: false, unique: true },
    };
    const Template = sequelize.define("Template", attributes);
    Template.associate = (models) => {
        Template.belongsToMany(models.Entity, {
            through: 'TemplatesEntities',
            foreignKey: 'template_id',
            otherKey: 'entity_id',
        });
        Template.belongsToMany(models.Page, {
            through: 'PagesTemplates',
            foreignKey: 'template_id',
            otherKey: 'page_id',
        });
    };
    return Template;
};
//# sourceMappingURL=Template.js.map