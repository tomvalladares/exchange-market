const fastifyPlugin = require('fastify-plugin')
const sqlite3 = require('sqlite3').verbose()
const path = require('path')

async function dbConnector(fastify, options) {
  const db = new sqlite3.Database(path.join(__dirname, 'database.db'), (err) => {
    if (err) {
      console.error(err.message)
      throw err
    }
    console.log('Connected to the SQLite database.')
  })

  // Hacer la base de datos disponible a través del decorador
  fastify.decorate('db', db)
}

module.exports = fastifyPlugin(dbConnector) 