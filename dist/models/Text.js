"use strict";
exports.__esModule = true;
var Sequelize = require("sequelize");
exports["default"] = (function (sequelize) {
    var attributes = {
        content: { type: Sequelize.STRING }
    };
    var Text = sequelize.define("Text", attributes);
    Text.associate = function (models) {
        Text.belongsTo(models.User, {
            foreignKey: 'user_id',
            targetKey: 'id'
        });
    };
    return Text;
});
//# sourceMappingURL=Text.js.map