# Backend

Node + Express API with an in-memory user store (data is lost on restart).

## Install & run

```bash
npm install
npm start
```

Runs on port `3000` by default; override with `PORT=4000 npm start`. `npm run dev` restarts on file changes.

## Endpoints

### GET /users
Returns `200` with a JSON array of `{ id, name, email }`.

```bash
curl http://localhost:3000/users
```

### POST /users
Body: `{ "name": "...", "email": "..." }`

```bash
curl -X POST http://localhost:3000/users \
  -H 'Content-Type: application/json' \
  -d '{"name":"Ada Lovelace","email":"ada@example.com"}'
```

Status codes:
- `201` – user created (returned with generated `id`)
- `400` – missing/non-string/empty name or email, invalid email format, or malformed JSON; body `{ "error": "..." }`
- `409` – a user with that email already exists (case-insensitive)

## CORS

Only the origin `http://localhost:5173` is allowed.
