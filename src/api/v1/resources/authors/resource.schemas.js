'use strict'

const helpers = require('../../helpers')

module.exports = (opts) => {
  const resourceName = helpers.routePrefixSplitter(opts.prefix)

  const swaggerTagName = helpers.swaggerTagNameNormalizer(resourceName)
  const swaggerTags = [swaggerTagName]

  const commonApiProperties = {
    processed_at: { type: 'string' },
    description: { type: 'string' }
  }
  const commonEntityProperties = {
    _id: { type: 'string' },
    created_at: { type: 'string' },
    updated_at: { type: 'string' }
  }
  const specificEntityProperties = {
    firstname: { type: 'string' },
    lastname: { type: 'string' },
    birthday: { type: 'string', default: null },
    deleted_at: { type: 'string', default: null },
    published_at: { type: 'string', default: null }
  }
  const requiredSpecificEntityProperties = ['firstname', 'lastname']

  return {
    list: {
      schema: {
        tags: swaggerTags,
        summary: 'Get all existing authors',
        response: {
          200: {
            description: 'Entities successfully found',
            type: 'object',
            properties: {
              [resourceName]: {
                type: 'object',
                properties: {
                  ...commonApiProperties,
                  data: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        ...commonEntityProperties,
                        ...specificEntityProperties
                      }
                    }
                  }
                }
              }
            }
          },
          404: {
            description: 'Entities not found',
            type: 'object',
            properties: {
              [resourceName]: {
                type: 'object',
                properties: {
                  ...commonApiProperties,
                  data: {
                    type: 'array'
                  }
                }
              }
            }
          },
          500: {
            description: 'Internal Server Error',
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
    },
    get: {
      schema: {
        tags: swaggerTags,
        summary: 'Get a specific author',
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' }
          }
        },
        response: {
          200: {
            description: 'Entity successfully found',
            type: 'object',
            properties: {
              [resourceName]: {
                type: 'object',
                properties: {
                  ...commonApiProperties,
                  data: {
                    type: 'object',
                    properties: {
                      ...commonEntityProperties,
                      ...specificEntityProperties
                    }
                  }
                }
              }
            }
          },
          404: {
            description: 'Entity not found',
            type: 'object',
            properties: {
              [resourceName]: {
                type: 'object',
                properties: {
                  ...commonApiProperties,
                  data: {
                    type: 'object'
                  }
                }
              }
            }
          },
          500: {
            description: 'Internal Server Error',
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
    },
    create: {
      schema: {
        tags: swaggerTags,
        summary: 'Create a new author',
        body: {
          type: 'object',
          additionalProperties: false,
          properties: {
            ...specificEntityProperties
          },
          required: requiredSpecificEntityProperties
        },
        response: {
          201: {
            description: 'Entity successfully created',
            type: 'object',
            properties: {
              [resourceName]: {
                type: 'object',
                properties: {
                  ...commonApiProperties,
                  data: {
                    type: 'object',
                    properties: {
                      ...commonEntityProperties,
                      ...specificEntityProperties
                    }
                  }
                }
              }
            }
          },
          404: {
            description: 'Entity not found',
            type: 'object',
            properties: {
              [resourceName]: {
                type: 'object',
                properties: {
                  ...commonApiProperties,
                  data: {
                    type: 'object'
                  }
                }
              }
            }
          },
          500: {
            description: 'Internal Server Error',
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
    },
    update: {
      schema: {
        tags: swaggerTags,
        summary: 'Update a specific author',
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' }
          }
        },
        body: {
          type: 'object',
          additionalProperties: false,
          properties: {
            ...specificEntityProperties
          }
        },
        response: {
          200: {
            description: 'Entity successfully updated',
            type: 'object',
            properties: {
              [resourceName]: {
                type: 'object',
                properties: {
                  ...commonApiProperties,
                  data: {
                    type: 'object',
                    properties: {
                      ...commonEntityProperties,
                      ...specificEntityProperties
                    }
                  }
                }
              }
            }
          },
          404: {
            description: 'Entity not found',
            type: 'object',
            properties: {
              [resourceName]: {
                type: 'object',
                properties: {
                  ...commonApiProperties,
                  data: {
                    type: 'object'
                  }
                }
              }
            }
          },
          500: {
            description: 'Internal Server Error',
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
    },
    delete: {
      schema: {
        tags: swaggerTags,
        summary: 'Delete a specific author',
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' }
          }
        },
        response: {
          200: {
            description: 'Entity successfully deleted',
            type: 'object',
            properties: {
              [resourceName]: {
                type: 'object',
                properties: {
                  ...commonApiProperties,
                  data: {
                    type: 'object',
                    properties: {
                      ...commonEntityProperties,
                      ...specificEntityProperties
                    }
                  }
                }
              }
            }
          },
          404: {
            description: 'Entity not found',
            type: 'object',
            properties: {
              [resourceName]: {
                type: 'object',
                properties: {
                  ...commonApiProperties,
                  data: {
                    type: 'object'
                  }
                }
              }
            }
          },
          500: {
            description: 'Internal Server Error',
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
