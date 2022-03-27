const resolvers = {
  Query: {
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
    }
  }
}

module.exports = resolvers
