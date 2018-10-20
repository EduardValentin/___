"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
exports.default = (sequelize) => {
    const attributes = {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        firstName: { type: Sequelize.STRING, allowNull: false },
        lastName: { type: Sequelize.STRING, allowNull: false },
        email: { type: Sequelize.STRING, allowNull: false },
        username: { type: Sequelize.STRING, allowNull: false },
        password: { type: Sequelize.STRING, allowNull: false },
    };
    return sequelize.define("User", attributes);
};
//# sourceMappingURL=User.js.map