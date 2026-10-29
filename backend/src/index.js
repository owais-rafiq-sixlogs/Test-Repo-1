const express = require('express');
const cors = require('cors');
const store = require('./store');

const app = express();
const PORT = process.env.PORT || 3000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/users', (req, res) => {
  res.status(200).json(store.list());
});

app.post('/users', (req, res) => {
  const { name, email } = req.body || {};
  if (typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'name is required and must be a non-empty string' });
  }
  if (typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ error: 'email is required and must be a non-empty string' });
  }
  const cleanEmail = email.trim();
  if (!EMAIL_RE.test(cleanEmail)) {
    return res.status(400).json({ error: 'email is not a valid email address' });
  }
  if (store.findByEmail(cleanEmail)) {
    return res.status(409).json({ error: 'a user with this email already exists' });
  }
  res.status(201).json(store.create({ name: name.trim(), email: cleanEmail }));
});

// Malformed JSON and other errors
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed' || err instanceof SyntaxError) {
    return res.status(400).json({ error: 'Malformed JSON in request body' });
  }
  console.error(err);
  res.status(err.status || 500).json({ error: err.status && err.status < 500 ? err.message : 'Internal server error' });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
