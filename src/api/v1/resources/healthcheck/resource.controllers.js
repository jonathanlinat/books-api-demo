'use strict'

const helpers = require('../../helpers')

const resourceProperties = require('./resource.properties')

module.exports = (fastify, opts) => {
  const resourceName = helpers.routePrefixSplitter(opts.prefix)

  return {
    check: (request, reply) => {
      try {
        return reply.code(200).send({
          [resourceName]: {
            ...resourceProperties().controllers.api(
              'Yay! The API is reachable 😎'
            )
          }
        })
      } catch (error) {
        return reply.code(500).send({
          [resourceName]: {
            ...resourceProperties().controllers.api(error.message)
          }
        })
      }
    }
  }
}
