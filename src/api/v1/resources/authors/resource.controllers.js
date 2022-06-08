'use strict'

const helpers = require('../../helpers')

const resourceServices = require('./resource.services')

module.exports = (fastify, opts) => {
  const services = resourceServices(fastify, opts)

  const resourceName = helpers.routePrefixSplitter(opts.prefix)

  const commonApiProperties = (description) => {
    const date = new Date(Date.now())

    return {
      processed_at: date,
      description
    }
  }

  return {
    list: async (request, reply) => {
      try {
        const response = await services.list()

        if (response.message === 'NOT_FOUND') {
          reply.code(404).send({
            [resourceName]: {
              ...commonApiProperties('Entities not found'),
              data: response.data
            }
          })
        } else if (response.message === 'OK') {
          reply.code(200).send({
            [resourceName]: {
              ...commonApiProperties('Entities successfully found'),
              data: response.data
            }
          })
        }
      } catch (error) {
        reply.code(500).send({
          [resourceName]: {
            ...commonApiProperties(error.message)
          }
        })
      }
    },
    get: async (request, reply) => {
      try {
        const {
          params: { id }
        } = request
        const response = await services.get(id)

        if (response.message === 'NOT_FOUND') {
          reply.code(404).send({
            [resourceName]: {
              ...commonApiProperties('Entity not found'),
              data: response.data
            }
          })
        } else if (response.message === 'OK') {
          reply.code(200).send({
            [resourceName]: {
              ...commonApiProperties('Entity successfully found'),
              data: response.data
            }
          })
        }
      } catch (error) {
        reply.code(500).send({
          [resourceName]: {
            ...commonApiProperties(error.message)
          }
        })
      }
    },
    create: async (request, reply) => {
      try {
        const { body } = request
        const response = await services.create(body)

        if (response.message === 'NOT_FOUND') {
          reply.code(404).send({
            [resourceName]: {
              ...commonApiProperties('Entity not found'),
              data: response.data
            }
          })
        } else if (response.message === 'OK') {
          reply.code(201).send({
            [resourceName]: {
              ...commonApiProperties('Entity successfully created'),
              data: response.data
            }
          })
        }
      } catch (error) {
        reply.code(500).send({
          [resourceName]: {
            ...commonApiProperties(error.message)
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
        const response = await services.update(id, body)

        if (response.message === 'NOT_FOUND') {
          reply.code(404).send({
            [resourceName]: {
              ...commonApiProperties('Entity not found'),
              data: response.data
            }
          })
        } else if (response.message === 'OK') {
          reply.code(200).send({
            [resourceName]: {
              ...commonApiProperties('Entity successfully updated'),
              data: response.data
            }
          })
        }
      } catch (error) {
        reply.code(500).send({
          [resourceName]: {
            ...commonApiProperties(error.message)
          }
        })
      }
    },
    delete: async (request, reply) => {
      try {
        const {
          params: { id }
        } = request
        const response = await services.delete(id)

        if (response.message === 'NOT_FOUND') {
          reply.code(404).send({
            [resourceName]: {
              ...commonApiProperties('Entity not found'),
              data: response.data
            }
          })
        } else if (response.message === 'OK') {
          reply.code(200).send({
            [resourceName]: {
              ...commonApiProperties('Entity successfully deleted'),
              data: response.data
            }
          })
        }
      } catch (error) {
        reply.code(500).send({
          [resourceName]: {
            ...commonApiProperties(error.message)
          }
        })
      }
    }
  }
}
