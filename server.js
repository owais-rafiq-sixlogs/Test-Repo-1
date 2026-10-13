const http = require('http');
const PORT = process.env.PORT || 3000;
const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'user' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'user' },
  { id: 4, name: 'David Brown', email: 'david@example.com', role: 'editor' },
  { id: 5, name: 'Eva Green', email: 'eva@example.com', role: 'user' }
];
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/api/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(users));
  }
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
