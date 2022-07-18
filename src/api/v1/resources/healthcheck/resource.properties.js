'use strict'

module.exports = () => {
  const date = new Date(Date.now())

  return {
    controllers: {
      api: (message) => ({
        processed_at: date,
        message
      })
    }
  }
}
