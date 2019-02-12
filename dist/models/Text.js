"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
exports.default = (sequelize) => {
    const attributes = {
        content: { type: Sequelize.STRING },
    };
    const Text = sequelize.define("Text", attributes);
    Text.associate = (models) => {
        Text.belongsTo(models.User, {
            foreignKey: 'user_id',
            targetKey: 'id',
        });
    };
    return Text;
};
//# sourceMappingURL=Text.js.map