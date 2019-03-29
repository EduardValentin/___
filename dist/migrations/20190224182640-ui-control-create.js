"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
exports.default = {
    up: (queryInterface, DataTypes) => {
        // comment
        return queryInterface.createTable('UIControls', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            name: { type: DataTypes.STRING, allowNull: false, },
            type: { type: DataTypes.STRING, allowNull: false, },
            entity_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'Entities',
                    key: 'id',
                }
            },
            createdAt: { type: Sequelize.DATE },
            updatedAt: { type: Sequelize.DATE },
        });
    },
    down: (queryInterface, DataTypes) => {
        return queryInterface.dropTable('UIControls');
    }
};
//# sourceMappingURL=20190224182640-ui-control-create.js.map