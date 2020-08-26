module.exports = {
  Query: {
    roles(root, args, { Roles }) {
      return Roles.findAll()
    },
    role(root, args, { Roles }) {
      const { id } = args
      return Roles.findByPk(id)
    }
  },
  Mutation: {
    async createRole(root, args, { Roles }) {
      return Roles.create(args)
    }
  }
}
