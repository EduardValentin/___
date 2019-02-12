"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        return queryInterface.bulkInsert('Settings', [{
                setting_name: 'Template',
                setting_value: 'BlankTemplate',
                createdAt: new Date(),
                updatedAt: new Date(),
            }], {});
    },
    down: (queryInterface, DataTypes) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.bulkDelete('Person', null, {});
        */
        return queryInterface.bulkDelete('Settings', null);
    }
};
//# sourceMappingURL=20190212131641-settings.js.map