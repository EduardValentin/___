"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
exports.default = {
    up: (queryInterface, DataTypes) => {
        // comment
        queryInterface.createTable('UIControls', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name: { type: DataTypes.STRING, allowNull: false, },
            type: { type: DataTypes.STRING, allowNull: false, },
            createdAt: { type: Sequelize.DATE },
            updatedAt: { type: Sequelize.DATE },
        });
    },
    down: (queryInterface, DataTypes) => {
        queryInterface.dropTable('UIControls');
    }
};
//# sourceMappingURL=20190224182640-ui-control-create.js.map