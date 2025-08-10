import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function BookingSuccess({ booking, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
            <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Booking Confirmed!
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your booking for <strong>{booking.subcategoryId?.name}</strong> has been submitted successfully.
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6 text-left">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Booking Details:</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li><strong>Service:</strong> {booking.subcategoryId?.name}</li>
              <li><strong>Customer:</strong> {booking.userName}</li>
              <li><strong>Phone:</strong> {booking.phone}</li>
              <li><strong>Status:</strong> {booking.status}</li>
            </ul>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mb-6">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>What&apos;s next?</strong><br />
              Our admin team will contact you within 2-4 hours to confirm the booking and provide further details.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
