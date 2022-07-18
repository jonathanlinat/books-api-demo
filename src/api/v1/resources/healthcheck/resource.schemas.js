'use strict'

const helpers = require('../../helpers')

module.exports = (opts) => {
  const resourceName = helpers.routePrefixSplitter(opts.prefix)

  const swaggerTagName = helpers.swaggerTagNameNormalizer(resourceName)
  const swaggerTags = [swaggerTagName]

  const commonApiProperties = {
    processed_at: { type: 'string' },
    message: { type: 'string' }
  }

  return {
    check: {
      schema: {
        tags: swaggerTags,
        summary: 'Check if API is reachable',
        response: {
          200: {
            message: 'API successfully reached',
            type: 'object',
            properties: {
              [resourceName]: {
                type: 'object',
                properties: {
                  ...commonApiProperties
                }
              }
            }
          }
        }
      }
    }
  }
}
