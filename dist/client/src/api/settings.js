"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("api/base");
function getTemplate() {
    return base_1.request('GET', '/settings/template', {});
}
exports.getTemplate = getTemplate;
//# sourceMappingURL=settings.js.map