const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const expressJwt = require('express-jwt')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const models = require('../models')

require('dotenv').config()

async function bootstrap () {
  const app = express()
  app.use(express.static('public'))
  app.use(expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    credentialsRequired: false
  }))
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const user = req.user || null
      return { user, models }
    }
  })
  await server.start()
  server.applyMiddleware({ app })
  app.listen({ port: 4000 }, () => {
    console.log(`
      🚀  Server is running!
      🔉  Listening on port 4000
      📭  Query at ${server.graphqlPath}
    `)
  })
}

bootstrap()
