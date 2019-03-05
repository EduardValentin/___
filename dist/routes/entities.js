"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const entities_controller_1 = require("../controllers/entities_controller");
const verify_token_1 = require("../middlewares/verify_token");
const Controller = new entities_controller_1.default();
const router = express_1.Router();
router.post('/new', verify_token_1.default, Controller.createEntity);
router.delete('/drop/:id', verify_token_1.default, Controller.dropEntity);
router.put('/edit/:id', verify_token_1.default, Controller.editEntity);
router.get('/', verify_token_1.default, Controller.fetchAll);
router.get('/:id', verify_token_1.default, Controller.fetchOne);
exports.default = router;
//# sourceMappingURL=entities.js.map