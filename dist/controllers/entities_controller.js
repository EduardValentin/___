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
const index_1 = require("../models/index");
const ramda_1 = require("ramda");
const utils_1 = require("../utils/utils");
const DatabasePool_1 = require("../DatabasePool");
const column_definitions = {
    checkmark_input: 'BOOLEAN NOT NULL',
    text_input: 'TEXT NOT NULL',
    date_input: 'DATE NOT NULL',
};
class EntitiesController {
    constructor() {
        this.createEntity = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const reqBody = req.body;
            if (reqBody.name.length === 0 || reqBody.fields.length === 0) {
                res.status(404).send({ message: 'Invalid input' });
                return;
            }
            try {
                // validity checks
                utils_1.verifyEntityOrFields(reqBody.name);
                reqBody.fields.forEach(field => {
                    utils_1.verifyEntityOrFields(field.name);
                });
                const tableDefinition = ramda_1.reduce((acc, elem) => {
                    let columnType = null;
                    switch (elem.type) {
                        case 'checkmark_input':
                            columnType = column_definitions['checkmark_input'];
                            break;
                        case 'date_input':
                            columnType = column_definitions['date_input'];
                            break;
                        case 'text_input':
                            columnType = column_definitions['text_input'];
                            break;
                    }
                    return acc + elem.name + ' ' + columnType + ', ';
                }, '')(reqBody.fields);
                const queryText = `
      CREATE TABLE ${process.env.USER_TABLE_PREFIX}${reqBody.name} (
        id SERIAL PRIMARY KEY,
        page_id INTEGER REFERENCES "public"."Pages" (id),
        ${utils_1.removeCommaFromQuery(tableDefinition)} 
      );
    `;
                yield this.pool.query(queryText);
                // create table
                const entity = yield index_1.default.Entity.create({
                    name: reqBody.name,
                });
                // For every field we add a record in UIControl table with foreign key to entity record
                reqBody.fields.forEach((field) => __awaiter(this, void 0, void 0, function* () {
                    yield index_1.default.UIControl.create({
                        name: field.name,
                        type: field.type,
                        entity_id: entity.id,
                    });
                }));
                const response = yield index_1.default.Entity.all();
                res.status(200).send({
                    data: response,
                });
                // I call slice above to remove the last comma
            }
            catch (error) {
                console.log(error);
                res.status(500).send({ error });
            }
        });
        this.editEntity = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const reqBody = req.body;
            const entity_id = req.params.id;
            if (reqBody.fields.length === 0) {
                res.status(404).send({ message: 'Fields cannot be empty' });
                return;
            }
            try {
                const entity = yield index_1.default.Entity.find({
                    where: {
                        id: entity_id,
                    }
                });
                const actions = reqBody.fields.reduce((acc, elem) => {
                    let actionText = '';
                    switch (elem.action) {
                        case 'add':
                            utils_1.verifyEntityOrFields(elem.name);
                            actionText = 'ADD COLUMN ' + elem.name + ' ' + column_definitions[elem.type] + ', ';
                            break;
                        case 'drop':
                            utils_1.verifyEntityOrFields(elem.name);
                            actionText = 'DROP COLUMN ' + elem.name + ' CASCADE ,';
                            break;
                        case 'rename':
                            utils_1.verifyEntityOrFields(elem.name);
                            utils_1.verifyEntityOrFields(elem.old_name);
                            actionText = 'RENAME COLUMN ' + elem.old_name + ' TO ' + elem.name + ', ';
                            break;
                        case 'rename_table':
                            utils_1.verifyEntityOrFields(elem.name);
                            actionText = 'RENAME TO ' + process.env.USER_TABLE_PREFIX + elem.name + ', ';
                            break;
                        default:
                            res.status(404).send({
                                message: 'Action provided was not found',
                            });
                            break;
                    }
                    return acc + actionText;
                }, ' ');
                let queryText = `ALTER TABLE ${process.env.USER_TABLE_PREFIX}${entity.name} ${utils_1.removeCommaFromQuery(actions)}`;
                yield this.pool.query(queryText);
                reqBody.fields.forEach(field => {
                    switch (field.action) {
                        case 'add':
                            index_1.default.UIControl.create({
                                entity_id,
                                name: field.name,
                                type: field.type,
                            });
                            break;
                        case 'drop':
                            index_1.default.UIControl.destroy({
                                where: {
                                    name: field.name,
                                    entity_id,
                                }
                            });
                            break;
                        case 'rename':
                            index_1.default.UIControl.update({
                                name: field.name,
                            }, {
                                where: {
                                    name: field.old_name,
                                }
                            });
                            break;
                        case 'rename_table':
                            index_1.default.Entity.update({
                                name: field.name,
                            }, {
                                where: {
                                    id: entity_id,
                                }
                            });
                            break;
                    }
                });
                const response = yield index_1.default.Entity.all();
                res.status(200).send({
                    data: response,
                });
            }
            catch (error) {
                res.status(500).send({ error: error.message });
            }
        });
        this.dropEntity = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const entity_id = req.params.id;
                const entity = yield index_1.default.Entity.find({
                    where: {
                        id: entity_id,
                    }
                });
                yield index_1.default.UIControl.destroy({
                    where: {
                        entity_id,
                    }
                });
                // Delete from Entities table
                yield index_1.default.Entity.destroy({
                    where: {
                        id: entity_id,
                    }
                });
                // Delete the user table
                yield this.pool.query(`DROP TABLE ${process.env.USER_TABLE_PREFIX}${entity.name}`);
                res.status(204).send();
            }
            catch (error) {
                res.status(500).send({ error: error.message });
            }
        });
        this.fetchAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const entities = yield index_1.default.Entity.all();
                res.status(200).send({ data: entities });
            }
            catch (error) {
                res.status(500).send({ error: error.message });
            }
        });
        this.fetchOne = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const entity_id = req.params.id;
            try {
                const entity = yield index_1.default.Entity.find({
                    where: {
                        id: entity_id,
                    },
                    include: [index_1.default.UIControl],
                });
                console.log(entity.get());
                if (entity) {
                    res.status(200).send({ data: entity });
                }
                else {
                    res.status(404).send({ message: 'Entity not found' });
                }
            }
            catch (error) {
                res.status(500).send({ error: error.message });
            }
        });
        this.pool = DatabasePool_1.default.getInstance().getPool();
    }
}
exports.default = EntitiesController;
;
//# sourceMappingURL=entities_controller.js.map