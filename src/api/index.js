'use strict'

const path = require('path')

const autoload = require('@fastify/autoload')

module.exports = async (fastify, opts) => {
  const registersToBeAutoloaded = ['resources']

  registersToBeAutoloaded.forEach((register) => {
    fastify.register(autoload, {
      dir: path.join(__dirname, `${process.env.API_VERSION}/${register}`),
      options: Object.assign({}, opts)
    })
  })
}
