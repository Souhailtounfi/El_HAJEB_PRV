import React, { useState } from 'react';
import { logout } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function AdminPanel() {
  const { user, setUser } = useAuth();
  const [msg, setMsg] = useState(null);

  async function onLogout() {
    await logout();
    setUser(null);
  }

  async function saveSiteSettings() {
    const res = await fetch((import.meta.env.VITE_API_BASE ?? 'http://localhost:8000') + '/api/site/settings', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
      body: JSON.stringify({ title: 'My Site' }),
    });
    const data = await res.json();
    setMsg(JSON.stringify(data));
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin Panel</h1>
        <button onClick={onLogout} className="rounded-xl px-4 py-2 border">Logout</button>
      </div>
      <p>Welcome, <b>{user?.name}</b> ({user?.email})</p>

      <div className="space-y-2">
        <button onClick={saveSiteSettings} className="rounded-xl px-4 py-2 bg-black text-white">
          Save Site Settings
        </button>
        {msg && <pre className="bg-gray-100 p-3 rounded-lg text-sm">{msg}</pre>}
      </div>
    </div>
  );
}
