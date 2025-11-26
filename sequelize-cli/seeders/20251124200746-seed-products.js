'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { faker } = await import('@faker-js/faker');

    const users = await queryInterface.sequelize.query(
      `SELECT id FROM Users LIMIT 10;`,
      { type: Sequelize.QueryTypes.SELECT },
    );

    if (users.length === 0) {
      throw new Error(
        'No hay usuarios en la tabla Users. Debes ejecutar primero el seeder de Users.',
      );
    }

    const products = [];

    // 2. Crear productos para cada usuario (1 o más)
    for (const user of users) {
      products.push(
        {
          id: faker.string.uuid(),
          title: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: faker.commerce.price(),
          userId: user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: faker.string.uuid(),
          title: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: faker.commerce.price(),
          userId: user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      );
    }

    // 3. Insertar todos los productos generados
    return queryInterface.bulkInsert('Products', products);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Products', null, {});
  },
};
