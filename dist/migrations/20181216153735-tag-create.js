"use strict";
exports.__esModule = true;
exports["default"] = {
    up: function (queryInterface, DataTypes) {
        queryInterface.createTable('Tags', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            color: { type: DataTypes.STRING, allowNull: false },
            name: { type: DataTypes.STRING, allowNull: false, unique: true },
            createdAt: { type: DataTypes.DATE, allowNull: false },
            updatedAt: { type: DataTypes.DATE, allowNull: false }
        });
    },
    down: function (queryInterface, DataTypes) {
        queryInterface.dropTable('Tags');
    }
};
//# sourceMappingURL=20181216153735-tag-create.js.map