const fastify = require('fastify')({ logger: true })
const cors = require('@fastify/cors')
const dbConnector = require('./db/db-connector')
const migrations = require('./db/migrations')
const routes = require('./routes')

// Register plugins
fastify.register(cors, {
  origin: 'http://localhost:5173', // Vue.js development server
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
})

fastify.register(dbConnector)
fastify.register(migrations)
fastify.register(routes)

// Run the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start() 