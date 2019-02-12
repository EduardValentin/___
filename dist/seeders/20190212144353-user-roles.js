"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var index_1 = require("../models/index");
var Bcrypt = require("bcrypt");
exports["default"] = {
    up: function (queryInterface, DataTypes) {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.bulkInsert('Person', [{
            name: 'John Doe',
            isBetaMember: false
          }], {});
        */
        return new Promise(function (accept, reject) { return __awaiter(_this, void 0, void 0, function () {
            var adminRole, admin, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, queryInterface.bulkInsert('Roles', [{
                                    name: 'Administrator',
                                    createdAt: new Date(),
                                    updatedAt: new Date()
                                }], {})];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, index_1["default"].Role.findOne({
                                where: {
                                    name: 'Administrator'
                                }
                            })];
                    case 2:
                        adminRole = _a.sent();
                        return [4 /*yield*/, queryInterface.bulkInsert('Users', [{
                                    firstName: 'admin',
                                    lastName: 'admin',
                                    username: 'admin',
                                    password: Bcrypt.hashSync('Admin1', 10),
                                    email: 'admin@admin.com',
                                    createdAt: new Date(),
                                    updatedAt: new Date()
                                }])];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, index_1["default"].User.findOne({
                                where: {
                                    username: 'admin'
                                }
                            })];
                    case 4:
                        admin = _a.sent();
                        return [4 /*yield*/, queryInterface.bulkInsert('UserRoles', [{
                                    user_id: admin.id,
                                    role_id: adminRole.id,
                                    createdAt: new Date(),
                                    updatedAt: new Date()
                                }])];
                    case 5:
                        _a.sent();
                        accept();
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        reject(error_1);
                        console.error(error_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); });
    },
    down: function (queryInterface, DataTypes) {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.bulkDelete('Person', null, {});
        */
        return Promise.all([
            queryInterface.bulkDelete('Roles', null),
            queryInterface.bulkDelete('Users', null),
            queryInterface.bulkDelete('UserRoles', null),
        ]);
    }
};
//# sourceMappingURL=20190212144353-user-roles.js.map