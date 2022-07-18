'use strict'

const resourceSchemas = require('./resource.schemas')
const resourceControllers = require('./resource.controllers')

module.exports = async (fastify, opts) => {
  const schemas = resourceSchemas(opts)
  const controllers = resourceControllers(fastify, opts)

  fastify.get('/', schemas.check, controllers.check)
}
