"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
exports.default = (sequelize) => {
    const attributes = {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: Sequelize.STRING, allowNull: false, },
        type: { type: Sequelize.STRING, allowNull: false, },
        entity_id: {
            type: Sequelize.INTEGER, references: {
                model: 'Entities',
                key: 'id',
            }
        }
    };
    const UIControl = sequelize.define("UIControl", attributes);
    UIControl.associate = (models) => {
        UIControl.belongsTo(models.Entity, {
            foreignKey: 'entity_id',
            targetKey: 'id',
        });
    };
    return UIControl;
};
//# sourceMappingURL=UIControl.js.map