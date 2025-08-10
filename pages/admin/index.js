import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminIndex() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated, redirect accordingly
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/check-auth');
        if (response.ok) {
          router.push('/admin/dashboard');
        } else {
          router.push('/admin/login');
        }
      } catch (error) {
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>
  );
}
