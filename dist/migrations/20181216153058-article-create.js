"use strict";
exports.__esModule = true;
exports["default"] = {
    up: function (queryInterface, DataTypes) {
        queryInterface.createTable('Articles', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            title: { type: DataTypes.STRING, allowNull: false, unique: true },
            publish_date: { type: DataTypes.DATE, allowNull: true },
            createdAt: { type: DataTypes.DATE, allowNull: false },
            updatedAt: { type: DataTypes.DATE, allowNull: false }
        });
    },
    down: function (queryInterface, DataTypes) {
        queryInterface.dropTable('Articles');
    }
};
//# sourceMappingURL=20181216153058-article-create.js.map