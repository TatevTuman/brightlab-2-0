'use strict'

const fs = require('fs')
const path = require('path')
const gql = require('apollo-server-express').gql
const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.json')[env]

const db = {}

// models typeDefs
let modelsTypeDefs = ``
// models resolvers
let modelsResolvers = {
  Query: {},
  Mutation: {}
}

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

// It goes through every file in models directory
// To dynamicly assign models typeDefs and resolvers to the db

fs.readdirSync(__dirname)
  .filter(file => !file.includes('.') && file) // Filters directories
  .map(dir => {
    const modelFiles = fs.readdirSync(__dirname + '/' + dir)
    // ./modelName/index.js
    const modelEntry = modelFiles && modelFiles.find(file => file === 'index.js')
    // ./modelName/modelNameTypeDefs.js
    const modelTypeDefs = modelEntry && modelFiles.find(file => file.includes('TypeDefs'))
    // ./modelName/modelNameResolvers.js
    const modelResolvers = modelEntry && modelFiles.find(file => file.includes('Resolvers'))

    // Accumulate
    return {
      entry: modelEntry && dir + '/' + modelEntry,
      typeDefs: modelTypeDefs && dir + '/' + modelTypeDefs,
      resolvers: modelResolvers && dir + '/' + modelResolvers
    }
  })
  .forEach(model => {
    const { entry, typeDefs, resolvers } = model

    console.log('entry', entry)
    const modelClass = require(path.join(__dirname, entry))(sequelize, Sequelize.DataTypes)
    const modelTypeDefs = typeDefs && require(path.join(__dirname, typeDefs))
    const modelResolvers = resolvers && require(path.join(__dirname, resolvers))

    if (modelTypeDefs) modelsTypeDefs += modelTypeDefs // Concatenate all models typeDefs info one string
    if (modelResolvers) {
      // Spread all Query resolvers from models
      modelsResolvers.Query = {
        ...modelsResolvers.Query,
        ...modelResolvers.Query
      }
      // Spread all Mutation resolvers from models
      modelsResolvers.Mutation = {
        ...modelsResolvers.Mutation,
        ...modelResolvers.Mutation
      }
    }

    // Creates model in db like User or Book
    // Later it will be passed in the context in the server entry
    // So you will have access to the models in resolvers books(root, args, CONTEXT: { Book, User }) {
    // So you will bne able to call User.findOne()
    db[modelClass.name] = modelClass
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    // Call associate functions
    db[modelName].associate(db)
  }
})

// Export typeDefs to create server schema in server entry
db.typeDefs = gql`
  ${modelsTypeDefs}
`
// Export resolvers to create server schema in server entry
db.resolvers = modelsResolvers

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
