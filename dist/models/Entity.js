"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
exports.default = (sequelize) => {
    const attributes = {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, },
        name: { type: Sequelize.STRING, allowNull: false, unique: true, },
    };
    const Entity = sequelize.define("Entity", attributes);
    Entity.associate = (models) => {
        Entity.belongsTo(models.User, {
            foreignKey: 'user_id',
            targetKey: 'id',
        });
        Entity.hasMany(models.UIControl, {
            foreignKey: 'entity_id',
        });
    };
    return Entity;
};
//# sourceMappingURL=Entity.js.map