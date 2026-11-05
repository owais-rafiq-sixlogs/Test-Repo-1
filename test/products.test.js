const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { createServer } = require('../src/server');

let server;
let baseUrl;

before(async () => {
  server = createServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
});

after(() => new Promise((resolve) => server.close(resolve)));

test('GET /products returns the sample product list', async () => {
  const res = await fetch(`${baseUrl}/products`);
  const body = await res.json();

  assert.equal(res.status, 200);
  assert.equal(body.count, 10);
  assert.equal(body.products.length, 10);
  assert.equal(body.products[0].name, 'Whole Milk');
});

test('GET /products filters by category, case-insensitively', async () => {
  const res = await fetch(`${baseUrl}/products?category=dairy`);
  const body = await res.json();

  assert.equal(res.status, 200);
  assert.ok(body.products.length > 0);
  assert.ok(body.products.every((p) => p.category === 'Dairy'));
});

test('GET /products filters by stock status', async () => {
  const res = await fetch(`${baseUrl}/products?inStock=false`);
  const body = await res.json();

  assert.equal(res.status, 200);
  assert.deepEqual(
    body.products.map((p) => p.name),
    ['Baby Spinach'],
  );
});

test('GET /products rejects an invalid inStock value', async () => {
  const res = await fetch(`${baseUrl}/products?inStock=maybe`);

  assert.equal(res.status, 400);
});

test('non-GET methods on /products return 405', async () => {
  const res = await fetch(`${baseUrl}/products`, { method: 'POST' });

  assert.equal(res.status, 405);
  assert.equal(res.headers.get('allow'), 'GET');
});

test('unknown paths return 404', async () => {
  const res = await fetch(`${baseUrl}/nope`);

  assert.equal(res.status, 404);
});
