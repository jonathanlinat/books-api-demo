'use strict'

const helpers = require('../../helpers')

const resourceProperties = require('./resource.properties')
const resourceServices = require('./resource.services')

module.exports = (fastify, opts) => {
  const services = resourceServices(fastify, opts)

  const resourceName = helpers.routePrefixSplitter(opts.prefix)

  return {
    list: async (request, reply) => {
      try {
        const response = await services.list()

        if (response.message === 'NOT_FOUND') {
          return reply.code(404).send({
            [resourceName]: {
              ...resourceProperties().controllers.api('Entities not found'),
              data: response.data
            }
          })
        }

        return reply.code(200).send({
          [resourceName]: {
            ...resourceProperties().controllers.api(
              'Entities successfully found'
            ),
            data: response.data
          }
        })
      } catch (error) {
        return reply.code(500).send({
          [resourceName]: {
            ...resourceProperties().controllers.api(error.message)
          }
        })
      }
    },
    get: async (request, reply) => {
      try {
        const {
          params: { id }
        } = request

        const isObjectIdValid = helpers.checkObjectIdValidity(id)

        if (isObjectIdValid) {
          return reply.code(422).send({
            [resourceName]: {
              ...resourceProperties().controllers.api('Provided ID not valid')
            }
          })
        }

        const response = await services.get(id)

        if (response.message === 'NOT_FOUND') {
          return reply.code(404).send({
            [resourceName]: {
              ...resourceProperties().controllers.api('Entity not found'),
              data: response.data
            }
          })
        }

        return reply.code(200).send({
          [resourceName]: {
            ...resourceProperties().controllers.api(
              'Entity successfully found'
            ),
            data: response.data
          }
        })
      } catch (error) {
        return reply.code(500).send({
          [resourceName]: {
            ...resourceProperties().controllers.api(error.message)
          }
        })
      }
    },
    create: async (request, reply) => {
      try {
        const { body } = request
        const response = await services.create(body)

        if (response.message === 'NOT_FOUND') {
          return reply.code(404).send({
            [resourceName]: {
              ...resourceProperties().controllers.api('Entity not found'),
              data: response.data
            }
          })
        }

        return reply.code(201).send({
          [resourceName]: {
            ...resourceProperties().controllers.api(
              'Entity successfully created'
            ),
            data: response.data
          }
        })
      } catch (error) {
        return reply.code(500).send({
          [resourceName]: {
            ...resourceProperties().controllers.api(error.message)
          }
        })
      }
    },
    update: async (request, reply) => {
      try {
        const {
          params: { id },
          body
        } = request

        const isObjectIdValid = helpers.checkObjectIdValidity(id)

        if (isObjectIdValid) {
          return reply.code(422).send({
            [resourceName]: {
              ...resourceProperties().controllers.api('Provided ID not valid')
            }
          })
        }

        const response = await services.update(id, body)

        if (response.message === 'NOT_FOUND') {
          return reply.code(404).send({
            [resourceName]: {
              ...resourceProperties().controllers.api('Entity not found'),
              data: response.data
            }
          })
        }

        return reply.code(200).send({
          [resourceName]: {
            ...resourceProperties().controllers.api(
              'Entity successfully updated'
            ),
            data: response.data
          }
        })
      } catch (error) {
        return reply.code(500).send({
          [resourceName]: {
            ...resourceProperties().controllers.api(error.message)
          }
        })
      }
    },
    delete: async (request, reply) => {
      try {
        const {
          params: { id }
        } = request

        const isObjectIdValid = helpers.checkObjectIdValidity(id)

        if (isObjectIdValid) {
          return reply.code(422).send({
            [resourceName]: {
              ...resourceProperties().controllers.api('Provided ID not valid')
            }
          })
        }

        const response = await services.delete(id)

        if (response.message === 'NOT_FOUND') {
          return reply.code(404).send({
            [resourceName]: {
              ...resourceProperties().controllers.api('Entity not found'),
              data: response.data
            }
          })
        }

        return reply.code(200).send({
          [resourceName]: {
            ...resourceProperties().controllers.api(
              'Entity successfully deleted'
            ),
            data: response.data
          }
        })
      } catch (error) {
        return reply.code(500).send({
          [resourceName]: {
            ...resourceProperties().controllers.api(error.message)
          }
        })
      }
    }
  }
}
