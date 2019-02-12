"use strict";
exports.__esModule = true;
var Sequelize = require("sequelize");
exports["default"] = (function (sequelize) {
    var attributes = {
        path: { type: Sequelize.STRING },
        type: { type: Sequelize.STRING }
    };
    var MediaFile = sequelize.define("MediaFile", attributes);
    MediaFile.associate = function (models) {
        MediaFile.belongsTo(models.User, {
            foreignKey: 'user_id',
            targetKey: 'id'
        });
    };
    return MediaFile;
});
//# sourceMappingURL=MediaFile.js.map