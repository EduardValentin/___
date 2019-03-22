"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
exports.default = (sequelize) => {
    const attributes = {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: Sequelize.STRING, allowNull: false, unique: true },
        description: { type: Sequelize.STRING, allowNull: true, },
    };
    const Template = sequelize.define("Template", attributes);
    return Template;
};
//# sourceMappingURL=Template.js.map