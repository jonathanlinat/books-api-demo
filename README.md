# Enhanced Thief Fan Missions Archive API

A simple Fan Missions catalog API built over [Fastify](https://www.fastify.io/) and [MongoDB](https://www.mongodb.com/).

---

## Table of contents

* [Prerequisites](#prerequisites)
  + [Environment variables](#environment-variables)
* [Usage](#usage)
  + [Start the server](#start-the-server)
  + [Seed the database](#seed-the-database)
  + [Execute unit tests](#execute-unit-tests)
  + [Lint and fix (mostly) the source code](#lint-and-fix--mostly--the-source-code)

## To-Do list

* [X] Document the API
  + [X] Create a `README.md` file
  + [X] Add Swagger
* [ ] Versionize the API
  + [X] URI
  + [ ] Custom header
* [ ] Create custom error response handlers (`setErrorHandler` & `setNotFound`)
* [ ] Export all shared properties to a unique file
* [ ] Dockerize the application
* [ ] Build a CI/CD pipeline
* [ ] Implement authenticated routes
* [ ] Employ concurrent calls
* [ ] Add cached replies
* [ ] Add replies compression
* [ ] Implement pagination
* [ ] Generate and send logs
* [ ] Add a database seeder
* [ ] Create a database migration process
* [ ] Test the API
  + [ ] Create unit tests
  + [ ] Create functional tests

## Prerequisites

- **Node** (v16.x) must be installed: https://nodejs.org/download/release/latest-gallium/
- **PNPM** (v7.x) must be installed: `npm install --global pnpm`
- **MongoDB** must be installed and running (Only local development)

### Environment variables

A file named `.env` must be created at the project's root to define permanent environment variables.

```bash
MONGO_URL='mongodb://localhost:27017/'
MONGO_DATABASE_NAME='etfma-api'
MONGO_COLLECTION_NAMES='["authors"]'
API_VERSION='v1'
```

## Usage

A bunch of multiple commands is available to meet your needs.

### Start the server

Two commands are available. Each of them depends on the environment.

#### Local

```bash
pnpm dev
```

#### Production

```bash
pnpm start
```

### Seed the database

```bash
pnpm seed
```

### Execute unit tests

```bash
pnpm test
```

### Lint and fix (mostly) the source code

```bash
pnpm lint
```