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
    Translators: [Translator!]
  }

  type Translator {
    firstName: String,
    lastName: String,
    organisation: String,
    streetAddress: String,
    postalCode: String,
    phone: String,
    email: String,
    website: String,
    languages: String,
    approved: Boolean,
    source: String,
    Cities: [City!]
  }

  type Query {
    allCountries: [Country!]!
    countryTranslators(isoCode: String): CountryTranslatorsResponse
    user(id: Int!): User
    me: User
  }

  type TranslatorResponse {
    id: ID
    firstName: String
    lastName: String
    organisation: String
    streetAddress: String
    postalCode: String
    phone: String
    email: String
    website: String
    languages: String
    approved: Boolean
    source: String  
  }

  type CityResponse {
    id: ID
    name: String
    region: String
    Translators: [TranslatorResponse]
  }

  type CountryTranslatorsResponse {
    id: ID
    name: String
    isoCode: String
    Cities: [CityResponse]
  }

  type CreateCityResponse {
    code: Int!
    success: Boolean!
    message: String!
    City: City
  }

  type User {
    id: Int!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    createCity(name: String!, region: String, CountryId: Int!): CreateCityResponse!
    login (email: String!, password: String!): AuthPayload!
  }
`
module.exports = typeDefs
