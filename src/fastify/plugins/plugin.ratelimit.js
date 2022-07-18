'use strict'

const fp = require('fastify-plugin')
const ratelimit = require('@fastify/rate-limit')

module.exports = fp(async (fastify, opts) => {
  await fastify.register(ratelimit, {
    max: 40,
    timeWindow: '1 minute'
  })
})
