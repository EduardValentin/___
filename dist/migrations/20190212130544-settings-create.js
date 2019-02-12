"use strict";
exports.__esModule = true;
var Sequelize = require("sequelize");
exports["default"] = {
    up: function (queryInterface, DataTypes) {
        // comment
        queryInterface.createTable('Settings', {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            setting_name: { type: Sequelize.STRING, allowNull: false },
            setting_value: { type: Sequelize.STRING, allowNull: false }
        });
    },
    down: function (queryInterface, DataTypes) {
        queryInterface.dropTable('Settings');
    }
};
//# sourceMappingURL=20190212130544-settings-create.js.map