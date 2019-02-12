"use strict";
exports.__esModule = true;
var Sequelize = require("sequelize");
exports["default"] = (function (sequelize) {
    var attributes = {
        firstName: { type: Sequelize.STRING, allowNull: false },
        lastName: { type: Sequelize.STRING, allowNull: false },
        // @ts-ignore
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                msg: 'Email address already exists'
            },
            validate: {
                isEmail: {
                    msg: 'Email is not a valid email address'
                }
            }
        },
        // @ts-ignore
        username: { type: Sequelize.STRING, allowNull: false, unique: { msg: 'Username already exists' } },
        password: { type: Sequelize.STRING, allowNull: false }
    };
    var User = sequelize.define("User", attributes);
    User.associate = function (models) {
        User.belongsToMany(models.Role, {
            through: 'UserRole',
            foreignKey: 'user_id',
            otherKey: 'role_id'
        });
    };
    return User;
});
//# sourceMappingURL=User.js.map