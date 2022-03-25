'use strict'

const dotenv = require('dotenv')

const { faker } = require('@faker-js/faker')
const mongoose = require('mongoose')

const logger = (type, message) => {
  console[type](`[${new Date(Date.now()).toISOString()}] ${message}`)
}

const randomizer = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

!(async () => {
  dotenv.config()

  const databaseUri = process.env.MONGO_URL
  const databaseName = process.env.MONGO_DATABASE_NAME
  const databaseFullUri = databaseUri + databaseName
  const collectionName = 'authors'
  const totalAmountOfEntities = randomizer(64, 512)

  try {
    mongoose.connection.on('connected', () =>
      logger('info', `Successfully connected to database "${databaseName}"!`)
    )

    mongoose.connection.on('disconnected', () =>
      logger(
        'info',
        `Successfully disconnected from database "${databaseName}"!`
      )
    )

    const client = await mongoose.connect(databaseFullUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      config: {
        autoIndex: true
      }
    })

    const schema = new client.Schema(
      {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        birthday: { type: Date, default: null },
        deleted_at: { type: Date, default: null }
      },
      {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        versionKey: false
      }
    )

    const model = client.model(collectionName, schema)

    await model.deleteMany()

    logger(
      'info',
      `Successfully deleted all documents from "${collectionName}" collection!`
    )

    const timeSeriesData = []

    for (let i = 0; i < totalAmountOfEntities; i++) {
      const firstname = faker.name.firstName()
      const lastname = faker.name.lastName()

      timeSeriesData.push({
        firstname,
        lastname,
        birthday: faker.datatype.boolean() ? null : faker.date.past(),
        deleted_at: faker.datatype.boolean() ? null : faker.date.past()
      })
    }

    await model.insertMany(timeSeriesData)

    logger(
      'info',
      `Collection "${collectionName}" successfully seeded with ${totalAmountOfEntities} new randomized entities!`
    )

    await client.disconnect()
  } catch (error) {
    logger('error', `Ups! Something went wrong... ${error.stack}`)

    process.exit(-1)
  }
})()
