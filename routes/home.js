const pug = require('pug')

module.exports = (app) => {
  app.get('/', (req, res, next) => {
    try {
      res.send(pug.renderFile('templates/index.pug'))
    } catch (err) {
      next(err)
    }
  })
}
