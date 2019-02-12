"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
exports.default = (sequelize) => {
    const attributes = {
        path: { type: Sequelize.STRING },
        type: { type: Sequelize.STRING },
    };
    const MediaFile = sequelize.define("MediaFile", attributes);
    MediaFile.associate = (models) => {
        MediaFile.belongsTo(models.User, {
            foreignKey: 'user_id',
            targetKey: 'id',
        });
    };
    return MediaFile;
};
//# sourceMappingURL=MediaFile.js.map