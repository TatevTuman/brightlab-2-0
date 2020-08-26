const typeDefs = `
  extend type Query {
    roles: [Role]
    role(id: String!): Role
  }
  
  extend type Mutation {
    createRole(name: String!): Role
  }

  type Role {
    id: Int!
    name: String!
  }
`

module.exports = typeDefs
