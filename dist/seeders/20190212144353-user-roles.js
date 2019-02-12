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
const Bcrypt = require("bcrypt");
exports.default = {
    up: (queryInterface, DataTypes) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.bulkInsert('Person', [{
            name: 'John Doe',
            isBetaMember: false
          }], {});
        */
        return new Promise((accept, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield queryInterface.bulkInsert('Roles', [{
                        name: 'Administrator',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    }], {});
                let adminRole = yield index_1.default.Role.findOne({
                    where: {
                        name: 'Administrator',
                    }
                });
                yield queryInterface.bulkInsert('Users', [{
                        firstName: 'admin',
                        lastName: 'admin',
                        username: 'admin',
                        password: Bcrypt.hashSync('Admin1', 10),
                        email: 'admin@admin.com',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    }]);
                let admin = yield index_1.default.User.findOne({
                    where: {
                        username: 'admin',
                    },
                });
                yield queryInterface.bulkInsert('UserRoles', [{
                        user_id: admin.id,
                        role_id: adminRole.id,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    }]);
                accept();
            }
            catch (error) {
                reject(error);
                console.error(error);
            }
        }));
    },
    down: (queryInterface, DataTypes) => {
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