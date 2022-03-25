'use strict'

const helpers = require('../../helpers')

module.exports = (fastify, opts) => {
  const resourceName = helpers.routePrefixSplitter(opts.prefix)

  const commonApiProperties = (description) => {
    const date = new Date(Date.now())

    return {
      processed_at: date,
      description: description
    }
  }

  return {
    check: (request, reply) => {
      reply.code(200).send({
        [resourceName]: {
          ...commonApiProperties('Great! API is reachable 😎')
        }
      })
    }
  }
}
