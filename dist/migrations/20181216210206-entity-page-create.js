"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
exports.default = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable('EntityPage', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            entity_id: {
                type: DataTypes.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Entities',
                    key: 'id',
                }
            },
            page_id: {
                type: DataTypes.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Pages',
                    key: 'id',
                }
            },
            createdAt: { type: Sequelize.DATE, allowNull: false },
            updatedAt: { type: Sequelize.DATE, allowNull: false },
        });
    },
    down: (queryInterface, DataTypes) => {
        return queryInterface.dropTable('EntityPage');
    }
};
//# sourceMappingURL=20181216210206-entity-page-create.js.map