"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
exports.default = (sequelize) => {
    const attributes = {
        name: { type: Sequelize.STRING },
    };
    const MediaGroup = sequelize.define('MediaGroup', attributes);
    MediaGroup.associate = (models) => {
        MediaGroup.belongsTo(models.User, {
            foreignKey: 'user_id',
            targetKey: 'id',
        });
        MediaGroup.hasMany(models.MediaFile, {
            foreignKey: 'media_file_id',
        });
    };
    return MediaGroup;
};
//# sourceMappingURL=MediaGroup.js.map