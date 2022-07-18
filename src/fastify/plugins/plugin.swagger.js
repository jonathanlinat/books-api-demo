'use strict'

const fp = require('fastify-plugin')
const swagger = require('@fastify/swagger')

module.exports = fp(async (fastify, opts) => {
  await fastify.register(swagger, {
    routePrefix: `api/documentation`,
    exposeRoute: true,
    hideUntagged: true,
    swagger: {
      info: { title: 'Books API', version: process.env.API_VERSION },
      tags: [
        { name: 'Authors', description: 'Authors related end-points' },
        { name: 'Healthcheck', description: 'API related end-points' }
      ],
      consumes: ['application/json'],
      produces: ['application/json']
    }
  })
})
