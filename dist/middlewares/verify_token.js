"use strict";
exports.__esModule = true;
var jwt = require("jsonwebtoken");
var verifyToken = function (req, res, next) {
    var JWToken = req.headers.authorization;
    var cleanToken = JWToken.replace('Bearer ', '');
    jwt.verify(cleanToken, process.env.JWT_SECRET, function (_, isValid) {
        if (!isValid) {
            res.status(401).send({
                error: 'Unauthorized'
            });
        }
        next();
    });
};
exports["default"] = verifyToken;
//# sourceMappingURL=verify_token.js.map