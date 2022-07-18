'use strict'

const dotenv = require('dotenv')
const yesno = require('yesno')
const pino = require('pino')
const mongoose = require('mongoose')

const seeds = require('./seeds')

;(async () => {
  dotenv.config()

  const logger = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true
      }
    }
  })

  const randomizer = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min)

  const databaseUri = process.env.MONGO_URL
  const databaseName = process.env.MONGO_DATABASE_NAME
  const databaseFullUri = databaseUri + databaseName
  const collectionNames = JSON.parse(process.env.MONGO_COLLECTION_NAMES)
  const totalAmountOfEntities = randomizer(64, 128)

  try {
    const doYouAgree = await yesno({
      question:
        'You are about to drop and override all the stored data. Are you sure you want to continue?'
    })

    if (!doYouAgree) throw new Error('The seeding process has been aborted.')

    logger.info(`Proceeding to seed the database "${databaseName}"...`)

    mongoose.connection.on('connected', () =>
      logger.info(`Successfully connected to database "${databaseName}"`)
    )

    mongoose.connection.on('disconnected', () =>
      logger.info(`Successfully disconnected from database "${databaseName}"`)
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

      const entities = seeds[collectionName](totalAmountOfEntities)

      await model.deleteMany()

      logger.info(
        `Successfully deleted all documents from "${collectionName}" collection`
      )

      await model.insertMany(entities)

      logger.info(
        `Collection "${collectionName}" successfully seeded with ${totalAmountOfEntities} new randomized entities`
      )
    }

    await client.disconnect()

    logger.info(`The seeding process has been successfuly executed!`)
  } catch (error) {
    logger.error(error)

    process.exit(1)
  }
})()
