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
const ramda_1 = require("ramda");
const utils_1 = require("../utils/utils");
const DatabasePool_1 = require("../DatabasePool");
const index_1 = require("../models/index");
class GenericController {
    constructor() {
        /**
         * Adds a record in the generic entity
         */
        this.createRecord = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const reqBody = req.body;
            const { entity_id } = req.params;
            const entity = yield index_1.default.Entity.find({
                where: {
                    id: entity_id,
                }
            });
            try {
                const keys = ramda_1.compose(utils_1.removeCommaFromQuery, ramda_1.reduce((acc, elem) => {
                    return acc + elem.name + ',';
                }, ''))(reqBody.fields);
                let i = 0;
                const placeholders = ramda_1.compose(utils_1.removeCommaFromQuery, ramda_1.reduce((acc, elem) => {
                    i += 1;
                    return acc + '$' + i + ',';
                }, ''))(reqBody.fields);
                const values = reqBody.fields.map(field => field.value);
                const queryText = `INSERT INTO ${process.env.USER_TABLE_PREFIX}${entity.name} (${keys}) VALUES (${placeholders})`;
                const result = yield this.pool.query(queryText, values);
                res.status(200).send({
                    result,
                });
            }
            catch (error) {
                console.log(error.message);
                res.status(500).send({
                    message: error.message,
                });
            }
        });
        /**
         * Modifies a record with from the generic entity
         */
        this.editRecord = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const reqBody = req.body;
            const { entity_id } = req.params;
            const entity = yield index_1.default.Entity.find({
                where: {
                    id: entity_id,
                }
            });
            try {
                let i = 0;
                const changes = ramda_1.compose(utils_1.removeCommaFromQuery, ramda_1.reduce((acc, elem) => {
                    i += 1;
                    return acc + elem.name + '=' + '$' + i + ',';
                }, ''))(reqBody.fields);
                i += 1;
                const queryText = `UPDATE ${process.env.USER_TABLE_PREFIX}${entity.name} SET ${changes} WHERE id=$${i};`;
                const values = ramda_1.map(ramda_1.prop('value'), reqBody.fields);
                const result = yield this.pool.query(queryText, [...values, req.params.record_id]);
                res.status(200).send({
                    result,
                });
            }
            catch (error) {
                res.status(500).send({
                    message: error.message,
                });
            }
        });
        /**
         * Deletes a record from the generic entity with the name provided in body
         */
        this.deleteRecord = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const reqBody = req.body;
            const { entity_id } = req.params;
            const entity = yield index_1.default.Entity.find({
                where: {
                    id: entity_id,
                }
            });
            try {
                const queryText = `DELETE FROM ${process.env.USER_TABLE_PREFIX}${entity.name} WHERE id=$1`;
                const result = yield this.pool.query(queryText, [req.params.record_id]);
                res.status(200).send({
                    result,
                });
            }
            catch (error) {
                res.status(500).send({
                    message: error.message,
                });
            }
        });
        this.fetchAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { entity_id } = req.params;
                const entity = yield index_1.default.Entity.find({
                    where: {
                        id: entity_id,
                    }
                });
                const result = yield this.pool.query(`SELECT * FROM ${utils_1.appendTablePrefix(entity.name)}`);
                res.status(200).send({ data: result.rows });
            }
            catch (error) {
                res.status(500).send({
                    message: error.message,
                });
            }
        });
        this.fetchOne = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { record_id, entity_id } = req.params;
            const entity = yield index_1.default.Entity.find({
                where: {
                    id: entity_id,
                }
            });
            try {
                utils_1.verifyEntityOrFields(entity.name);
                const result = yield this.pool.query(`SELECT * FROM ${utils_1.appendTablePrefix(entity.name)} WHERE id = $1`, [record_id]);
                if (result) {
                    res.status(200).send({ data: result.rows });
                }
                else {
                    res.status(404).send({ message: 'Row not found' });
                }
            }
            catch (error) {
                res.status(500).send({
                    message: error.message,
                });
            }
        });
        this.pool = DatabasePool_1.default.getInstance().getPool();
    }
}
exports.default = GenericController;
//# sourceMappingURL=generic_controller.js.map