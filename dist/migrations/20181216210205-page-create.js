"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const index_1 = require("../models/index");
const utils_1 = require("../utils/utils");
exports.default = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable('Pages', {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
            label: { type: DataTypes.STRING, allowNull: false },
            link: { type: DataTypes.STRING, allowNull: false, unique: true },
            createdAt: { type: Sequelize.DATE, allowNull: false },
            updatedAt: { type: Sequelize.DATE, allowNull: false },
        });
    },
    down: (queryInterface, DataTypes) => __awaiter(this, void 0, void 0, function* () {
        const entities = yield index_1.default.Entity.findAll();
        const promises = [];
        entities.forEach(entity => {
            console.log(entity.toJSON());
            promises.push(queryInterface.dropTable(utils_1.appendTablePrefix(entity.name)));
        });
        yield Promise.all(promises);
        return queryInterface.dropTable('Pages');
    })
};
//# sourceMappingURL=20181216210205-page-create.js.map