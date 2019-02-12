"use strict";
exports.__esModule = true;
exports["default"] = {
    up: function (queryInterface, DataTypes) {
        queryInterface.createTable('Comments', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            content: { type: DataTypes.STRING, allowNull: false },
            up_votes: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
            createdAt: { type: DataTypes.DATE, allowNull: false },
            updatedAt: { type: DataTypes.DATE, allowNull: false }
        });
    },
    down: function (queryInterface, DataTypes) {
        queryInterface.dropTable('Comments');
    }
};
//# sourceMappingURL=20181216153752-comment-create.js.map