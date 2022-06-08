'use strict'

const path = require('path')

const autoload = require('@fastify/autoload')

const api = require('./api')

module.exports = async (fastify, opts) => {
  const registersToBeAutoloaded = ['fastify/plugins', 'fastify/handlers']

  registersToBeAutoloaded.forEach((register) => {
    fastify.register(autoload, {
      dir: path.join(__dirname, register),
      options: Object.assign({}, opts)
    })
  })

  fastify.register(api)
}
