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
const pages_service_1 = require("../services/pages_service");
;
class PagesController {
    constructor() {
        this.PagesService = null;
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            try {
                const page = yield this.PagesService.addNew(body);
                res.status(200).send({ data: page.toJSON() });
            }
            catch (error) {
                res.status(500).send({ message: error.message });
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.PagesService.remove(id);
                res.status(204).send();
            }
            catch (error) {
                res.status(500).send({ message: error.message });
            }
        });
        this.changeEntity = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { old_entity, new_entity } = req.body;
            const { id } = req.params;
            try {
                yield this.PagesService.removeEntity(id, old_entity);
                yield this.PagesService.addEntity(id, new_entity);
                res.status(204).send();
            }
            catch (error) {
                res.status(500).send({ message: error.message });
            }
        });
        this.removeEntity = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id, entity_id } = req.params;
            try {
                yield this.PagesService.removeEntity(id, entity_id);
                res.status(204).send();
            }
            catch (error) {
                res.status(500).send({ message: error.message });
            }
        });
        this.edit = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.PagesService.edit(id, req.body);
                res.status(204).send();
            }
            catch (error) {
                res.status(500).send({ message: error.message });
            }
        });
        this.PagesService = new pages_service_1.default();
    }
}
exports.default = PagesController;
;
//# sourceMappingURL=pages_controller.js.map