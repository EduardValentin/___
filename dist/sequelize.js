"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const User_1 = require("./models/User");
exports.createModels = (sequelizeConfig) => {
    const { database, username, password, params } = sequelizeConfig;
    const sequelize = new Sequelize(database, username, password, params);
    const db = {
        sequelize,
        Sequelize,
        User: User_1.UserFactory(sequelize, Sequelize)
    };
    return db;
};
//# sourceMappingURL=sequelize.js.map