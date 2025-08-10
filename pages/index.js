import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
const LocationSelector = dynamic(() => import('../components/LocationSelector'), { ssr: false });

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesRes, subcategoriesRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/subcategories')
      ]);

      const categoriesData = await categoriesRes.json();
      const subcategoriesData = await subcategoriesRes.json();

      setCategories(categoriesData.categories || []);
      setSubcategories(subcategoriesData.subcategories || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group subcategories by category
  const getSubcategoriesByCategory = (categoryId) => {
    return subcategories.filter(sub => sub.categoryId.toString() === categoryId.toString());
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-gray-900 to-black text-white py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-accent-500 opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Service Bridge Malappuram
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto"
            >
              Connecting you with trusted service providers in your area. Get professional services at your doorstep.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link 
                href="#services" 
                className="px-8 py-4 bg-accent-500 text-gray-900 font-semibold rounded-full shadow-lg hover:bg-accent-400 transition-all duration-300 transform hover:scale-105"
              >
                Explore Services
              </Link>
              <Link 
                href="/about" 
                className="px-8 py-4 bg-transparent border-2 border-accent-500 text-accent-500 font-semibold rounded-full hover:bg-accent-500 hover:text-gray-900 transition-all duration-300"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
          <p className="text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto mb-6 animate-fade-in">
            Your trusted platform connecting you with reliable service providers in {selectedLocation ? selectedLocation.name : 'Malappuram'}. 
            From home repairs to cleaning services, we&apos;ve got you covered.
          </p>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="py-20 bg-gradient-to-br from-accent-500 to-accent-600 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-2xl mb-10 max-w-3xl mx-auto opacity-90">
              Join thousands of satisfied customers who trust us for their service needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/contact" 
                className="inline-block px-10 py-4 bg-white text-accent-600 font-bold rounded-full shadow-2xl hover:bg-gray-100 hover:scale-105 transition-all duration-300"
              >
                Contact Us Today
              </Link>
              <Link 
                href="#services" 
                className="inline-block px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-accent-600 transition-all duration-300"
              >
                Browse Services
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Location Selector Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="py-12 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200/50 dark:border-gray-700/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Select your location to find nearby services
            </h2>
            <div className="w-full md:w-auto">
              <LocationSelector value={selectedLocation} onChange={setSelectedLocation} />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section 
        id="services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="py-20 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover a wide range of professional services available in your area
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {categories.map((category) => (
              <motion.div
                key={category._id}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {category.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {category.description}
                </p>
                
                {/* Subcategories Preview */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {getSubcategoriesByCategory(category._id).slice(0, 4).map((sub) => (
                    <motion.div
                      key={sub._id}
                      whileHover={{ scale: 1.05 }}
                      className="bg-accent-50 dark:bg-accent-900/20 rounded-lg p-3 text-center"
                    >
                      <span className="text-sm font-medium text-accent-700 dark:text-accent-300">
                        {sub.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
                
                <Link 
                  href={`/categories/${category.slug}`}
                  className="inline-block w-full text-center py-3 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  View All Services
                </Link>
              </motion.div>
            ))}
          </div>

          {/* About Preview Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="bg-gradient-to-r from-accent-500 to-accent-600 dark:from-accent-700 dark:to-accent-800 rounded-2xl shadow-xl p-8 text-white mb-16"
          >
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Why Choose Service Bridge?</h2>
              <p className="text-lg mb-6">
                We connect you with verified, professional service providers in Malappuram and surrounding areas. 
                Our platform ensures quality service delivery with transparent pricing and reliable providers.
              </p>
              <Link 
                href="/about"
                className="inline-block px-6 py-3 bg-white text-accent-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Learn More About Us
              </Link>
            </div>
          </motion.div>

          {/* How It Works Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                How It Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { 
                    title: "Select Service", 
                    description: "Browse through our categories and choose the service you need" 
                  },
                  { 
                    title: "Choose Provider", 
                    description: "View verified providers and select the one that suits your needs" 
                  },
                  { 
                    title: "Get Service", 
                    description: "Book a service and get professional help at your doorstep" 
                  }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 text-center"
                  >
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.div
        className="mt-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-10 text-center shadow-glow animate-fade-in"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Need Help Finding a Service?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Can&apos;t find what you&apos;re looking for? Contact our admin team for assistance.
        </p>
        <a
          href="tel:+919876543210"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 dark:bg-gradient-to-r dark:from-primary-500 dark:to-accent-500 dark:hover:from-primary-600 dark:hover:to-accent-600 transition-colors duration-200 shadow-glow"
        >
          Contact Admin
        </a>
      </motion.div>
    </Layout>
  );
}
