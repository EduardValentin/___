"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabasePool_1 = require("../DatabasePool");
class BaseService {
    constructor() {
        this.pool = DatabasePool_1.default.getInstance().getPool();
    }
}
exports.default = BaseService;
//# sourceMappingURL=base_service.js.map