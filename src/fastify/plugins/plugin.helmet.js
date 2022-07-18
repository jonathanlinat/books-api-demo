'use strict'

const fp = require('fastify-plugin')
const helmet = require('@fastify/helmet')

module.exports = fp(async (fastify, opts) => {
  await fastify.register(helmet, {
    global: true
  })
})
