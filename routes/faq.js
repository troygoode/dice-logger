const pug = require('pug')

module.exports = (app) => {
  app.get('/faq', async (req, res, next) => {
    try {
      res.send(pug.renderFile('templates/faq.pug'))
    } catch (err) {
      next(err)
    }
  })
}
