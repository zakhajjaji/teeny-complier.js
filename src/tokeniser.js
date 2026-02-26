// Bridge module so existing Node tests (`require('../src/tokeniser')`)
// continue to work after moving the implementation under `frontend/lib/backend`.
// This simply re-exports the frontend copy.

module.exports = require('../frontend/lib/backend/tokeniser');

