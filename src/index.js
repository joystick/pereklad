const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const models = require('../models')

async function bootstrap () {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { models }
  })

  const app = express()
  app.use(express.static('public'))
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
