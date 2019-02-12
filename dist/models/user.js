"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
exports.default = (sequelize) => {
    const attributes = {
        firstName: { type: Sequelize.STRING, allowNull: false },
        lastName: { type: Sequelize.STRING, allowNull: false },
        // @ts-ignore
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                msg: 'Email address already exists',
            },
            validate: {
                isEmail: {
                    msg: 'Email is not a valid email address'
                }
            }
        },
        // @ts-ignore
        username: { type: Sequelize.STRING, allowNull: false, unique: { msg: 'Username already exists' } },
        password: { type: Sequelize.STRING, allowNull: false },
    };
    const User = sequelize.define("User", attributes);
    User.associate = (models) => {
        User.belongsToMany(models.Role, {
            through: 'UserRole',
            foreignKey: 'user_id',
            otherKey: 'role_id'
        });
    };
    return User;
};
//# sourceMappingURL=User.js.map