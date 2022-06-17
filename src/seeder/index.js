'use strict'

const dotenv = require('dotenv')
const mongoose = require('mongoose')

const seeds = require('./seeds')

;(async () => {
  dotenv.config()

  const logger = (type, message) => {
    console[type](`[${new Date(Date.now()).toISOString()}] ${message}`)
  }

  const randomizer = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min)

  const databaseUri = process.env.MONGO_URL
  const databaseName = process.env.MONGO_DATABASE_NAME
  const databaseFullUri = databaseUri + databaseName
  const collectionNames = JSON.parse(process.env.MONGO_COLLECTION_NAMES)
  const totalAmountOfEntities = randomizer(64, 512)

  try {
    mongoose.connection.on('connected', () =>
      logger('info', `Successfully connected to database "${databaseName}"`)
    )

    mongoose.connection.on('disconnected', () =>
      logger(
        'info',
        `Successfully disconnected from database "${databaseName}"`
      )
    )

    const client = await mongoose.connect(databaseFullUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      config: {
        autoIndex: true
      }
    })

    for await (const collectionName of collectionNames) {
      const model =
        require(`../api/${process.env.API_VERSION}/resources/${collectionName}/resource.model`)(
          { mongoose: client },
          { prefix: collectionName }
        )

      await model.deleteMany()

      logger(
        'info',
        `Successfully deleted all documents from "${collectionName}" collection`
      )

      await model.insertMany(seeds[collectionName](totalAmountOfEntities))

      logger(
        'info',
        `Collection "${collectionName}" successfully seeded with ${totalAmountOfEntities} new randomized entities`
      )
    }

    await client.disconnect()
  } catch (error) {
    logger('error', error)

    process.exit(-1)
  }
})()
