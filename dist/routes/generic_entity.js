"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const generic_controller_1 = require("../controllers/generic_controller");
const verify_token_1 = require("../middlewares/verify_token");
const Controller = new generic_controller_1.default();
const router = express_1.Router();
router.post('/create', verify_token_1.default, Controller.createRecord);
router.put('/edit/:id', verify_token_1.default, Controller.editRecord);
router.delete('/delete:id', verify_token_1.default, Controller.deleteRecord);
exports.default = router;
//# sourceMappingURL=generic_entity.js.map