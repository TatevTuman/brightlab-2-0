module.exports = {
  Query: {
    books(root, args, { Book }) {
      return Book.findAll()
    },
    book(root, args, { Book }) {
      const { id } = args
      return Book.findByPk(id)
    }
  },
  Mutation: {
    async createBook(root, args, { Book }) {
      return Book.create(args)
    }
  }
}
