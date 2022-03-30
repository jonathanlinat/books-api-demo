'use strict'

const resourceSchemas = require('./resource.schemas')
const resourceControllers = require('./resource.controllers')

module.exports = (fastify, opts, done) => {
  const schemas = resourceSchemas(opts)
  const controllers = resourceControllers(fastify, opts)

  fastify.get('/', schemas.check, controllers.check)

  done()
}
