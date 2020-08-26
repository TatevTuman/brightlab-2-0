module.exports = {
  Query: {
    users(root, args, { Users }) {
      return Users.findAll()
    },
    user(root, args, { Users }) {
      const { id } = args
      return Users.findByPk(id)
    }
  },
  Mutation: {
    createUser(root, args, { Users }) {
      return Users.create(args)
    },
    async updateUser(root, args, { Users }) {
      const { id } = args
      const user = Users.findByPk(id)
      console.log('user', user)
      await user.save()
      return user
    },
    async deleteUser(root, args, { Users }) {
      const { id } = args
      const user = Users.findByPk(id)
      const a = await user.destroy()
      console.log('a', a)
      return { id }
    }
  }
}
