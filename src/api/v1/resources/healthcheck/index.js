'use strict'

const resourceSchemas = require('./resource.schemas.js')
const resourceControllers = require('./resource.controllers.js')

module.exports = (fastify, opts, done) => {
  const schemas = resourceSchemas(opts)
  const controllers = resourceControllers(fastify, opts)

  fastify.get('/', schemas.check, controllers.check)

  done()
}
