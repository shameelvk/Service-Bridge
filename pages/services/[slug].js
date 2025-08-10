import { useState, useEffect, useCallback, useContext } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout';
import BookingForm from '../../components/BookingForm';
import { useLocation } from '../../components/LocationContext';

export default function ServiceDetails() {
  const router = useRouter();
  const { slug } = router.query;
  const { selectedLocation } = useLocation();
  const [subcategory, setSubcategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const fetchSubcategory = useCallback(async () => {
    try {
      const response = await fetch(`/api/subcategories/${slug}`);
      const data = await response.json();
      
      if (response.ok) {
        // Check if service is available in selected location
        if (selectedLocation && data.subcategory) {
          const isAvailable = Array.isArray(data.subcategory.locations) 
            ? data.subcategory.locations.includes(selectedLocation.slug)
            : data.subcategory.location === selectedLocation.slug;
          
          if (!isAvailable) {
            // Redirect to home page if service not available in selected location
            router.push('/');
            return;
          }
        }
        setSubcategory(data.subcategory);
      }
    } catch (error) {
      console.error('Error fetching subcategory:', error);
    } finally {
      setLoading(false);
    }
  }, [slug, selectedLocation, router]);

  useEffect(() => {
    if (slug) {
      fetchSubcategory();
    }
  }, [slug, fetchSubcategory]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="rounded-full h-32 w-32 border-b-2 border-accent-600"
          />
        </div>
      </Layout>
    );
  }

  if (!subcategory) {
    return (
      <Layout title="Service Not Found">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Service Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            The service you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Back to Home
          </motion.button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title={`${subcategory.name} - Service Bridge Malappuram`}
      description={`${subcategory.description} Starting from ₹${subcategory.minCharge}. Book now in Malappuram.`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                onClick={() => router.push('/')} 
                className="hover:text-accent-600 dark:hover:text-accent-400"
              >
                Home
              </motion.button>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">
              {subcategory.name}
            </li>
          </ol>
        </nav>

        {/* Service Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {subcategory.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {subcategory.description}
              </p>
              <div className="mt-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-200">
                  Available in: {Array.isArray(subcategory.locations) ? subcategory.locations.join(', ') : subcategory.location}
                </div>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <div className="text-3xl font-bold text-accent-600 dark:text-accent-400">
                ₹{subcategory.minCharge}+
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Starting price
              </div>
            </div>
          </div>
        </div>

        {/* Rates Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Service Rates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subcategory.rates.map((rate, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-700 dark:text-gray-300">{rate}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-accent-50 dark:bg-accent-900/20 rounded-lg">
            <p className="text-sm text-accent-800 dark:text-accent-200">
              <strong>Note:</strong> Minimum charge is ₹{subcategory.minCharge}. Final pricing may vary based on the complexity of work and materials required.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowBookingForm(true)}
            className="flex-1 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-accent-600 hover:to-accent-700 transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Book Now
          </motion.button>
          <a
            href="tel:+919876543210"
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Contact Admin
          </a>
        </div>

        {/* Booking Form Modal */}
        {showBookingForm && (
          <BookingForm
            subcategory={subcategory}
            onClose={() => setShowBookingForm(false)}
            onSuccess={() => {
              setShowBookingForm(false);
              // Show success message or redirect
            }}
          />
        )}
      </div>
    </Layout>
  );
}
