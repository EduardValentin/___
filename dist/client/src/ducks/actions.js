"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
exports.createAction = ramda_1.curry((type, payload) => {
    return {
        type,
        payload,
    };
});
//# sourceMappingURL=actions.js.map