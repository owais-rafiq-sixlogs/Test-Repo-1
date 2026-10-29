import { useCallback, useEffect, useState } from 'react';
import { fetchUsers, createUser } from './api.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function AddUserForm({ onAdded }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const n = name.trim();
    const em = email.trim();
    if (!n) return setError('Name is required.');
    if (!em) return setError('Email is required.');
    if (!EMAIL_RE.test(em)) return setError('Please enter a valid email address.');

    setError(null);
    setSubmitting(true);
    try {
      await createUser({ name: n, email: em });
      setName('');
      setEmail('');
      await onAdded();
    } catch (err) {
      setError(err.message || 'Failed to add user.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit} noValidate>
      <h2>Add user</h2>
      <label>
        Name
        <input value={name} onChange={(e) => setName(e.target.value)} disabled={submitting} />
      </label>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
        />
      </label>
      {error && <p className="error" role="alert">{error}</p>}
      <button type="submit" disabled={submitting}>
        {submitting ? 'Adding…' : 'Add user'}
      </button>
    </form>
  );
}

function UsersList({ users, loading, error, onRetry }) {
  if (loading) return <p className="muted">Loading users…</p>;
  if (error) {
    return (
      <div className="error" role="alert">
        <p>Failed to load users: {error}</p>
        <button onClick={onRetry}>Retry</button>
      </div>
    );
  }
  if (users.length === 0) return <p className="muted">No users yet. Add one above.</p>;
  return (
    <ul className="users">
      {users.map((u) => (
        <li key={u.id}>
          <strong>{u.name}</strong>
          <span>{u.email}</span>
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setUsers(await fetchUsers());
    } catch (err) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <main>
      <h1>Users</h1>
      <AddUserForm onAdded={load} />
      <section className="card">
        <h2>All users</h2>
        <UsersList users={users} loading={loading} error={error} onRetry={load} />
      </section>
    </main>
  );
}
