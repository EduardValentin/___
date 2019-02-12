import * as Sequelize from 'sequelize';
import Models from '../models/index';
import * as Bcrypt from 'bcrypt';

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
    return new Promise(async (accept, reject) => {
      try {

      await queryInterface.bulkInsert('Roles', [{
        name: 'Administrator',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  
      let adminRole = await Models.Role.findOne({
        where: {
          name: 'Administrator',
        }
      });
      await queryInterface.bulkInsert('Users', [{
        firstName: 'admin',
        lastName: 'admin',
        username: 'admin',
        password: Bcrypt.hashSync('Admin1', 10),
        email: 'admin@admin.com',
        createdAt: new Date(),
        updatedAt: new Date(),  
      }]);
  
      let admin = await Models.User.findOne({
        where: {
          username: 'admin',
        },
      });

      await queryInterface.bulkInsert('UserRoles', [{
        user_id: admin.id,
        role_id: adminRole.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }]);
      accept();
    }
    catch(error) { 
      reject(error)
      console.error(error);
    }

    });
  },

  down: (queryInterface: Sequelize.QueryInterface, DataTypes: Sequelize.Sequelize) => {
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
}