const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config()

const resolvers = {
  Query: {
    async me (_, args, { user, models }) {
      if (!user) throw new Error('You are not authenticated')
      return await models.User.findByPk(user.id)
    },
    async user (root, { id }, { user, models }) {
      try {
        if (!user) throw new Error('You are not authenticated!')
        return models.User.findByPk(id)
      } catch (error) {
        throw new Error(error.message)
      }
    },
    async allCountries (_, __, { models }) {
      return await models.Country.findAll({ include: 'Cities' })
    },
    async countryTranslators (_, { isoCode }, { models }) {
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
  },
  Mutation: {
    async createCity (_, { name, region, CountryId }, { models }) {
      try {
        return {
          code: 200,
          success: true,
          message: `Successfully created City ${name}@${region}`,
          City: await models.City.create({ name, region, CountryId })
        }
      } catch (err) {
        console.log('zhoppa', err)
        return {
          code: 500,
          success: false,
          message: err.message,
          City: null
        }
      }
    },
    async login (_, { email, password }, { models }) {
      try {
        const user = await models.User.findOne({ where: { email } })
        if (!user) {
          throw new Error('No user with that email')
        }
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
          throw new Error('Incorrect password')
        }
        // return jwt
        const token = jsonwebtoken.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '1d' }
        )
        return {
          token, user
        }
      } catch (error) {
        throw new Error(error.message)
      }
    }
  }
}

module.exports = resolvers
