'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'CityTranslator', {
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        CityId: {
          type: Sequelize.INTEGER,
          primaryKey: true
        },
        TranslatorId: {
          type: Sequelize.INTEGER,
          primaryKey: true
        }
      }
    )
  },

  async down (queryInterface) {
    await queryInterface.dropTable('CityTranslator')
  }

}
