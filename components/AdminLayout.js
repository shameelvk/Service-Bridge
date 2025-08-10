import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function AdminLayout({ children, title = "Admin Dashboard - Service Bridge Malappuram" }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/check-auth');
      if (response.ok) {
        const data = await response.json();
        setAdmin(data.admin);
      } else {
        router.push('/admin/login');
      }
    } catch (error) {
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Admin Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Service Bridge Admin
                </h1>
                {admin && (
                  <span className="ml-4 text-sm text-gray-600 dark:text-gray-400">
                    Welcome, {admin.username}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {theme === 'dark' ? (
                    <SunIcon className="h-5 w-5" />
                  ) : (
                    <MoonIcon className="h-5 w-5" />
                  )}
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="py-6">
          {children}
        </main>
      </div>
    </>
  );
}
