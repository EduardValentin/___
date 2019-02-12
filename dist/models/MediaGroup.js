"use strict";
exports.__esModule = true;
var Sequelize = require("sequelize");
exports["default"] = (function (sequelize) {
    var attributes = {
        name: { type: Sequelize.STRING }
    };
    var MediaGroup = sequelize.define('MediaGroup', attributes);
    MediaGroup.associate = function (models) {
        MediaGroup.belongsTo(models.User, {
            foreignKey: 'user_id',
            targetKey: 'id'
        });
        MediaGroup.hasMany(models.MediaFile, {
            foreignKey: 'media_file_id'
        });
    };
    return MediaGroup;
});
//# sourceMappingURL=MediaGroup.js.map