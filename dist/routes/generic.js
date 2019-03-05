"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const generic_controller_1 = require("../controllers/generic_controller");
const verify_token_1 = require("../middlewares/verify_token");
const Controller = new generic_controller_1.default();
const router = express_1.Router();
router.post('/create', verify_token_1.default, Controller.createRecord);
router.put('/edit/:record_id', verify_token_1.default, Controller.editRecord);
router.delete('/delete/:record_id', verify_token_1.default, Controller.deleteRecord);
router.get('/', verify_token_1.default, Controller.fetchAll);
router.get('/:record_id', verify_token_1.default, Controller.fetchOne);
exports.default = router;
//# sourceMappingURL=generic.js.map