"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const settings_controller_1 = require("../controllers/settings_controller");
const Controller = new settings_controller_1.default();
const router = express_1.Router();
router.get('/setting/:setting_name', Controller.getSetting);
exports.default = router;
//# sourceMappingURL=settings.js.map