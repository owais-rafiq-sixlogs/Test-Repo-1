# Frontend (React + Vite)

A small UI for listing and adding users against the Express backend.

## Prerequisites
The backend (`/backend`) must be running, by default at http://localhost:3000 (CORS allows http://localhost:5173).

## Install
```
npm install
```

## Run (development)
```
npm run dev
```
Open http://localhost:5173 (the port is fixed; the server fails if it is taken).

## Build / preview
```
npm run build
npm run preview
```

## Configuration
The API base URL is read from `VITE_API_URL` (default `http://localhost:3000`).
Copy `.env.example` to `.env` and edit it:
```
VITE_API_URL=http://localhost:3000
```
