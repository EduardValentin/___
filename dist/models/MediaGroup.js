"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
exports.default = (sequelize) => {
    const attributes = {
        name: { type: Sequelize.STRING },
        parent_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'MediaGroups',
                key: 'id',
            },
        }
    };
    const MediaGroup = sequelize.define('MediaGroup', attributes);
    MediaGroup.associate = (models) => {
        MediaGroup.hasMany(models.MediaFile, {
            foreignKey: 'group_id',
        });
        MediaGroup.hasMany(models.MediaGroup, {
            foreignKey: 'parent_id',
        });
    };
    return MediaGroup;
};
//# sourceMappingURL=MediaGroup.js.map