/**
 * Main application routes
 */

// Import Endpoints
const test = require('./api/test')

module.exports = (app) => {
  // Insert routes below
  app.use('/api/test', test)
  // Next routes
  // Endpoints in plural
  // app.use('/api/users', user)
  // app.use('/api/products', product)
}
