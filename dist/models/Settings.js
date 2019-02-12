"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
exports.default = (sequelize) => {
    const attributes = {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        setting_name: { type: Sequelize.STRING, allowNull: false, },
        setting_value: { type: Sequelize.STRING, allowNull: false, },
    };
    return sequelize.define('Settings', attributes);
    ;
};
//# sourceMappingURL=Settings.js.map