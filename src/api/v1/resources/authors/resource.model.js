'use strict'

const helpers = require('../../helpers')

const resourceProperties = require('./resource.properties')

module.exports = (fastify, opts) => {
  const modelName = helpers.routePrefixSplitter(opts.prefix)

  const model = new fastify.mongoose.Schema(
    {
      ...resourceProperties().model.entity.common,
      ...resourceProperties().model.entity.specific
    },
    {
      ...resourceProperties().model.options
    }
  )

  return fastify.mongoose.model(modelName, model)
}
