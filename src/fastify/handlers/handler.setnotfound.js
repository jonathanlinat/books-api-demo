'use strict'

module.exports = async (fastify, opts) => {
  fastify.setNotFoundHandler((request, reply) => {
    const date = new Date(Date.now())

    reply.send({
      api: {
        processed_at: date,
        description: 'Route not found'
      }
    })

    return reply
  })
}
