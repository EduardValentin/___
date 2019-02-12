"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../controllers/User");
const verify_token_1 = require("../middlewares/verify_token");
const router = express_1.Router();
router.get('/', verify_token_1.default, User_1.index);
router.post('/register', User_1.register);
router.post('/login', User_1.login);
router.delete('/delete', verify_token_1.default, User_1.deleteUser);
exports.default = router;
//# sourceMappingURL=User.js.map