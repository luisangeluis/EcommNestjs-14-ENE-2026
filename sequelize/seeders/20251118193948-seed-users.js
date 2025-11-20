'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const { faker } = await import('@faker-js/faker');

    return queryInterface.bulkInsert(
      'Users',
      Array.from({ length: 10 }).map((_, index) => ({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: `user_${faker.string.uuid()}@example.com`,
        password: faker.internet.password(),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('Users', null, {});
  },
};
