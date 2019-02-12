"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
exports["default"] = (function (sequelize) {
    var attributes = {
        up_votes: { type: sequelize_1.INTEGER },
        content: { type: sequelize_1.STRING }
    };
    var Comment = sequelize.define("Comment", attributes);
    Comment.associate = function (models) {
        Comment.belongsTo(models.User, {
            foreignKey: 'user_id',
            targetKey: 'id'
        });
        Comment.hasMany(models.Comment, {
            foreignKey: 'comment_id'
        });
    };
    return Comment;
});
//# sourceMappingURL=Comment.js.map