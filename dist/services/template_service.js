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
class TemplateService {
    constructor() {
        this.find = (clause) => __awaiter(this, void 0, void 0, function* () {
            return index_1.default.Template.find(clause);
        });
        this.insert = (attributes) => __awaiter(this, void 0, void 0, function* () {
            return index_1.default.Template.create(attributes);
        });
        this.all = () => __awaiter(this, void 0, void 0, function* () {
            return index_1.default.Template.all();
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            return index_1.default.Template.destroy({
                where: {
                    id,
                }
            });
        });
        this.pool = DatabasePool_1.default.getInstance().getPool();
    }
}
exports.default = TemplateService;
//# sourceMappingURL=template_service.js.map