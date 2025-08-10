import Layout from '../components/Layout';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <Layout 
      title="About Service Bridge Malappuram" 
      description="Learn about our mission to connect you with trusted service providers in Malappuram and surrounding areas"
    >
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-24 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-accent-500/10 to-accent-400/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-500/20 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              About Service Bridge
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl max-w-3xl mx-auto"
            >
              Connecting communities with trusted service providers since 2024
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="py-16 bg-white dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                At Service Bridge Malappuram, we&apos;re dedicated to bridging the gap between 
                service seekers and providers in the Malappuram district and surrounding areas. 
                Our mission is to make professional services accessible, reliable, and affordable 
                for everyone in the community.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                We believe in empowering local service providers while ensuring quality service 
                delivery to our customers. Through our platform, we&apos;re building a stronger, 
                more connected community where trust and professionalism go hand in hand.
              </p>
            </motion.div>
            <motion.div
              key={0}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-accent-500/20 transition-all duration-500"
            >
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: "500+", label: "Verified Providers" },
                  { number: "50+", label: "Service Categories" },
                  { number: "1000+", label: "Happy Customers" },
                  { number: "24/7", label: "Support Available" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-accent-600 dark:text-accent-400 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We&apos;ve designed our platform to provide the best experience for both service seekers and providers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Verified Providers",
                description: "All our service providers go through a rigorous verification process to ensure quality and reliability."
              },
              {
                title: "Transparent Pricing",
                description: "Clear and upfront pricing with no hidden charges. Compare prices and choose what works best for you."
              },
              {
                title: "24/7 Support",
                description: "Our customer support team is available round the clock to assist you with any queries or issues."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Process Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="py-16 bg-white dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Process
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Getting professional services has never been easier
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Browse", description: "Explore our wide range of service categories" },
              { step: "2", title: "Select", description: "Choose the service that matches your needs" },
              { step: "3", title: "Book", description: "Schedule a convenient time for service delivery" },
              { step: "4", title: "Enjoy", description: "Experience quality service at your doorstep" }
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="text-center relative"
              >
                {index < 3 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-1 bg-gradient-to-r from-accent-300 to-accent-500 dark:from-accent-600 dark:to-accent-400 rounded-full"></div>
                )}
                <div className="w-20 h-20 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6 shadow-lg">
                  {process.step}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {process.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {process.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </Layout>
  );
}
