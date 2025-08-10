import dbConnect from '../../lib/mongodb';
import Booking from '../../models/Booking';
import Subcategory from '../../models/Subcategory';
import { withAuth } from '../../lib/auth';

async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      return getBookings(req, res);
    case 'POST':
      return createBooking(req, res);
    case 'PUT':
      return updateBooking(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function getBookings(req, res) {
  try {
    const bookings = await Booking.find({})
      .populate('subcategoryId', 'name slug')
      .sort({ createdAt: -1 });
    
    res.status(200).json({ bookings });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function createBooking(req, res) {
  try {
    const { subcategoryId, userName, phone, location, notes } = req.body;

    if (!subcategoryId || !userName || !phone || !location) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Verify subcategory exists
    const subcategory = await Subcategory.findById(subcategoryId);
    if (!subcategory) {
      return res.status(404).json({ error: 'Service not found' });
    }

    const booking = new Booking({
      subcategoryId,
      userName,
      phone,
      location,
      notes,
      status: 'Pending'
    });

    await booking.save();
    await booking.populate('subcategoryId', 'name slug');
    
    res.status(201).json({ booking, message: 'Booking created successfully' });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateBooking(req, res) {
  try {
    const { id, status, notes } = req.body;

    if (!id || !status) {
      return res.status(400).json({ error: 'ID and status are required' });
    }

    if (!['Pending', 'In Progress', 'Completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status, notes },
      { new: true }
    ).populate('subcategoryId', 'name slug');

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.status(200).json({ booking });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export default function BookingsApi(req, res) {
  if (req.method === 'POST' && !req.url.includes('/admin/')) {
    // Allow public booking creation
    return handler(req, res);
  }
  return withAuth(handler)(req, res);
}
