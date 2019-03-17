"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const generic_controller_1 = require("../controllers/generic_controller");
const verify_token_1 = require("../middlewares/verify_token");
const sanitize_generic_entities_1 = require("../middlewares/sanitize_generic_entities");
const Controller = new generic_controller_1.default();
const router = express_1.Router();
router.post('/create/:entity_id', verify_token_1.default, sanitize_generic_entities_1.default, Controller.createRecord);
router.put('/edit/:entity_id/:record_id', verify_token_1.default, sanitize_generic_entities_1.default, Controller.editRecord);
router.delete('/delete/:entity_id/:record_id', verify_token_1.default, Controller.deleteRecord);
router.get('/:entity_id', verify_token_1.default, Controller.fetchAll);
router.get('/:entity_id/:record_id', verify_token_1.default, Controller.fetchOne);
exports.default = router;
//# sourceMappingURL=generic.js.map