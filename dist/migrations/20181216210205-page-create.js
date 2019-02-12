"use strict";
exports.__esModule = true;
var Sequelize = require("sequelize");
exports["default"] = {
    up: function (queryInterface, DataTypes) {
        queryInterface.createTable('Pages', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            label: { type: DataTypes.STRING, allowNull: false },
            link: { type: DataTypes.STRING, allowNull: false, unique: true },
            createdAt: { type: Sequelize.DATE, allowNull: false },
            updatedAt: { type: Sequelize.DATE, allowNull: false }
        });
    },
    down: function (queryInterface, DataTypes) {
        queryInterface.dropTable('Pages');
    }
};
//# sourceMappingURL=20181216210205-page-create.js.map