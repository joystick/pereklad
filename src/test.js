const { City, Country, CityTranslator, Translator } = require('../models')

async function countryTranslators (_, { isoCode }, { models }) {
  return await models.Country.findOne({
    logging: false,
    where: { isoCode },
    attributes: ['id', 'name', 'isoCode'],
    include: [{
      model: models.City,
      as: 'Cities',
      attributes: ['id', 'name', 'region'],
      include: [{
        model: models.Translator,
        as: 'Translators',
        attributes: [
          'id', 'firstName', 'lastName', 'organisation', 'streetAddress',
          'postalCode', 'email', 'phone', 'website', 'languages', 'approved', 'source'
        ]
      }]
    }]
  })
}

async function test () {
  // const result = await City.findAll({
  //   logging: false,
  //   where: { CountryID: 15 },
  //   include: [{ model: Translator, as: 'Translators' }]
  // })

  const result = await Country.findOne({
    logging: false,
    where: { isoCode: 'cy' },
    attributes: ['id', 'name', 'isoCode'],
    include: [{
      model: City,
      as: 'Cities',
      attributes: ['id', 'name', 'region'],
      include: [{
        model: Translator,
        as: 'Translators',
        attributes: [
          'id', 'firstName', 'lastName', 'organisation', 'streetAddress',
          'postalCode', 'email', 'phone', 'website', 'languages', 'approved', 'source'
        ]
      }]
    }]
  })
  console.log(JSON.stringify(result, null, 2))
}

test()
