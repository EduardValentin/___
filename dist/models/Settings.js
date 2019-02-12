"use strict";
exports.__esModule = true;
var Sequelize = require("sequelize");
exports["default"] = (function (sequelize) {
    var attributes = {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        setting_name: { type: Sequelize.STRING, allowNull: false },
        setting_value: { type: Sequelize.STRING, allowNull: false }
    };
    return sequelize.define('Settings', attributes);
    ;
});
//# sourceMappingURL=Settings.js.map