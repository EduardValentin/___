"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../models/index");
const BCrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const hash = yield BCrypt.hash(req.body.password, 10);
        const user = yield index_1.default.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: hash,
            email: req.body.email,
        });
        // Resource created
        console.log('Created user:', user);
        res.status(201).send({
            user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            error,
        });
    }
    ;
});
exports.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const users = yield index_1.default.User.findAll();
    res.status(200).send({
        data: users,
    });
});
exports.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { username: reqUsername, password: reqPassword } = req.body;
    const user = yield index_1.default.User.findOne({
        where: {
            username: reqUsername,
        }
    });
    if (!user) {
        res.status(404).send({
            error: 'Username or password didn\'t match, please verify and try again',
        });
    }
    const passwordsMatch = yield BCrypt.compare(reqPassword, user.password);
    if (!passwordsMatch) {
        res.status(404).send({
            error: 'Username or password didn\'t match, please verify and try again',
        });
    }
    const token = jwt.sign({
        username: reqUsername,
    }, process.env.JWT_SECRET);
    res.status(200).send({
        token
    });
});
exports.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { user_id } = req.body;
    const deletedRowsCount = yield index_1.default.User.destroy({
        where: {
            user_id,
        }
    });
    if (!deletedRowsCount) {
        res.status(404).send({ error: 'User not found' });
    }
    res.status(204).send();
});
//# sourceMappingURL=user_controller.js.map