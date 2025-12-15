'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('CartItems', 'quantity');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('CartItems', 'quantity', {
      type: Sequelize.DECIMAL,
      allowNull: false,
    });
  },
};
