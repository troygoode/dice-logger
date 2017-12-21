module.exports = async (pg, logId) => {
  const entryResults = await pg.query({
    name: 'fetch-log-entries',
    text: 'SELECT message, roll, result, created_at, log_id FROM entries WHERE log_id = $1 ORDER BY created_at DESC LIMIT 100;',
    values: [logId]
  })
  return entryResults.rows
}
