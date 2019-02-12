"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    const attributes = {
        up_votes: { type: sequelize_1.INTEGER },
        content: { type: sequelize_1.STRING },
    };
    const Comment = sequelize.define("Comment", attributes);
    Comment.associate = (models) => {
        Comment.belongsTo(models.User, {
            foreignKey: 'user_id',
            targetKey: 'id',
        });
        Comment.hasMany(models.Comment, {
            foreignKey: 'comment_id',
        });
    };
    return Comment;
};
//# sourceMappingURL=Comment.js.map