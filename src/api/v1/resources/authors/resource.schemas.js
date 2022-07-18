'use strict'

const helpers = require('../../helpers')

const resourceProperties = require('./resource.properties')

module.exports = (opts) => {
  const resourceName = helpers.routePrefixSplitter(opts.prefix)

  const swaggerTagName = helpers.swaggerTagNameNormalizer(resourceName)
  const swaggerTags = [swaggerTagName]

  return {
    list: {
      schema: {
        tags: swaggerTags,
        summary: 'Get all existing entities',
        response: {
          200: {
            type: 'object',
            description: 'Entities successfully found',
            properties: {
              [resourceName]: {
                type: 'object',
                properties: {
                  ...resourceProperties().schemas.api,
                  data: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        ...resourceProperties().schemas.database,
                        ...resourceProperties().schemas.entity.common,
                        ...resourceProperties().schemas.entity.specific
                      }
                    }
                  }
                }
              }
            }
          },
          404: {
            type: 'object',
            description: 'Entities not found',
            properties: {
              [resourceName]: {
                type: 'object',
                properties: {
                  ...resourceProperties().schemas.api,
                  data: {
                    type: 'array'
                  }
                }
              }
            }
          },
          500: {
            type: 'object',
            description: 'Internal Server Error',
            properties: {
              [resourceName]: {
                type: 'object',
                properties: {
                  ...resourceProperties().schemas.api
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
        summary: 'Get a specific entity',
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' }
          }
        },
        response: {
          200: {
            type: 'object',
            description: 'Entity successfully found',
            properties: {
              [resourceName]: {
                type: 'object',
                properties: {
                  ...resourceProperties().schemas.api,
                  data: {
                    type: 'object',
                    properties: {
                      ...resourceProperties().schemas.database,
                      ...resourceProperties().schemas.entity.common,
                      ...resourceProperties().schemas.entity.specific
                    }
                  }
                }
              }
            }
          },
          404: {
            type: 'object',
            description: 'Entity not found',
            properties: {
              [resourceName]: {
                type: 'object',
                properties: {
                  ...resourceProperties().schemas.api,
                  data: {
                    type: 'object'
                  }
                }
              }
            }
          },
          422: {
            type: 'object',
            description: 'Provided ID not valid',
            properties: {
              [resourceName]: {
                type: 'object',
                properties: {
                  ...resourceProperties().schemas.api
                }
              }
            }
          },
          500: {
            type: 'object',
            description: 'Internal Server Error',
            properties: {
              [resourceName]: {
                type: 'object',
                properties: {
                  ...resourceProperties().schemas.api
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
        summary: 'Create a new entity',
        body: {
          type: 'object',
          additionalProperties: false,
          properties: {
            ...resourceProperties().schemas.entity.specific
          },
          required: resourceProperties().schemas.entity.required
        },
        response: {
          201: {
            type: 'object',
            description: 'Entity successfully created',
            properties: {
              [resourceName]: {
                type: 'object',
                properties: {
                  ...resourceProperties().schemas.api,
                  data: {
                    type: 'object',
                    properties: {
                      ...resourceProperties().schemas.database,
                      ...resourceProperties().schemas.entity.common,
                      ...resourceProperties().schemas.entity.specific
                    }
                  }
                }
              }
            }
          },
          404: {
            type: 'object',
            description: 'Entity not found',
            properties: {
              [resourceName]: {
                type: 'object',
                properties: {
                  ...resourceProperties().schemas.api,
                  data: {
                    type: 'object'
                  }
                }
              }
            }
          },
          422: {
            type: 'object',
            description: 'Provided ID not valid',
            properties: {
              [resourceName]: {
                type: 'object',
                properties: {
                  ...resourceProperties().schemas.api
                }
              }
            }
          },
          500: {
            type: 'object',
            description: 'Internal Server Error',
            properties: {
              [resourceName]: {
                type: 'object',
                properties: {
                  ...resourceProperties().schemas.api
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
        summary: 'Update a specific entity',
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
            ...resourceProperties().schemas.entity.specific
          },
          required: resourceProperties().schemas.entity.required
        },
        response: {
          200: {
            type: 'object',
            description: 'Entity successfully updated',
            properties: {
              [resourceName]: {
                type: 'object',
                properties: {
                  ...resourceProperties().schemas.api,
                  data: {
                    type: 'object',
                    properties: {
                      ...resourceProperties().schemas.database,
                      ...resourceProperties().schemas.entity.common,
                      ...resourceProperties().schemas.entity.specific
                    }
                  }
                }
              }
            }
          },
          404: {
            type: 'object',
            description: 'Entity not found',
            properties: {
              [resourceName]: {
                type: 'object',
                properties: {
                  ...resourceProperties().schemas.api,
                  data: {
                    type: 'object'
                  }
                }
              }
            }
          },
          422: {
            type: 'object',
            description: 'Provided ID not valid',
            properties: {
              [resourceName]: {
                type: 'object',
                properties: {
                  ...resourceProperties().schemas.api
                }
              }
            }
          },
          500: {
            type: 'object',
            description: 'Internal Server Error',
            properties: {
              [resourceName]: {
                type: 'object',
                properties: {
                  ...resourceProperties().schemas.api
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
        summary: 'Delete a specific entity',
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' }
          }
        },
        response: {
          200: {
            type: 'object',
            description: 'Entity successfully deleted',
            properties: {
              [resourceName]: {
                type: 'object',
                properties: {
                  ...resourceProperties().schemas.api,
                  data: {
                    type: 'object',
                    properties: {
                      ...resourceProperties().schemas.database,
                      ...resourceProperties().schemas.entity.common,
                      ...resourceProperties().schemas.entity.specific
                    }
                  }
                }
              }
            }
          },
          404: {
            type: 'object',
            description: 'Entity not found',
            properties: {
              [resourceName]: {
                type: 'object',
                properties: {
                  ...resourceProperties().schemas.api,
                  data: {
                    type: 'object'
                  }
                }
              }
            }
          },
          422: {
            type: 'object',
            description: 'Provided ID not valid',
            properties: {
              [resourceName]: {
                type: 'object',
                properties: {
                  ...resourceProperties().schemas.api
                }
              }
            }
          },
          500: {
            type: 'object',
            description: 'Internal Server Error',
            properties: {
              [resourceName]: {
                type: 'object',
                properties: {
                  ...resourceProperties().schemas.api
                }
              }
            }
          }
        }
      }
    }
  }
}
