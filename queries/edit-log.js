module.exports = async (pg, logId, name) => {
  await pg.query({
    name: 'edit-log',
    text: 'UPDATE logs SET name = $2 WHERE id = $1;',
    values: [logId, name]
  })
}
