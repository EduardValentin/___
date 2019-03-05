"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
exports.isBlank = ramda_1.anyPass([ramda_1.isNil, ramda_1.isEmpty]);
/**
 * Checks if name contains only underscore, decimal or letters. If not, it throws an error. Should be executed in a try block.
 * @param name Is the name of the table or the fields corresponding to a table
 */
exports.verifyEntityOrFields = (name) => {
    if (!entity_fields_test.test(name)) {
        throw 'Invalid input or table name';
    }
};
/**
 * Trims white spaces from both margins of the string including the last comma at the end of the string
 * @param string
 */
exports.removeCommaFromQuery = (string) => {
    return ramda_1.compose(ramda_1.dropLast(1), ramda_1.trim)(string);
};
exports.appendTablePrefix = (table_name) => {
    return process.env.USER_TABLE_PREFIX + table_name;
};
const entity_fields_test = new RegExp(/^[a-zA-Z0-9_]+$/);
//# sourceMappingURL=utils.js.map