'use strict'

const fp = require('fastify-plugin')
const mongoose = require('mongoose')

const plugin = fp(async (fastify, opts) => {
  mongoose.connection.on('connected', () =>
    fastify.log.info(
      { actor: 'MongoDB' },
      `Successfully connected to database "${process.env.MONGO_DATABASE_NAME}"`
    )
  )
  mongoose.connection.on('disconnected', () =>
    fastify.log.info(
      { actor: 'MongoDB' },
      `Successfully disconnected from database "${process.env.MONGO_DATABASE_NAME}"`
    )
  )

  mongoose.connect(opts.url, opts.settings)

  fastify.addHook('onClose', () => {
    fastify.mongoose.connection.close()
  })

  fastify.decorate('mongoose', mongoose)
})

module.exports = fp(async (fastify, opts) => {
  const databaseFullUrl =
    process.env.MONGO_URL + process.env.MONGO_DATABASE_NAME

  await fastify.register(plugin, {
    url: databaseFullUrl,
    settings: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      config: {
        autoIndex: true
      }
    }
  })
})
