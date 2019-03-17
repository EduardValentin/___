"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
const ramda_1 = require("ramda");
const sanitizeGenericEntities = (req, res, next) => {
    const { body } = req;
    try {
        if (body.fields) {
            body.fields.forEach(element => {
                if (element.name) {
                    utils_1.verifyEntityOrFields(ramda_1.trim(element.name));
                }
            });
        }
        next();
    }
    catch (error) {
        res.status(404).send({ message: 'Invalid input' });
    }
};
exports.default = sanitizeGenericEntities;
//# sourceMappingURL=sanitize_generic_entities.js.map