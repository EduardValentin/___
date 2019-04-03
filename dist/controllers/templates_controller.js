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
const extract = require("extract-zip");
const fs = require("fs");
const template_service_1 = require("../services/template_service");
const rimraf = require("rimraf");
class TemplatesController {
    constructor() {
        this.createTemplate = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { body, file } = req;
            try {
                const dir = `${__dirname}/../../client/app/templates/${body.name}`;
                fs.mkdirSync(dir);
                extract(file.path, { dir }, (err) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        fs.rmdir(dir, () => { });
                        console.log(err.message);
                        res.status(500).send({ message: err.message });
                        return;
                    }
                    const templateCreated = yield this.Service.insert({
                        name: body.name,
                        description: body.description,
                    });
                    res.status(200).send({ data: templateCreated.toJSON() });
                }));
            }
            catch (err) {
                console.log(err.message);
                res.status(500).send({ message: err.message });
            }
        });
        this.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const allTemplates = yield this.Service.all();
                res.status(200).send({ data: allTemplates });
            }
            catch (error) {
                res.status(500).send({ message: error.message });
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const template_id = req.params.id;
                const template = yield this.Service.find({
                    where: {
                        id: template_id,
                    }
                });
                const dir = `${__dirname}/../../client/app/templates/${template.name}`;
                rimraf(dir, (error) => __awaiter(this, void 0, void 0, function* () {
                    if (error) {
                        res.status(500).send({ message: error.message });
                        return;
                    }
                    console.log(`Deleted template at path: ${dir}`);
                    yield this.Service.delete(template_id);
                    res.status(204).send();
                }));
            }
            catch (error) {
                res.status(500).send({ message: error.message });
            }
        });
        this.Service = new template_service_1.default();
    }
}
exports.default = TemplatesController;
//# sourceMappingURL=templates_controller.js.map