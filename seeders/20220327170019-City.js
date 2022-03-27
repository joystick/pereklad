'use strict'

const fs = require('fs')
const path = require('path')
const { parse } = require('papaparse')
const models = require('../models')

const parseCsvContent = content => {
  return new Promise(resolve => {
    parse(content, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data)
    })
  })
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const list = await fs.promises.readdir(path.resolve('seeders', 'data'))
    for await (const filename of list) {
      console.log('=================================')
      const isoCode = filename.replace(/\.csv/, '')
      const country = await models.Country.findOne({ logging: false, where: { isoCode } })
      const content = fs.readFileSync(path.resolve('seeders', 'data', filename), 'utf-8')
      const translators = await parseCsvContent(content)
      for await (const translator of translators) {
        const city = await models.City.findOne({ logging: false, where: { name: translator.city } })
        if (city === null) {
          const result = await models.City.create({
            name: translator.city,
            region: translator.region,
            CountryId: country.id
          })
          console.log('creted city', result.toJSON())
        } else {
          console.log('found city', city.toJSON())
        }
      }
    }

    /**
     *
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
}
