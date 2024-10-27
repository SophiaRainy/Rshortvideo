'use client';

import { AuthProvider } from '../lib/AuthContext';

export default function ClientAuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
