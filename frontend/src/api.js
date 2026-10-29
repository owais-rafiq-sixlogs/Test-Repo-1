const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/+$/, '');

async function parse(res) {
  let body = null;
  try {
    body = await res.json();
  } catch {
    // non-JSON body
  }
  if (!res.ok) {
    throw new Error((body && body.error) || `Request failed (${res.status})`);
  }
  return body;
}

export async function fetchUsers() {
  return parse(await fetch(`${API_URL}/users`));
}

export async function createUser(user) {
  return parse(
    await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
  );
}
