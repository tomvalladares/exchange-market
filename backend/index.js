const fastify = require('fastify')({ logger: true })
const cors = require('@fastify/cors')

// Registrar CORS
fastify.register(cors, {
  origin: true
})

// Registrar la conexión a la base de datos
fastify.register(require('./db/db-connector'))

// Registrar las rutas
fastify.register(require('./routes/index'))

// Iniciar el servidor
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start() 