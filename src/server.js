const http = require('node:http');
const { getProducts } = require('./products');

function sendJson(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload),
  });
  res.end(payload);
}

function parseFilters(searchParams) {
  const filters = {};
  if (searchParams.has('category')) {
    filters.category = searchParams.get('category');
  }
  if (searchParams.has('inStock')) {
    const value = searchParams.get('inStock');
    if (value !== 'true' && value !== 'false') {
      return { error: 'inStock must be "true" or "false"' };
    }
    filters.inStock = value === 'true';
  }
  return { filters };
}

function handleRequest(req, res) {
  const url = new URL(req.url, 'http://localhost');

  if (url.pathname !== '/products') {
    return sendJson(res, 404, { error: 'Not found' });
  }
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  const { filters, error } = parseFilters(url.searchParams);
  if (error) {
    return sendJson(res, 400, { error });
  }

  const products = getProducts(filters);
  return sendJson(res, 200, { count: products.length, products });
}

function createServer() {
  return http.createServer(handleRequest);
}

if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  createServer().listen(port, () => {
    console.log(`Grocery mart API listening on http://localhost:${port}`);
  });
}

module.exports = { createServer };
