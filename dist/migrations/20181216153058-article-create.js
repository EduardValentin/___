"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable('Articles', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            title: { type: DataTypes.STRING, allowNull: false, unique: true, },
            publish_date: { type: DataTypes.DATE, allowNull: true, },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'Users',
                    key: 'id',
                }
            },
            createdAt: { type: DataTypes.DATE, allowNull: false },
            updatedAt: { type: DataTypes.DATE, allowNull: false },
        });
    },
    down: (queryInterface, DataTypes) => {
        return queryInterface.dropTable('Articles');
    }
};
//# sourceMappingURL=20181216153058-article-create.js.map