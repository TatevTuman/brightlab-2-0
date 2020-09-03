const typeDefs = `
  extend type Query {
    books: [Book]
    book(id: String!): Book
  }

  extend type Mutation {
    createBook(title: String!, author: String!): Book
  }

  type Book {
    id: Int!
    title: String!
    author: String!
    users: [User]
  }
`

module.exports = typeDefs
