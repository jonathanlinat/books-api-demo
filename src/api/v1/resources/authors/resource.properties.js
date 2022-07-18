'use strict'

module.exports = () => {
  const date = new Date(Date.now())

  return {
    controllers: {
      api: (message) => ({
        processed_at: date,
        message
      })
    },
    schemas: {
      api: {
        processed_at: { type: 'string' },
        message: { type: 'string' }
      },
      database: {
        _id: { type: 'string' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' }
      },
      entity: {
        common: {
          deleted_at: { type: 'string', default: '' },
          published_at: { type: 'string', default: '' }
        },
        specific: {
          firstname: { type: 'string' },
          lastname: { type: 'string' },
          gender: { type: 'string', default: '' },
          birthday: { type: 'string', default: '' },
          birthplace: { type: 'string', default: '' }
        },
        required: ['firstname', 'lastname']
      }
    },
    model: {
      entity: {
        common: {
          deleted_at: { type: 'string', default: '' },
          published_at: { type: 'string', default: '' }
        },
        specific: {
          firstname: { type: 'string', required: true },
          lastname: { type: 'string', required: true },
          gender: { type: 'string', default: '' },
          birthday: { type: 'string', default: '' },
          birthplace: { type: 'string', default: '' }
        }
      },
      options: {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        versionKey: false
      }
    }
  }
}
