const boom = require('boom')
const fetchLog = require('../queries/fetch-log')
const createEntry = require('../queries/create-entry')

module.exports = (app, pg) => {
  app.post('/:logId/edit/:key/entries', async (req, res, next) => {
    try {
      const log = await fetchLog(pg, req.params.logId, req.params.key)
      if (!log) {
        throw boom.notFound()
      }

      const { message, roll } = req.body
      await createEntry(pg, req.params.logId, message.trim(), roll.trim())

      res.redirect(`/${req.params.logId}/edit/${req.params.key}`)
    } catch (err) {
      if (boom.isBoom(err) && err.message === 'Bad Request') {
        const error = encodeURIComponent(err.message)
        const message = encodeURIComponent(req.body.message)
        const roll = encodeURIComponent(req.body.roll)
        res.redirect(`/${req.params.logId}/edit/${req.params.key}?error=${error}&message=${message}&roll=${roll}`)
      } else {
        next(err)
      }
    }
  })
}
