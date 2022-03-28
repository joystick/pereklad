const { City, Country, Translator, User } = require('../models')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config()

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

async function findTranslatorsByCountry () {
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

async function test () {
  const password = 'Shmassword!!!'
  const email = 'alexei.kozhushkov@gmail.com'

  const user = await User.findOne({ where: { email } })
  const isValid = await bcrypt.compare(password, user.password)

  const token = jsonwebtoken.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1y' }
  )

  console.log({ token, user: user.toJSON() })
  // const users = await User.findAll()
  // console.log(JSON.stringify(users, null, 2))
}

test()
