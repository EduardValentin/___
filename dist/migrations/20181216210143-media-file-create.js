"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
exports.default = {
    up: (queryInterface, DataTypes) => {
        queryInterface.createTable('MediaFiles', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
            name: { type: DataTypes.STRING, allowNull: false },
            type: { type: DataTypes.STRING, allowNull: true },
            createdAt: { type: Sequelize.DATE, allowNull: false },
            updatedAt: { type: Sequelize.DATE, allowNull: false },
        });
    },
    down: (queryInterface, DataTypes) => {
        queryInterface.dropTable('MediaFiles');
    }
};
//# sourceMappingURL=20181216210143-media-file-create.js.map