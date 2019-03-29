"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
exports.default = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable('Roles', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
            name: { type: DataTypes.STRING, allowNull: false },
            createdAt: { type: Sequelize.DATE, allowNull: false },
            updatedAt: { type: Sequelize.DATE, allowNull: false },
        });
    },
    down: (queryInterface, DataTypes) => {
        return queryInterface.dropTable('Roles');
    }
};
//# sourceMappingURL=20181216210607-role-create.js.map