import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function BookingSuccess() {
  const router = useRouter();

  return (
    <Layout 
      title="Booking Successful - Service Bridge Malappuram"
      description="Your service booking has been submitted successfully. We will contact you shortly."
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="mb-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-accent-100 dark:bg-accent-900/30">
            <svg className="h-8 w-8 text-accent-600 dark:text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Booking Successful!
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Thank you for choosing Service Bridge Malappuram. Your booking has been submitted successfully.
        </p>

        <div className="bg-accent-50 dark:bg-accent-900/20 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-accent-900 dark:text-accent-100 mb-2">
            What happens next?
          </h2>
          <ul className="text-left text-accent-800 dark:text-accent-200 space-y-2">
            <li>• Our admin team will review your booking</li>
            <li>• We'll contact you within 2-4 hours to confirm details</li>
            <li>• A qualified service provider will be assigned</li>
            <li>• You'll receive updates on your booking status</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl hover:from-accent-600 hover:to-accent-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Browse More Services
          </button>
          <a
            href="tel:+919876543210"
            className="px-6 py-3 border border-accent-600 text-accent-600 dark:text-accent-400 rounded-xl hover:bg-accent-50 dark:hover:bg-accent-900/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Contact Admin
          </a>
        </div>
      </div>
    </Layout>
  );
}
