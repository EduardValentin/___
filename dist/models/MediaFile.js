"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
exports.default = (sequelize) => {
    const attributes = {
        name: { type: Sequelize.STRING, allowNull: false, unique: true },
        group_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'MediaGroups',
                key: 'id',
            }
        },
        type: { type: Sequelize.STRING },
    };
    const MediaFile = sequelize.define("MediaFile", attributes);
    MediaFile.associate = (models) => {
        MediaFile.belongsTo(models.MediaGroup, {
            foreignKey: 'group_id',
            targetKey: 'id',
            onDelete: 'CASCADE',
        });
    };
    return MediaFile;
};
//# sourceMappingURL=MediaFile.js.map