'use strict'

const resourceModel = require('./resource.model.js')

module.exports = (fastify, opts) => {
  const model = resourceModel(fastify, opts)

  const date = new Date(Date.now())

  return {
    list: async () => {
      let response = {}

      const entity = await model.find({})

      if (entity.length >= 1) {
        response = {
          message: 'OK',
          data: entity
        }
      } else {
        response = {
          message: 'NOT_FOUND',
          data: []
        }
      }

      return response
    },
    get: async (id) => {
      let response = {}

      const entity = await model.findById(id)

      if (entity) {
        response = {
          message: 'OK',
          data: entity
        }
      } else {
        response = {
          message: 'NOT_FOUND',
          data: null
        }
      }

      return response
    },
    create: async (body) => {
      let data = {}
      let response = {}

      data = {
        ...body,
        created_at: date,
        deleted_at: null,
        updated_at: date
      }

      const create = model(data)
      const save = await create.save()
      const entity = await model.findById(save.id)

      if (entity) {
        response = {
          message: 'OK',
          data: entity
        }
      } else {
        response = {
          message: 'NOT_FOUND',
          data: null
        }
      }

      return response
    },
    update: async (id, body) => {
      let data = {}
      let response = {}

      let entity = await model.findById(id)

      if (entity) {
        data = {
          ...body,
          updated_at: date
        }

        const update = await model.findByIdAndUpdate(id, data)
        const save = await update.save()
        entity = await model.findById(save.id)

        response = {
          message: 'OK',
          data: entity
        }
      } else {
        response = {
          message: 'NOT_FOUND',
          data: null
        }
      }

      return response
    },
    delete: async (id) => {
      let response = {}

      const entity = await model.findByIdAndDelete(id)

      if (entity) {
        response = {
          message: 'OK',
          data: entity
        }
      } else {
        response = {
          message: 'NOT_FOUND',
          data: null
        }
      }

      return response
    }
  }
}
