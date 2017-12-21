const boom = require('boom')
const Roller = require('roll')
const roller = new Roller()

module.exports = async (pg, logId, message, roll) => {
  if (!roller.validate(roll)) {
    throw boom.badRequest()
  }

  const rollResult = roller.roll(roll).result

  const results = await pg.query({
    name: 'create-entry',
    text: 'INSERT INTO entries (log_id, message, roll, result) VALUES ($1, $2, $3, $4);',
    values: [logId, message, roll, rollResult]
  })
}
