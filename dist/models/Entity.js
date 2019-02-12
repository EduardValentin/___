"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
exports.default = (sequelize) => {
    const attributes = {
        name: { type: Sequelize.STRING },
        type: { type: Sequelize.STRING },
        route: { type: Sequelize.STRING, unique: true },
    };
    const Entity = sequelize.define("Entity", attributes);
    Entity.associate = (models) => {
        Entity.belongsTo(models.User, {
            foreignKey: 'user_id',
            targetKey: 'id',
        });
    };
    return Entity;
};
//# sourceMappingURL=Entity.js.map