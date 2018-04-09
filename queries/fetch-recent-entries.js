module.exports = async (pg) => {
  const entryResults = await pg.query({
    name: 'fetch-recent-entries',
    text: `
      SELECT e.message, e.roll, e.result, e.created_at, e.log_id, l.name
      FROM entries e
      INNER JOIN logs l ON l.id = e.log_id
      WHERE CHAR_LENGTH(e.message) > 0
      ORDER BY e.created_at DESC
      LIMIT 10;
    `,
    values: []
  })
  return entryResults.rows
}
