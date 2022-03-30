'use strict'

const { faker } = require('@faker-js/faker')

module.exports = (totalAmountOfEntities) => {
  const entities = []

  for (let i = 0; i < totalAmountOfEntities; i++) {
    const firstname = faker.name.firstName()
    const lastname = faker.name.lastName()
    const date = () => (faker.datatype.boolean() ? null : faker.date.past())

    entities.push({
      firstname,
      lastname,
      birthday: date(),
      deleted_at: date(),
      published_at: date()
    })
  }

  return entities
}
