const typeDefs = `
  extend type Query {
    users: [User]
    user(id: String!): User
  }
  
  extend type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): User
  }

  type User {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    books: [Book]
  }
`

module.exports = typeDefs
