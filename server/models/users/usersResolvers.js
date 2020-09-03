const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

module.exports = {
  Query: {
    users(root, args, { Users }) {
      return Users.findAll()
    },
    user(root, args, { Users }) {
      const { id } = args
      return Users.findByPk(id)
    },
    currentUser(root, args, { Users, user }) {
      if (user) {
        const { email } = user
        return Users.findOne({ where: { email } })
      }

      return null
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
      return id
    },
    async signup(_, args, { Users }) {
      const { firstName, lastName, email, password } = args
      const isUserAlreadySignedUp = await Users.findOne({ where: { email } })

      if (isUserAlreadySignedUp) {
        throw new Error('User with that email has already registered')
      }

      const user = await Users.create({
        firstName,
        lastName,
        email,
        password: await bcrypt.hash(password, 10),
        books: ''
      })

      return jsonwebtoken.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1y' })
    },
    async signin(_, args, { Users }) {
      const { email, password } = args
      const user = await Users.findOne({ where: { email } })

      if (!user) {
        throw new Error('No user with that email')
      }

      const valid = await bcrypt.compare(password, user.password)

      if (!valid) {
        throw new Error('Incorrect password')
      }

      // return json web token
      return jsonwebtoken.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' })
    }
  }
}
