"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
exports.default = (sequelize) => {
    const attributes = {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        entity_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            references: {
                model: 'Entities',
                key: 'id',
            },
        },
        page_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            references: {
                model: 'Pages',
                key: 'id',
            },
        },
    };
    const EntityPage = sequelize.define("EntityPage", attributes, {
        freezeTableName: true,
    });
    return EntityPage;
};
//# sourceMappingURL=EntityPage.js.map