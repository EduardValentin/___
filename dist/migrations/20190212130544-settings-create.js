"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
exports.default = {
    up: (queryInterface, DataTypes) => {
        // comment
        return queryInterface.createTable('Settings', {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            setting_name: { type: Sequelize.STRING, allowNull: false, },
            setting_value: { type: Sequelize.STRING, allowNull: false, },
            createdAt: { type: Sequelize.DATE },
            updatedAt: { type: Sequelize.DATE },
        });
    },
    down: (queryInterface, DataTypes) => {
        return queryInterface.dropTable('Settings');
    }
};
//# sourceMappingURL=20190212130544-settings-create.js.map