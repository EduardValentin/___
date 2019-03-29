"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable('Tags', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            color: { type: DataTypes.STRING, allowNull: false, },
            name: { type: DataTypes.STRING, allowNull: false, unique: true, },
            createdAt: { type: DataTypes.DATE, allowNull: false },
            updatedAt: { type: DataTypes.DATE, allowNull: false },
        });
    },
    down: (queryInterface, DataTypes) => {
        return queryInterface.dropTable('Tags');
    }
};
//# sourceMappingURL=20181216153735-tag-create.js.map