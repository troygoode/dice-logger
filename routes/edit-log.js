const boom = require('boom')
const fetchLog = require('../queries/fetch-log')
const editLog = require('../queries/edit-log')

module.exports = (app, pg) => {
  app.post('/:logId/edit/:key', async (req, res, next) => {
    try {
      const log = await fetchLog(pg, req.params.logId, req.params.key)
      if (!log) {
        throw boom.notFound()
      }

      const { name } = req.body
      await editLog(pg, req.params.logId, name.trim())

      res.redirect(`/${req.params.logId}/edit/${req.params.key}`)
    } catch (err) {
      next(err)
    }
  })
}
