'use client';

import { useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import DashboardApp from '@/components/dashboard/DashboardApp';

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-coral-50 to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-manrope">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-screen overflow-hidden">
      <DashboardApp user={user} />
    </div>
  );
}