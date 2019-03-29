"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
exports.default = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable('Templates', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
            name: { type: DataTypes.STRING, allowNull: false, unique: true },
            description: { type: DataTypes.STRING, allowNull: true, },
            entity_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'Entities',
                    key: 'id',
                }
            },
            createdAt: { type: Sequelize.DATE, allowNull: false },
            updatedAt: { type: Sequelize.DATE, allowNull: false },
        });
    },
    down: (queryInterface, DataTypes) => {
        return queryInterface.dropTable('Templates');
    }
};
//# sourceMappingURL=20181021155316-template-create.js.map