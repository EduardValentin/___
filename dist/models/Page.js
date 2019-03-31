"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
;
exports.default = (sequelize) => {
    const attributes = {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        label: { type: Sequelize.STRING, allowNull: false },
        link: { type: Sequelize.STRING, allowNull: false, unique: true },
    };
    const Page = sequelize.define('Page', attributes);
    Page.associate = (models) => {
        Page.belongsToMany(models.Entity, {
            through: models.EntityPage,
            foreignKey: 'page_id',
            otherKey: 'entity_id',
            onDelete: 'CASCADE',
        });
    };
    return Page;
};
//# sourceMappingURL=Page.js.map