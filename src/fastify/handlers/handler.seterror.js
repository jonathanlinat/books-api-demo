'use strict'

module.exports = async (fastify, opts) => {
  fastify.setErrorHandler((error, request, reply) => {
    const date = new Date(Date.now())

    reply.send({
      api: {
        processed_at: date,
        description: error.message
      }
    })
  })
}
