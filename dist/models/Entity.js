"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
;
exports.default = (sequelize) => {
    const attributes = {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, },
        name: { type: Sequelize.STRING, allowNull: false, unique: true, },
        template_id: {
            type: Sequelize.INTEGER,
            unique: true,
            allowNull: true,
            references: {
                model: 'Templates',
                key: 'id',
            }
        }
    };
    const Entity = sequelize.define("Entity", attributes);
    Entity.associate = (models) => {
        Entity.belongsTo(models.Template, {
            foreignKey: 'template_id',
            targetKey: 'id',
        });
        Entity.hasMany(models.UIControl, {
            foreignKey: 'entity_id',
        });
        Entity.belongsToMany(models.Page, {
            through: models.EntityPage,
            foreignKey: 'entity_id',
            otherKey: 'page_id',
        });
    };
    return Entity;
};
//# sourceMappingURL=Entity.js.map