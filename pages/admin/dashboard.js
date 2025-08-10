import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import CategoryManagement from '../../components/CategoryManagement';
import SubcategoryManagement from '../../components/SubcategoryManagement';
import ProviderManagement from '../../components/ProviderManagement';
import LocationManagement from '../../components/LocationManagement';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [providers, setProviders] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('bookings');
  const [newBookings, setNewBookings] = useState(0);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [bookingsRes, categoriesRes, subcategoriesRes, providersRes, locationsRes] = await Promise.all([
        fetch('/api/bookings'),
        fetch('/api/categories'),
        fetch('/api/subcategories'),
        fetch('/api/providers'),
        fetch('/api/locations')
      ]);

      const [bookingsData, categoriesData, subcategoriesData, providersData, locationsData] = await Promise.all([
        bookingsRes.json(),
        categoriesRes.json(),
        subcategoriesRes.json(),
        providersRes.json(),
        locationsRes.json()
      ]);

      setBookings(bookingsData.bookings || []);
      setCategories(categoriesData.categories || []);
      setSubcategories(subcategoriesData.subcategories || []);
      setProviders(providersData.providers || []);
      setLocations(locationsData.locations || []);

      // Count new bookings (pending status)
      const pending = (bookingsData.bookings || []).filter(b => b.status === 'Pending').length;
      setNewBookings(pending);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/check-auth');
      if (!response.ok) {
        router.push('/admin/login');
        return;
      }
      fetchData();
    } catch (error) {
      router.push('/admin/login');
    }
  }, [router, fetchData]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (activeTab) {
      fetchData();
    }
  }, [activeTab, fetchData]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: bookingId, status }),
      });

      if (response.ok) {
        fetchData(); // Refresh data
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Admin Dashboard - Service Bridge Malappuram">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            {newBookings > 0 && (
              <div className="mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                  {newBookings} New Booking{newBookings > 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Bookings</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{bookings.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Categories</h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{categories.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Services</h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{subcategories.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Providers</h3>
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{providers.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Locations</h3>
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{locations.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {[
              { id: 'bookings', name: 'Bookings', count: bookings.length },
              { id: 'categories', name: 'Categories', count: categories.length },
              { id: 'subcategories', name: 'Services', count: subcategories.length },
              { id: 'providers', name: 'Providers', count: providers.length },
              { id: 'locations', name: 'Locations', count: locations.length },
              { id: 'contact-messages', name: 'Contact Messages', count: 0 }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.name} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'bookings' && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Recent Bookings
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {booking.userName}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {booking.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {booking.subcategoryId?.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <select
                          value={booking.status}
                          onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
                          className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm dark:bg-gray-700 dark:text-white"
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <CategoryManagement categories={categories} onRefresh={fetchData} />
          </div>
        )}

        {activeTab === 'subcategories' && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <SubcategoryManagement 
              subcategories={subcategories} 
              categories={categories} 
              onRefresh={fetchData} 
            />
          </div>
        )}

        {activeTab === 'providers' && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <ProviderManagement 
              providers={providers} 
              subcategories={subcategories} 
              onRefresh={fetchData} 
            />
          </div>
        )}

        {activeTab === 'locations' && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <LocationManagement />
          </div>
        )}

        {activeTab === 'contact-messages' && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Contact Messages
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                      No contact messages yet. Messages from the contact form will appear here.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
