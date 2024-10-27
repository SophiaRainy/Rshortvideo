'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/AuthContext';
import BottomNav from '../../components/BottomNav';
import Link from 'next/link';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        login(username);
        router.push('/');
      } else {
        const data = await response.json();
        setError(data.message || '登录失败');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '登录过程中出现错误');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
          <h3 className="text-2xl font-bold text-center">登录账户</h3>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <div>
                <label className="block" htmlFor="username">用户名</label>
                <input
                  type="text"
                  placeholder="用户名"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block" htmlFor="password">密码</label>
                <input
                  type="password"
                  placeholder="密码"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-baseline justify-between">
                <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">登录</button>
                <Link href="/register" className="text-sm text-blue-600 hover:underline">没有账户？注册</Link>
              </div>
            </div>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
