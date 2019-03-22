"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    up: (queryInterface, DataTypes) => {
        queryInterface.createTable('Comments', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            content: { type: DataTypes.STRING, allowNull: false },
            up_votes: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
            parent_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'Comments',
                    key: 'id',
                }
            },
            article_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'Articles',
                    key: 'id',
                }
            },
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
        queryInterface.dropTable('Comments');
    }
};
//# sourceMappingURL=20181216153752-comment-create.js.map