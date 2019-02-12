"use strict";
exports.__esModule = true;
var Sequelize = require("sequelize");
exports["default"] = {
    up: function (queryInterface, DataTypes) {
        queryInterface.createTable('PagesTemplates', {
            page_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            template_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            createdAt: { type: Sequelize.DATE, allowNull: false },
            updatedAt: { type: Sequelize.DATE, allowNull: false }
        });
    },
    down: function (queryInterface, DataTypes) {
        queryInterface.dropTable('PagesTemplates');
    }
};
//# sourceMappingURL=20181217204031-page-template-create.js.map