module.exports = {
  Query: {
    users(root, args, { User }) {
      return User.findAll()
    },
    user(root, args, { User }) {
      const { id } = args
      return User.findByPk(id)
    }
  },
  Mutation: {
    async createUser(root, args, { User }) {
      return User.create(args)
    }
  }
}
