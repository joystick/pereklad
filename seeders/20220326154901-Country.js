'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Countries', [
      {
        name: 'Austria',
        isoCode: 'at',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cyprus',
        isoCode: 'cy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Czechia',
        isoCode: 'cz',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Estonia',
        isoCode: 'ee',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'France',
        isoCode: 'fr',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Germany',
        isoCode: 'de',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Greece',
        isoCode: 'gr',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Italy',
        isoCode: 'it',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Netherlands',
        isoCode: 'nl',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Poland',
        isoCode: 'pl',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Portugal',
        isoCode: 'pt',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Romania',
        isoCode: 'ro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Slovakia',
        isoCode: 'sk',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Slovenia',
        isoCode: 'si',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sweden',
        isoCode: 'se',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Countries', null, {})
  }
}
