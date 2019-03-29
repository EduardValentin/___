"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_service_1 = require("../services/entity_service");
const generic_service_1 = require("../services/generic_service");
class BaseController {
    constructor(parameters) {
        this.EntityService = null;
        this.GenericService = null;
        this.EntityService = new entity_service_1.default();
        this.GenericService = new generic_service_1.default();
    }
}
exports.default = BaseController;
//# sourceMappingURL=base_controller.js.map