async function routes(fastify, options) {
  // Ejemplo de ruta GET
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

  // Aquí puedes agregar más rutas
}

module.exports = routes 