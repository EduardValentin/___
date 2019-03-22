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
const DatabasePool_1 = require("../DatabasePool");
const index_1 = require("../models/index");
const utils_1 = require("../utils/utils");
class GenericService {
    constructor() {
        this.find = (clause) => {
        };
        this.query = (queryText, placeholdersValues) => __awaiter(this, void 0, void 0, function* () {
            return this.pool.query(queryText, placeholdersValues || []);
        });
        this.selectAllRows = (entity_id) => __awaiter(this, void 0, void 0, function* () {
            const entity = yield index_1.default.Entity.find({ where: { id: entity_id } });
            return this.pool.query(`SELECT * FROM ${utils_1.appendTablePrefix(entity.name)}`);
        });
        this.findOneRow = (entity_id, record_id) => __awaiter(this, void 0, void 0, function* () {
            const entity = yield index_1.default.Entity.find({ where: { id: entity_id } });
            return this.pool.query(`SELECT * FROM ${utils_1.appendTablePrefix(entity.name)} WHERE id=$1`, [record_id]);
        });
        this.pool = DatabasePool_1.default.getInstance().getPool();
    }
}
exports.default = GenericService;
//# sourceMappingURL=generic_service.js.map