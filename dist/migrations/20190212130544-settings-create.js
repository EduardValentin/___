"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
exports.default = {
    up: (queryInterface, DataTypes) => {
        // comment
        queryInterface.createTable('Settings', {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            setting_name: { type: Sequelize.STRING, allowNull: false, },
            setting_value: { type: Sequelize.STRING, allowNull: false, },
            createdAt: { type: Sequelize.DATE },
            updatedAt: { type: Sequelize.DATE },
        });
    },
    down: (queryInterface, DataTypes) => {
        queryInterface.dropTable('Settings');
    }
};
//# sourceMappingURL=20190212130544-settings-create.js.map