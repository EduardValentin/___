"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const settings_controller_1 = require("../controllers/settings_controller");
const router = express_1.Router();
router.get('/template', settings_controller_1.getTemplate);
exports.default = router;
//# sourceMappingURL=settings.js.map