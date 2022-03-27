const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Country {
    id: ID!
    name: String!
    isoCode: String!
    Cities: [City!]
  }

  type City {
    id: ID!
    name: String!
    region: String
    Country: Country
  }

  type Query {
    allCountries: [Country!]!
  }

  type CreateCityResponse {
    code: Int!
    success: Boolean!
    message: String!
    City: City
  }

  type Mutation {
    createCity(name: String!, region: String, CountryId: Int!): CreateCityResponse!
  }
`
module.exports = typeDefs
