import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout';
import { useLocation } from '../../components/LocationContext';

export default function CategoryDetails() {
  const router = useRouter();
  const { slug } = router.query;
  const { selectedLocation } = useLocation();
  const [category, setCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchCategoryAndSubcategories();
    }
  }, [slug, selectedLocation]);

  const fetchCategoryAndSubcategories = async () => {
    try {
      setLoading(true);

      // Fetch category details
      const categoryResponse = await fetch(`/api/categories?slug=${slug}`);
      const categoryData = await categoryResponse.json();

      if (categoryResponse.ok && categoryData.categories.length > 0) {
        const foundCategory = categoryData.categories[0];
        setCategory(foundCategory);

        // Fetch subcategories for this category
        const subcategoriesResponse = await fetch(`/api/subcategories?categoryId=${foundCategory._id}`);
        const subcategoriesData = await subcategoriesResponse.json();

        if (subcategoriesResponse.ok) {
          // Filter subcategories by selected location if available
          let filteredSubcategories = subcategoriesData.subcategories || [];
          if (selectedLocation) {
            filteredSubcategories = filteredSubcategories.filter(sub => 
              Array.isArray(sub.locations) && sub.locations.includes(selectedLocation.slug)
            );
          }
          setSubcategories(filteredSubcategories);
        }
      } else {
        router.push('/404');
      }
    } catch (error) {
      console.error('Error fetching category data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!router.isReady) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-500"></div>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-500"
          />
        </div>
      </Layout>
    );
  }

  if (!category) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Category Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">The requested category could not be found.</p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Back to Home
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${category.name} Services - Service Bridge Malappuram`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex mb-8 text-gray-600 dark:text-gray-400"
        >
          <button
            onClick={() => router.push('/')}
            className="hover:text-accent-600 dark:hover:text-accent-400 transition-colors duration-300"
          >
            Home
          </button>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white font-medium">{category.name}</span>
        </motion.nav>

        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{category.name}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {category.description || 'Professional services in this category'}
          </p>
        </motion.div>

        {/* Subcategories Grid */}
        {subcategories.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {subcategories.map((sub) => (
              <motion.div
                key={sub._id}
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-2xl hover:border-accent-300 dark:hover:border-accent-600 transition-all duration-300"
                onClick={() => router.push(`/services/${sub.slug}`)}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {sub.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {sub.description || 'Service details coming soon...'}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-accent-600 dark:text-accent-400">
                    From ₹{sub.minCharge}
                  </span>
                  <button className="px-4 py-2 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No Services Available
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              There are currently no services available in {selectedLocation?.name || 'this location'} for this category.
            </p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Browse Other Categories
            </button>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
