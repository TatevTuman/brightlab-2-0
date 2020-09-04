/* eslint-disable @typescript-eslint/no-var-requires */

const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const db = require('./models')
const jwt = require('express-jwt')
const cors = require('cors')
const dotenv = require('dotenv')
const env = process.argv[2] // Get env from command line

const isProduction = env === 'production'
const dotenvPath = isProduction ? '.env.production' : '.env.development'

dotenv.config({ path: dotenvPath }).parsed

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
  context: ({ req }) => {
    // express-jwt get user with auth token and pass it into req
    return {
      user: req.user,
      ...db
    }
  }
})

const app = express()
app.use(cors())
app.use(
  jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    credentialsRequired: false
  })
)
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
