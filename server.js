const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const boom = require('boom')
const { Client: PostgresClient } = require('pg')
const { parse: parseConnectionString } = require('pg-connection-string')

const homeRoute = require('./routes/home')
const createLogRoute = require('./routes/create-log')
const logRoute = require('./routes/log')
const editLogRoute = require('./routes/edit-log')
const createEntryRoute = require('./routes/create-entry')

const DEFAULT_CONNECTION_STRING = 'postgres://localhost/dicelogger'
const DEFAULT_PORT = 3000

;(async function () {
  const app = express()
  const pg = new PostgresClient(parseConnectionString(process.env.CONNECTION_STRING || DEFAULT_CONNECTION_STRING))
  const port = process.env.PORT || DEFAULT_PORT

  await pg.connect()

  app.use(helmet())
  app.use(express.static('static'))
  app.use(bodyParser.urlencoded({ extended: false }))

  homeRoute(app, pg)
  createLogRoute(app, pg)
  logRoute(app, pg)
  editLogRoute(app, pg)
  createEntryRoute(app, pg)

  app.use((err, req, res, next) => {
    if (boom.isBoom(err)) {
      const { payload } = err.output
      res.status(payload.statusCode).send(payload.error)
    } else {
      console.error(err.stack)
      res.status(500).send('Server Error')
    }
  })

  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
})()
