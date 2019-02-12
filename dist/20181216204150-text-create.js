"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
exports.default = {
    up: (queryInterface, DataTypes) => {
        queryInterface.createTable('Texts', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
            content: { type: DataTypes.STRING, allowNull: false },
            createdAt: { type: Sequelize.DATE, allowNull: false },
            updatedAt: { type: Sequelize.DATE, allowNull: false },
        });
    },
    down: (queryInterface, DataTypes) => {
        queryInterface.dropTable('Texts');
    }
};
//# sourceMappingURL=20181216204150-text-create.js.map