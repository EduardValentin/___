"use strict";
exports.__esModule = true;
var Sequelize = require("sequelize");
exports["default"] = {
    up: function (queryInterface, DataTypes) {
        queryInterface.createTable('TemplatesEntities', {
            template_id: { type: DataTypes.INTEGER, primaryKey: true },
            entity_id: { type: DataTypes.INTEGER, primaryKey: true },
            createdAt: { type: Sequelize.DATE, allowNull: false },
            updatedAt: { type: Sequelize.DATE, allowNull: false }
        });
    },
    down: function (queryInterface, DataTypes) {
        queryInterface.dropTable('TemplatesEntities');
    }
};
//# sourceMappingURL=20181217202339-template-entity-create.js.map