'use strict'

const { faker } = require('@faker-js/faker')

module.exports = (totalAmountOfEntities) => {
  const entities = []

  for (let i = 0; i < totalAmountOfEntities; i++) {
    const firstname = faker.name.firstName()
    const lastname = faker.name.lastName()
    const date = () => (faker.datatype.boolean() ? '' : faker.date.past())
    const gender = () =>
      faker.datatype.boolean() ? '' : faker.name.gender(true)
    const cityName = () =>
      faker.datatype.boolean() ? '' : faker.address.cityName()

    const properties = {
      common: {
        deleted_at: date(),
        published_at: date()
      },
      specific: {
        firstname,
        lastname,
        gender: gender(),
        birthday: date(),
        birthplace: cityName()
      }
    }

    entities.push({
      ...properties.common,
      ...properties.specific
    })
  }

  return entities
}
