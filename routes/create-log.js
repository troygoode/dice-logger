const createLog = require('../queries/create-log')

module.exports = (app, pg) => {
  app.post('/', async (req, res, next) => {
    try {
      const log = await createLog(pg)
      res.redirect(`/${log.id}/edit/${log.key}`)
    } catch (err) {
      next(err)
    }
  })
}
