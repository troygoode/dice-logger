const pug = require('pug')
const moment = require('moment')
const fetchRecentEntries = require('../queries/fetch-recent-entries')

module.exports = (app, pg) => {
  app.get('/', async (req, res, next) => {
    try {
      const entries = await fetchRecentEntries(pg)
      res.send(pug.renderFile('templates/home.pug', {
        entries,
        moment
      }))
    } catch (err) {
      next(err)
    }
  })
}
