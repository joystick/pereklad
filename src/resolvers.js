const resolvers = {
  Query: {
    async allCountries (_, __, { models }) {
      return models.Country.findAll({ include: 'Cities' })
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
