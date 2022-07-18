'use strict'

const resourceSchemas = require('./resource.schemas')
const resourceControllers = require('./resource.controllers')

module.exports = async (fastify, opts) => {
  const schemas = resourceSchemas(opts)
  const controllers = resourceControllers(fastify, opts)

  fastify.get('/', schemas.list, controllers.list)
  fastify.get('/:id', schemas.get, controllers.get)
  fastify.post('/', schemas.create, controllers.create)
  fastify.patch('/:id', schemas.update, controllers.update)
  fastify.delete('/:id', schemas.delete, controllers.delete)
}
