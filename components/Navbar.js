'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';
import { useLocation } from './LocationContext';

// Dynamically import client-side components with SSR disabled
const LocationSelector = dynamic(() => import('./LocationSelector'), { 
  ssr: false,
  loading: () => (
    <select className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
      <option>Loading locations...</option>
    </select>
  )
});

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { selectedLocation, setSelectedLocation } = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Set initial scroll state
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set mounted state after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything on the server to prevent hydration mismatches
  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-white dark:bg-gray-900" />
    );
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl border-b border-accent-200/30 dark:border-accent-700/30'
          : 'bg-gradient-to-r from-black/20 to-transparent backdrop-blur-sm'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-xl">SB</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-accent-600 dark:text-accent-400 group-hover:text-accent-500 transition-colors">
                  Service Bridge
                </span>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Malappuram
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="w-48">
              <LocationSelector value={selectedLocation} onChange={setSelectedLocation} />
            </div>
            <Link
              href="/"
              className="relative text-gray-700 dark:text-gray-300 hover:text-accent-600 dark:hover:text-accent-400 transition-all duration-300 font-semibold text-lg group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/about"
              className="relative text-gray-700 dark:text-gray-300 hover:text-accent-600 dark:hover:text-accent-400 transition-all duration-300 font-semibold text-lg group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/contact"
              className="relative text-gray-700 dark:text-gray-300 hover:text-accent-600 dark:hover:text-accent-400 transition-all duration-300 font-semibold text-lg group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-accent-600 dark:hover:text-accent-400 hover:bg-accent-100 dark:hover:bg-accent-900/30 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-accent-600 dark:hover:text-accent-400 hover:bg-accent-100 dark:hover:bg-accent-900/30 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-accent-600 dark:hover:text-accent-400 hover:bg-accent-100 dark:hover:bg-accent-900/30 rounded-xl transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-accent-200/30 dark:border-accent-700/30 shadow-2xl"
            >
          <div className="px-4 pt-4 pb-6 space-y-4">
            <div className="mb-4">
              <LocationSelector value={selectedLocation} onChange={setSelectedLocation} />
            </div>
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-700 dark:text-gray-300 hover:text-accent-600 dark:hover:text-accent-400 hover:bg-accent-50 dark:hover:bg-accent-900/20 px-4 py-3 rounded-xl text-lg font-semibold transition-all duration-300"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-700 dark:text-gray-300 hover:text-accent-600 dark:hover:text-accent-400 hover:bg-accent-50 dark:hover:bg-accent-900/20 px-4 py-3 rounded-xl text-lg font-semibold transition-all duration-300"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-700 dark:text-gray-300 hover:text-accent-600 dark:hover:text-accent-400 hover:bg-accent-50 dark:hover:bg-accent-900/20 px-4 py-3 rounded-xl text-lg font-semibold transition-all duration-300"
            >
              Contact
            </Link>
            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
