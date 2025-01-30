const fastifyPlugin = require('fastify-plugin')

async function migrations(fastify, options) {
  const db = fastify.db

  // Create exchanges table if it doesn't exist
  const createExchangesTable = `
    CREATE TABLE IF NOT EXISTS exchanges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount DECIMAL NOT NULL,
      exchangeType TEXT NOT NULL,
      status TEXT NOT NULL,
      userId INTEGER NOT NULL,
      createdAt DATETIME NOT NULL
    )
  `

  try {
    await db.run(createExchangesTable)
    console.log('Migrations completed successfully')
  } catch (error) {
    console.error('Error running migrations:', error)
    throw error
  }
}

module.exports = fastifyPlugin(migrations) 