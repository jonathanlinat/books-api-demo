'use strict'

const fp = require('fastify-plugin')
const cors = require('@fastify/cors')

module.exports = fp(async (fastify, opts, next) => {
  await fastify.register(cors)

  next()
})
