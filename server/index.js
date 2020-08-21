/* eslint-disable @typescript-eslint/no-var-requires */

const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const db = require('./models')

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: gql`
      type Query {
        schema: String
      }

      type Mutation {
        schema: String
      }

      # TypeDefs from our models
      ${db.typeDefs}
    `,
    resolvers: {
      Query: {
        // Query resolvers from our models
        ...db.resolvers.Query
      },
      Mutation: {
        // Mutation resolvers from our models
        ...db.resolvers.Mutation
      }
    }
  }),
  context: { ...db }
})

const app = express()
server.applyMiddleware({ app })

// Database login with config
db.sequelize.authenticate().catch(err => {
  console.error(err)
  throw err
})

// Database sync
db.sequelize.sync().catch(err => {
  console.error(err)
  throw err
})

app.listen(4000, () => {
  console.log('Go to http://localhost:4000/graphql to run queries!')
})
