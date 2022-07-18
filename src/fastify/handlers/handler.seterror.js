'use strict'

module.exports = async (fastify, opts) => {
  fastify.setErrorHandler((error, request, reply) => {
    const date = new Date(Date.now())

    return reply.code(reply.statusCode).send({
      api: {
        processed_at: date,
        message: error.message
      }
    })
  })
}
