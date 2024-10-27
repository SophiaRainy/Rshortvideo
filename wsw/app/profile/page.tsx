'use client';

import { useAuth } from '../../lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import BottomNav from '../../components/BottomNav';

export default function Profile() {
  const { user } = useAuth();
  const router = useRouter();
  const [avatar, setAvatar] = useState('/default-avatar.png');

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <img 
                src={avatar} 
                alt="User Avatar" 
                className="w-32 h-32 rounded-full border-4 border-blue-500"
              />
              <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </label>
              <input 
                id="avatar-upload" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleAvatarChange}
              />
            </div>
            <h1 className="text-2xl font-bold mb-2">欢迎, {user}!</h1>
            <p className="text-gray-600 mb-4">这是您的个人资料页面</p>
            {/* 这里可以添加更多用户相关的内容 */}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
