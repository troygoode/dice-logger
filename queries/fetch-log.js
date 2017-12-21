module.exports = async (pg, logId, key) => {
  try {
    let results

    if (key) {
      results = await pg.query({
        name: 'fetch-editable-log',
        text: 'SELECT id, key, name FROM logs WHERE id = $1 AND key = $2;',
        values: [logId, key]
      })
    } else {
      results = await pg.query({
        name: 'fetch-log',
        text: 'SELECT id, name FROM logs WHERE id = $1;',
        values: [logId]
      })
    }

    if (!results.rows || !results.rows.length) {
      return null
    }

    return results.rows[0]
  } catch (err) {
    if (err.routine === 'string_to_uuid') {
      // the supplied id or key isn't a UUID
      return null
    }
    throw err
  }
}
