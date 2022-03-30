'use strict'

module.exports = {
  routePrefixSplitter: (string) => string.split('/').pop(),
  swaggerTagNameNormalizer: (string) =>
    string.charAt(0).toUpperCase() + string.slice(1)
}
