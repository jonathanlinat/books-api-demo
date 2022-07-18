'use strict'

module.exports = async (fastify, opts) => {
  fastify.setNotFoundHandler((request, reply) => {
    const date = new Date(Date.now())

    return reply.code(404).send({
      api: {
        processed_at: date,
        message: 'Route not found'
      }
    })
  })
}
