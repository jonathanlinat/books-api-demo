'use strict'

const helpers = require('../../helpers')

module.exports = (fastify, opts) => {
  const modelName = helpers.routePrefixSplitter(opts.prefix)

  const model = new fastify.mongoose.Schema(
    {
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      birthday: { type: Date, default: null },
      deleted_at: { type: Date, default: null }
    },
    {
      timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
      versionKey: false
    }
  )

  return fastify.mongoose.model(modelName, model)
}