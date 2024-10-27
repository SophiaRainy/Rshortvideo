'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../lib/AuthContext';

const BottomNav: React.FC = () => {
  const { user } = useAuth();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-lg text-apple-white p-4">
      <ul className="flex justify-around">
        <li>
          <Link href="/">首页</Link>
        </li>
        <li>
          <Link href="/discover">发现</Link>
        </li>
        <li>
          {user ? (
            <Link href="/profile">我的</Link>
          ) : (
            <>
              <Link href="/login">登录</Link>
              <span className="mx-2">|</span>
              <Link href="/register">注册</Link>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default BottomNav;
