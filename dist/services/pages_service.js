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
const base_service_1 = require("./base_service");
const index_1 = require("../models/index");
class PagesService extends base_service_1.default {
    constructor() {
        super();
        /** Adds a new page adding the association with entity in the join table */
        this.addNew = ({ label, link, entities }) => __awaiter(this, void 0, void 0, function* () {
            const page = yield index_1.default.Page.create({
                label: label,
                link: link,
            });
            if (entities.length !== 0) {
                yield page.addEntity(entities);
            }
            console.log(entities);
            return page;
        });
        /** Removes the page from the db */
        this.remove = (id) => __awaiter(this, void 0, void 0, function* () {
            return index_1.default.Page.destroy({ where: { id } });
        });
        /** Unassociates an entity from a page */
        this.removeEntity = (page_id, entity_id) => __awaiter(this, void 0, void 0, function* () {
            const page = yield index_1.default.Page.findById(page_id);
            return page.removeEntity(entity_id);
        });
        /** Associates an entity with a page */
        this.addEntity = (page_id, entity_id) => __awaiter(this, void 0, void 0, function* () {
            const page = yield index_1.default.Page.findById(page_id);
            return page.addEntity(entity_id);
        });
        /** Edits the information about a page */
        this.edit = (page_id, params) => __awaiter(this, void 0, void 0, function* () {
            return index_1.default.Page.update({
                link: params.link,
                label: params.label,
            }, {
                where: {
                    id: page_id,
                }
            });
        });
        this.all = (options) => __awaiter(this, void 0, void 0, function* () {
            return index_1.default.Page.all(options);
        });
    }
}
exports.default = PagesService;
//# sourceMappingURL=pages_service.js.map