"use strict";
exports.__esModule = true;
var Sequelize = require("sequelize");
exports["default"] = (function (sequelize) {
    var attributes = {
        name: { type: Sequelize.STRING },
        type: { type: Sequelize.STRING },
        route: { type: Sequelize.STRING, unique: true }
    };
    var Entity = sequelize.define("Entity", attributes);
    Entity.associate = function (models) {
        Entity.belongsTo(models.User, {
            foreignKey: 'user_id',
            targetKey: 'id'
        });
    };
    return Entity;
});
//# sourceMappingURL=Entity.js.map