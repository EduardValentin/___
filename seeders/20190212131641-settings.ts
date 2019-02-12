import * as Sequelize from 'sequelize';

export default {
  up: (queryInterface: Sequelize.QueryInterface, DataTypes: Sequelize.DataTypes) => {
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

  down: (queryInterface: Sequelize.QueryInterface, DataTypes: Sequelize.Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Settings', null);
  }
}