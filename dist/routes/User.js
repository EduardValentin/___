"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user_controller");
const verify_token_1 = require("../middlewares/verify_token");
const router = express_1.Router();
router.get('/', verify_token_1.default, user_controller_1.index);
router.post('/register', user_controller_1.register);
router.post('/login', user_controller_1.login);
router.delete('/delete', verify_token_1.default, user_controller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map