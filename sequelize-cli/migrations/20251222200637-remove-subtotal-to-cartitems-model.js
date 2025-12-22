'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('CartItems', 'subtotal');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('CartItems', 'subtotal', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    });
  },
};
