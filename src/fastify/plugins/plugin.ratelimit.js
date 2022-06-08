'use strict'

const fp = require('fastify-plugin')
const ratelimit = require('@fastify/rate-limit')

module.exports = fp(async (fastify, opts, next) => {
  await fastify.register(ratelimit, {
    max: 40,
    timeWindow: '1 minute'
  })

  next()
})
