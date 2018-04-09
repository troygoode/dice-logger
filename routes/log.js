const pug = require('pug')
const boom = require('boom')
const moment = require('moment')
const fetchLog = require('../queries/fetch-log')
const fetchLogEntries = require('../queries/fetch-log-entries')

const DEFAULT_BASE_URL = 'http://localhost'

module.exports = (app, pg) => {
  app.get('/:logId', async (req, res, next) => {
    try {
      const log = await fetchLog(pg, req.params.logId)
      if (!log) {
        throw boom.notFound()
      }

      const entries = await fetchLogEntries(pg, req.params.logId)

      res.send(pug.renderFile('templates/log.pug', {
        edit: false,
        baseUrl: process.env.BASE_URL || DEFAULT_BASE_URL,
        log,
        entries,
        moment
      }))
    } catch (err) {
      next(err)
    }
  })

  app.get('/:logId/edit/:key', async (req, res, next) => {
    try {
      const log = await fetchLog(pg, req.params.logId, req.params.key)
      if (!log) {
        throw boom.notFound()
      }

      const entries = await fetchLogEntries(pg, req.params.logId)

      res.send(pug.renderFile('templates/log.pug', {
        edit: true,
        baseUrl: process.env.BASE_URL || DEFAULT_BASE_URL,
        error: req.query.error,
        message: req.query.message,
        roll: req.query.roll,
        log,
        entries,
        moment
      }))
    } catch (err) {
      next(err)
    }
  })
}
