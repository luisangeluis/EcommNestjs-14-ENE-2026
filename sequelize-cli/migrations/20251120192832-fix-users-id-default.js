'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'id', {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: Sequelize.literal('(UUID())'),
    });
  },

  async down(queryInterface, Sequelize) {
    // puedes regresar a como estaba antes
    await queryInterface.changeColumn('Users', 'id', {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    });
  },
};
