'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      setError('Invalid credentials. Please try again.');
      setLoading(false);
      return;
    }

    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-ute-bg flex items-center justify-center px-6">
      <div
        className="w-full max-w-md rounded-2xl border border-ute-border bg-ute-surface p-8"
        style={{ boxShadow: '0 0 60px rgba(201, 168, 76, 0.08), 0 0 120px rgba(201, 168, 76, 0.04)' }}
      >
        <div className="mb-8">
          <p className="font-mono text-[10px] tracking-widest uppercase text-ute-gold mb-2">
            UTE Admin
          </p>
          <h1 className="font-playfair text-2xl font-bold text-ute-text">Sign In</h1>
          <p className="mt-1 text-sm text-ute-text-muted">
            Access the portfolio content management system.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  );
}
