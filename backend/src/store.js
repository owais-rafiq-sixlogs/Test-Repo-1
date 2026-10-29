const { randomUUID } = require('crypto');

const users = [];

function list() {
  return users;
}

function findByEmail(email) {
  const key = email.toLowerCase();
  return users.find((u) => u.email.toLowerCase() === key);
}

function create({ name, email }) {
  const user = { id: randomUUID(), name, email };
  users.push(user);
  return user;
}

module.exports = { list, findByEmail, create };
