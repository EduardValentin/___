"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
exports.default = (sequelize) => {
    const attributes = {
        id: { type: Sequelize.INTEGER, primaryKey: true },
        name: { type: Sequelize.STRING },
    };
    const Role = sequelize.define("Role", attributes);
    Role.associate = (models) => {
        Role.belongsToMany(models.User, {
            through: 'UserRole',
            foreignKey: 'role_id',
            otherKey: 'user_id'
        });
    };
    return Role;
};
//# sourceMappingURL=Role.js.map