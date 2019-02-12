"use strict";
exports.__esModule = true;
var Sequelize = require("sequelize");
exports["default"] = (function (sequelize) {
    var attributes = {
        id: { type: Sequelize.INTEGER, primaryKey: true },
        name: { type: Sequelize.STRING }
    };
    var Role = sequelize.define("Role", attributes);
    Role.associate = function (models) {
        Role.belongsToMany(models.User, {
            through: 'UserRole',
            foreignKey: 'role_id',
            otherKey: 'user_id'
        });
    };
    return Role;
});
//# sourceMappingURL=Role.js.map