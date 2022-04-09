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
      const isoCode = filename.replace(/\.csv/, '')
      const country = await models.Country.findOne({ logging: false, where: { isoCode } })
      const content = fs.readFileSync(path.resolve('seeders', 'data', filename), 'utf-8')
      const translators = await parseCsvContent(content)
      for await (const translator of translators) {
        const city = await models.City.findOne({ logging: false, where: { name: translator.city } })
        const {
          firstName,
          lastName,
          organisation,
          streetAddress,
          postalCode,
          phone,
          email,
          website,
          languages,
          approved
        } = translator
        const newTranslator = await models.Translator.create({
          firstName,
          lastName,
          organisation,
          streetAddress,
          postalCode,
          phone,
          email,
          website,
          languages,
          approved
        })
        if (city === null) {
          const newCity = await models.City.create({
            name: translator.city,
            region: translator.region,
            CountryId: country.id
          })
          const assoc = await models.CityTranslator.create({
            CityId: newCity.id,
            TranslatorId: newTranslator.id
          })
          console.log('created city', newCity.toJSON())
          console.log('created assoc', assoc.toJSON())
        } else {
          const assoc = await models.CityTranslator.create({
            CityId: city.id,
            TranslatorId: newTranslator.id
          })
          console.log('found city', city.toJSON())
          console.log('created assoc', assoc.toJSON())
        }
      }
    }
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
