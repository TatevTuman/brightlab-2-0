const typeDefs = `
  extend type Query {
    users: [User]
    user(id: String!): User
    currentUser: User
  }

  extend type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): User
    updateUser(id: Int!, firstName: String!, lastName: String!, email: String!, password: String!): User
    deleteUser(id: Int!): Int!
    signup(firstName: String!, lastName: String!, email: String!, password: String!): String!
    signin(email: String!, password: String!): String!
  }

  type User {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    books: [Book]
    roles: [Role]
  }
`

module.exports = typeDefs
