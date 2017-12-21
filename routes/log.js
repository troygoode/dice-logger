const pug = require('pug')
const boom = require('boom')
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
        log: log,
        entries: entries,
        baseUrl: process.env.BASE_URL || DEFAULT_BASE_URL
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
        log: log,
        entries: entries,
        baseUrl: process.env.BASE_URL || DEFAULT_BASE_URL,
        error: req.query.error,
        message: req.query.message,
        roll: req.query.roll
      }))
    } catch (err) {
      next(err)
    }
  })
}
