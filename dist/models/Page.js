"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
exports.default = (sequelize) => {
    const attributes = {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        label: { type: Sequelize.STRING, allowNull: false },
        link: { type: Sequelize.STRING, allowNull: false, unique: true },
    };
    const Page = sequelize.define('Page', attributes);
    Page.associate = (models) => {
        Page.belongsTo(models.User, {
            foreignKey: 'user_id',
            targetKey: 'id',
        });
        Page.belongsToMany(models.Article, {
            through: 'PagesTemplates',
            foreignKey: 'page_id',
            otherKey: 'template_id'
        });
    };
    return Page;
};
//# sourceMappingURL=Page.js.map