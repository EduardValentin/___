"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
exports.default = {
    up: (queryInterface, DataTypes) => {
        queryInterface.createTable('Templates', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
            name: { type: DataTypes.STRING, allowNull: false, unique: true },
            description: { type: DataTypes.STRING, allowNull: true, },
            createdAt: { type: Sequelize.DATE, allowNull: false },
            updatedAt: { type: Sequelize.DATE, allowNull: false },
        });
    },
    down: (queryInterface, DataTypes) => {
        queryInterface.dropTable('Templates');
    }
};
//# sourceMappingURL=20181021155316-template-create.js.map