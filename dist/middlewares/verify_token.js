"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    const JWToken = req.headers.authorization;
    const cleanToken = JWToken.replace('Bearer ', '');
    jwt.verify(cleanToken, process.env.JWT_SECRET, (_, isValid) => {
        if (!isValid) {
            res.status(401).send({
                error: 'Unauthorized',
            });
        }
        next();
    });
};
exports.default = verifyToken;
//# sourceMappingURL=verify_token.js.map