'use strict'

const fp = require('fastify-plugin')
const dotenv = require('dotenv')

const plugin = async (fastify, opts) => {
  try {
    dotenv.config()
  } catch (error) {
    fastify.log.error(error)
  }
}

module.exports = fp(async (fastify, opts, next) => {
  await fastify.register(plugin)

  next()
})
