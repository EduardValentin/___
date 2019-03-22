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
        return queryInterface.createTable('Entities', {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            name: { type: Sequelize.STRING, allowNull: false, unique: true, },
            template_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Templates',
                    key: 'id'
                },
                allowNull: true
            },
            createdAt: { type: Sequelize.DATE, allowNull: false },
            updatedAt: { type: Sequelize.DATE, allowNull: false },
        });
    },
    down: (queryInterface, DataTypes) => __awaiter(this, void 0, void 0, function* () {
        const entities = yield index_1.default.Entity.findAll();
        const promises = [];
        entities.forEach(entity => {
            promises.push(queryInterface.dropTable(utils_1.appendTablePrefix(entity.name)));
        });
        yield Promise.all(promises);
        queryInterface.dropTable('Entities');
    })
};
//# sourceMappingURL=20181021155416-entity-create.js.map