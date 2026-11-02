const assert = require('node:assert/strict');
const { app } = require('../index');

(async () => {
  const server = app.listen(0);
  const { port } = server.address();
  const response = await fetch(`http://127.0.0.1:${port}/`);
  const body = await response.json();
  server.close();
  assert.equal(response.status, 200);
  assert.equal(body.message, 'CRUD Komik API aktif');
  console.log('API health self-check passed');
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
