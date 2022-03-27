'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('CityTranslator', {
      CityId: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      TranslatorId: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('CityTranslator')
  }
}
