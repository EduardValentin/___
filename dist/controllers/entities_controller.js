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
exports.column_definitions = {
    checkmark_input: 'BOOLEAN NOT NULL',
    text_input: 'TEXT NOT NULL',
    date_input: 'DATE NOT NULL',
};
exports.default_values = {
    checkmark_input: 'false',
    text_input: '\'\'',
    date_input: 'sysdate',
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
                const tableDefinition = ramda_1.reduce((acc, elem) => {
                    let columnType = null;
                    switch (elem.type) {
                        case 'checkmark_input':
                            columnType = exports.column_definitions['checkmark_input'];
                            break;
                        case 'date_input':
                            columnType = exports.column_definitions['date_input'];
                            break;
                        case 'text_input':
                            columnType = exports.column_definitions['text_input'];
                            break;
                    }
                    return acc + elem.name + ' ' + columnType + ', ';
                }, '')(reqBody.fields);
                const queryText = `
      CREATE TABLE ${process.env.USER_TABLE_PREFIX}${reqBody.name} (
        id SERIAL PRIMARY KEY,
        page_id INTEGER REFERENCES "public"."Pages" (id) ON DELETE SET NULL,
        ${utils_1.removeCommaFromQuery(tableDefinition)} 
      );
    `;
                yield this.pool.query(queryText);
                // create table
                const entity = yield index_1.default.Entity.create({
                    name: reqBody.name,
                });
                // For every field we add a record in UIControl table with foreign key to entity record
                const fields = reqBody.fields.map((field) => ({
                    name: field.name,
                    type: field.type,
                    entity_id: entity.id,
                }));
                yield index_1.default.UIControl.bulkCreate(fields);
                // Fetch the saved entity including UIControls 
                const response = yield index_1.default.Entity.find({
                    where: {
                        id: entity.id,
                    },
                    include: [index_1.default.UIControl],
                });
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
                const promises = [];
                const actions = ramda_1.map((elem) => {
                    let actionText = `ALTER TABLE ${process.env.USER_TABLE_PREFIX}${entity.name}`;
                    const elementName = ramda_1.trim(elem.name);
                    switch (elem.action) {
                        case 'add':
                            promises.push(index_1.default.UIControl.create({
                                entity_id,
                                name: elementName,
                                type: elem.type,
                            }));
                            console.log(`${actionText} ADD COLUMN ${elementName} ${exports.column_definitions[elem.type]} DEFAULT ${exports.default_values[elem.type]};`);
                            return `${actionText} ADD COLUMN ${elementName} ${exports.column_definitions[elem.type]} DEFAULT ${exports.default_values[elem.type]};`;
                        case 'drop':
                            promises.push(index_1.default.UIControl.destroy({
                                where: {
                                    name: elementName,
                                    entity_id,
                                }
                            }));
                            return `${actionText} DROP COLUMN ${ramda_1.trim(elementName)} CASCADE;`;
                        case 'rename':
                            const oldName = ramda_1.trim(elem.old_name);
                            promises.push(index_1.default.UIControl.update({ name: elementName }, {
                                where: {
                                    name: oldName,
                                    entity_id: entity_id,
                                }
                            }));
                            return `${actionText} RENAME COLUMN ${oldName} TO ${elementName};`;
                        case 'rename_table':
                            promises.push(index_1.default.Entity.update({ name: elementName }, {
                                where: {
                                    id: entity_id,
                                }
                            }));
                            return `${actionText} RENAME TO  ${process.env.USER_TABLE_PREFIX}${elementName};`;
                        default:
                            res.status(404).send({
                                message: 'Action provided was not found',
                            });
                            break;
                    }
                })(reqBody.fields);
                console.log(actions);
                actions.forEach(action => {
                    promises.push(this.pool.query(action));
                });
                yield Promise.all(promises);
                const response = yield index_1.default.Entity.find({
                    where: {
                        id: entity_id,
                    },
                    include: [index_1.default.UIControl],
                });
                console.log(response.toJSON());
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
                res.status(204).send({});
            }
            catch (error) {
                res.status(500).send({ error: error.message });
            }
        });
        this.fetchAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const entities = yield index_1.default.Entity.all({
                    include: [index_1.default.UIControl],
                });
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