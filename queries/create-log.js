module.exports = async (pg) => {
  const results = await pg.query({
    name: 'create-log',
    text: 'INSERT INTO logs (id) VALUES (DEFAULT) RETURNING id, key;',
    values: []
  })

  if (!results.rows || !results.rows.length) {
    return null
  }

  return results.rows[0]
}
