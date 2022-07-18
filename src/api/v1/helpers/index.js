'use strict'

module.exports = {
  checkObjectIdValidity: (id) => !id.match(/^[0-9a-fA-F]{24}$/),
  routePrefixSplitter: (string) => string.split('/').pop(),
  swaggerTagNameNormalizer: (string) =>
    string.charAt(0).toUpperCase() + string.slice(1)
}
