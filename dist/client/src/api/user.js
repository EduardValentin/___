"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("api/base");
function login(credentials) {
    return base_1.request('POST', '/users/sign_in', credentials);
}
exports.login = login;
function validateCredentials() {
    return base_1.request('GET', '/users', {});
}
exports.validateCredentials = validateCredentials;
//# sourceMappingURL=user.js.map