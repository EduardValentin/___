"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
const ramda_1 = require("ramda");
const entities_controller_1 = require("../controllers/entities_controller");
const _verifyFieldType = (type) => {
    const columnTypes = ramda_1.keys(entities_controller_1.column_definitions);
    if (!ramda_1.contains(type, columnTypes)) {
        throw new Error('Invalid input');
    }
};
const sanitize = (req, res, next) => {
    const { body } = req;
    try {
        if (body.name) {
            // if entity name is here
            utils_1.verifyEntityOrFields(ramda_1.trim(body.name));
        }
        if (body.fields) {
            body.fields.forEach(element => {
                if (element.name) {
                    utils_1.verifyEntityOrFields(ramda_1.trim(element.name));
                }
                if (element.old_name) {
                    utils_1.verifyEntityOrFields(ramda_1.trim(element.old_name));
                }
                if (element.type) {
                    _verifyFieldType(element.type);
                }
            });
        }
        next();
    }
    catch (error) {
        res.status(404).send({ message: 'Invalid input' });
    }
};
exports.default = sanitize;
//# sourceMappingURL=sanitize_data_entities.js.map