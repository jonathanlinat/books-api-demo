'use strict'

const resourceResolvers = require('./resource.resolvers')

module.exports = (fastify, opts) => {
  const resolvers = resourceResolvers(fastify, opts)

  return {
    list: async () => {
      const response = await resolvers.list()

      return response
    },
    get: async (id) => {
      const response = await resolvers.get(id)

      return response
    },
    create: async (body) => {
      const response = await resolvers.create(body)

      return response
    },
    update: async (id, body) => {
      const response = await resolvers.update(id, body)

      return response
    },
    delete: async (id) => {
      const response = await resolvers.delete(id)

      return response
    }
  }
}
