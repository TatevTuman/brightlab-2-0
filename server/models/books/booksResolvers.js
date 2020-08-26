module.exports = {
  Query: {
    books(root, args, { Books }) {
      return Books.findAll()
    },
    book(root, args, { Books }) {
      const { id } = args
      return Books.findByPk(id)
    }
  },
  Mutation: {
    async createBook(root, args, { Books }) {
      return Books.create(args)
    }
  }
}
