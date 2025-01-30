async function routes(fastify, options) {
  // Ejemplo de ruta GET
  fastify.get('/health', async (request, reply) => {
    return { status: 'ok' }
  })

  const DATABASE_TABLES = {
    EXCHANGE: 'exchanges'
  }

  const EXCHANGE_INVERSES = {
    'cashTransfer': 'transferCash',
    'transferCash': 'cashTransfer'
  }

  // Create exchange endpoint
  fastify.post('/api/exchange', async (request, reply) => {
    const { amount, exchangeType, userId } = request.body

	// HERE SHOULD BE USE XSS to clean data
    
    // Validate required fields
    if (!amount || !exchangeType || !userId) {
      reply.code(400)
      return { error: 'Missing required fields' }
    }

    try {
      const query = `
        INSERT INTO ${DATABASE_TABLES.EXCHANGE} (amount, exchangeType, status, userId, createdAt, matchedAt)
        VALUES (?, ?, ?, ?, datetime('now'), NULL)
      `
      
      // Insert the exchange
      await new Promise((resolve, reject) => {
        fastify.db.run(query, [
          amount,
          exchangeType,
          'pending',
          userId
        ], function(err) {
          if (err) reject(err);
          else resolve(this.lastID);
        });
      });

	//   THIS SHOULD BE REMOVED FOR PRODUCTION, testing purposes
      // Fetch the created exchange
      const createdExchange = await new Promise((resolve, reject) => {
        fastify.db.get(
          `SELECT * FROM ${DATABASE_TABLES.EXCHANGE} WHERE rowid = last_insert_rowid()`,
          [],
          (err, row) => {
            if (err) reject(err);
            else resolve(row);
          }
        );
      });

      reply.code(201)
      return { 
        status: 'success', 
        message: 'Exchange created successfully',
        exchange: createdExchange
      }
    } catch (error) {
      console.error('Error creating exchange:', error)
      reply.code(500)
      return { error: 'Internal server error' }
    }
  })

  // Get exchange by userId
  fastify.get('/api/exchange', async (request, reply) => {
    try {
      let { userId } = request.query
      
      if (!userId) {
        reply.code(400)
        return { error: 'Missing required fields' }
      }

      userId = parseInt(userId)
      
      if (isNaN(userId)) {
        reply.code(400)
        return { error: 'Invalid userId format' }
      }
      
      // First, get the user's exchanges
      const userExchangesQuery = `
        SELECT * FROM ${DATABASE_TABLES.EXCHANGE} 
        WHERE userId = ? 
        ORDER BY createdAt DESC
      `
	  
      const userExchanges = await new Promise((resolve, reject) => {
        fastify.db.all(userExchangesQuery, [userId], (err, rows) => {
          if (err) reject(err);
          else resolve(rows || []);
        });
      });

      // Process each exchange
      const processedExchanges = await Promise.all(userExchanges.map(async (exchange) => {
        // If exchange is already matched, return with its match details
        if (exchange.status === 'matched') {
          const matchQuery = `
            SELECT * FROM ${DATABASE_TABLES.EXCHANGE} 
            WHERE userId != ? 
            AND status = 'matched' 
            AND amount = ? 
            AND exchangeType = ?
            AND createdAt <= ?
            LIMIT 1
          `;

          const matchedExchange = await new Promise((resolve, reject) => {
            fastify.db.get(matchQuery, [
              userId, 
              exchange.amount, 
              EXCHANGE_INVERSES[exchange.exchangeType],
              exchange.createdAt
            ], (err, row) => {
              if (err) reject(err);
              else resolve(row);
            });
          });

		  console.log('---------matchedExchange', matchedExchange)

          return {
            ...exchange,
            matchExchange: matchedExchange
          };
        }

        // For pending exchanges, look for potential matches
        if (exchange.status === 'pending') {
          const matchQuery = `
            SELECT * FROM ${DATABASE_TABLES.EXCHANGE} 
            WHERE userId != ? 
            AND status = 'pending' 
            AND exchangeType = ?
            AND amount = ?
            LIMIT 1
          `;

          const potentialMatch = await new Promise((resolve, reject) => {
            fastify.db.get(matchQuery, [
              userId, 
              EXCHANGE_INVERSES[exchange.exchangeType],
              exchange.amount,
            ], (err, row) => {
              if (err) reject(err);
              else resolve(row);
            });
          });

          // If we found a match, update both exchanges to matched status
          if (potentialMatch) {
            const updateQuery = `
              UPDATE ${DATABASE_TABLES.EXCHANGE}
              SET status = 'matched', matchedAt = datetime('now')
              WHERE rowid = ? OR rowid = ?
            `;

            await new Promise((resolve, reject) => {
              fastify.db.run(updateQuery, [exchange.rowid, potentialMatch.rowid], (err) => {
                if (err) reject(err);
                else resolve();
              });
            });

            // Return both exchanges with updated status
            return {
              ...exchange,
              status: 'matched',
              matchedAt: new Date().toISOString(),
              matchedExchange: {
                ...potentialMatch,
                status: 'matched',
                matchedAt: new Date().toISOString()
              }
            };
          }
        }

        // If no match found or exchange is in a different status, return original exchange
        return exchange;
      }));

      return { 
        status: 'success', 
        exchanges: processedExchanges 
      }
    } catch (error) {
      console.error('Error fetching exchanges:', error)
      reply.code(500)
      return { error: 'Internal server error' }
    }
  })

  //!!!! only devmode Reset exchanges endpoint and demo purposes
  // Add this endpoint after the existing routes
  fastify.delete('/api/exchange/reset', async (request, reply) => {
    try {
		console.log('resetting exchanges')
		const query = `DELETE FROM ${DATABASE_TABLES.EXCHANGE}`
		
		await new Promise((resolve, reject) => {
			fastify.db.run(query, [], function(err) {
			if (err) reject(err);
			else resolve();
			});
		});

		reply.code(200)
		return { 
			status: 'success', 
			message: 'All exchanges deleted successfully'
		}
		} catch (error) {
		console.error('Error resetting exchanges:', error)
		reply.code(500)
		return { error: 'Internal server error' }
		}
  })
}

module.exports = routes 