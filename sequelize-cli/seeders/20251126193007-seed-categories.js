'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { faker } = await import('@faker-js/faker');

    const categories = Array.from({ length: 10 }).map(() => ({
      id: faker.string.uuid(),
      name: faker.commerce.department(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert('Categories', categories);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categories', null, {});
  },
};
