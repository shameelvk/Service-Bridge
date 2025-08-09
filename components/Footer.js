import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent-500/5 to-accent-400/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-500/10 via-transparent to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {/* Brand Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">SB</span>
              </div>
              <h3 className="text-2xl font-bold text-accent-400">Service Bridge</h3>
            </div>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              Connecting you with trusted service providers in Malappuram and beyond. 
              Quality services at your doorstep.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-accent-400 transition-all duration-300 hover:scale-110">
                <span className="sr-only">Facebook</span>
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-accent-400 transition-all duration-300 hover:scale-110">
                <span className="sr-only">Twitter</span>
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-accent-400 transition-all duration-300 hover:scale-110">
                <span className="sr-only">Instagram</span>
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323C6.001 8.198 7.152 7.708 8.449 7.708s2.448.49 3.323 1.418c.926.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-10.279c-.49 0-.875-.385-.875-.875s.385-.875.875-.875.875.385.875.875-.385.875-.875.875zm-7.718 8.736c.875 0 1.663-.332 2.243-.912.58-.58.912-1.368.912-2.243s-.332-1.663-.912-2.243c-.58-.58-1.368-.912-2.243-.912s-1.663.332-2.243.912c-.58.58-.912 1.368-.912 2.243s.332 1.663.912 2.243c.58.58 1.368.912 2.243.912z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-accent-400">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="text-gray-300 hover:text-accent-400 transition-all duration-300 text-lg font-medium hover:translate-x-1">Home</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-accent-400 transition-all duration-300 text-lg font-medium hover:translate-x-1">About</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-accent-400 transition-all duration-300 text-lg font-medium hover:translate-x-1">Contact</Link></li>
              <li><Link href="/categories" className="text-gray-300 hover:text-accent-400 transition-all duration-300 text-lg font-medium hover:translate-x-1">All Services</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-accent-400">Popular Services</h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-gray-300 hover:text-accent-400 transition-all duration-300 text-lg font-medium hover:translate-x-1">Home Cleaning</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-accent-400 transition-all duration-300 text-lg font-medium hover:translate-x-1">AC Repair</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-accent-400 transition-all duration-300 text-lg font-medium hover:translate-x-1">Plumbing</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-accent-400 transition-all duration-300 text-lg font-medium hover:translate-x-1">Electrical Work</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-accent-400">Contact Info</h3>
            <div className="space-y-4">
              <p className="text-gray-300 flex items-center text-lg">
                <div className="w-8 h-8 bg-accent-500/20 rounded-lg flex items-center justify-center mr-3">
                  <svg className="h-5 w-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                +91 98765 43210
              </p>
              <p className="text-gray-300 flex items-center text-lg">
                <div className="w-8 h-8 bg-accent-500/20 rounded-lg flex items-center justify-center mr-3">
                  <svg className="h-5 w-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                support@servicebridge.in
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-accent-500/20 pt-10 mt-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-lg">
              2024 Service Bridge Malappuram. All rights reserved.
            </p>
            <div className="flex space-x-8 mt-6 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-accent-400 text-lg transition-all duration-300 hover:scale-105">Privacy Policy</Link>
              <Link href="#" className="text-gray-400 hover:text-accent-400 text-lg transition-all duration-300 hover:scale-105">Terms of Service</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
