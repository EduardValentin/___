"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
exports.default = {
    up: (queryInterface, DataTypes) => {
        queryInterface.createTable('UserRoles', {
            user_id: { type: DataTypes.INTEGER, primaryKey: true, },
            role_id: { type: DataTypes.INTEGER, primaryKey: true, },
            createdAt: { type: Sequelize.DATE, allowNull: false },
            updatedAt: { type: Sequelize.DATE, allowNull: false },
        });
    },
    down: (queryInterface, DataTypes) => {
        queryInterface.dropTable('UserRoles');
    }
};
//# sourceMappingURL=20181216210614-user-role-create.js.map