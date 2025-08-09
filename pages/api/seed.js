import dbConnect from '../../lib/mongodb';
import Category from '../../models/Category';
import Subcategory from '../../models/Subcategory';
import Admin from '../../models/Admin';
import Location from '../../models/Location';
import Provider from '../../models/Provider';
import { hashPassword } from '../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();

    // Clear existing data
    await Category.deleteMany({});
    await Subcategory.deleteMany({});
    await Admin.deleteMany({});
    await Location.deleteMany({});

    // Create admin user
    const adminPassword = await hashPassword('admin123');
    const admin = new Admin({
      username: 'admin',
      passwordHash: adminPassword
    });
    await admin.save();

    // Create locations
    const locations = [
      {
        name: 'Malappuram',
        slug: 'malappuram',
        district: 'Malappuram',
        state: 'Kerala',
        pincode: '676505',
        description: 'Malappuram district location'
      }
    ];

    await Location.insertMany(locations);

    // Create providers
    const providers = [
      {
        name: 'John Plumbing Services',
        phone: '+919876543210',
        subcategoryIds: [],
        locations: ['malappuram'],
        isActive: true
      },
      {
        name: 'ABC Electrical Solutions',
        phone: '+919876543211',
        subcategoryIds: [],
        locations: ['malappuram'],
        isActive: true
      }
    ];

    await Provider.insertMany(providers);

    // Create categories
    const categories = [
      {
        name: 'Home Services',
        slug: 'home-services',
        description: 'Essential home maintenance and repair services',
        locations: ['malappuram']
      },
      {
        name: 'Cleaning Services',
        slug: 'cleaning-services',
        description: 'Professional cleaning services for home and office',
        locations: ['malappuram']
      },
      {
        name: 'Appliance Repair',
        slug: 'appliance-repair',
        description: 'Expert repair services for home appliances',
        locations: ['malappuram']
      }
    ];

    const createdCategories = await Category.insertMany(categories);

    // Create subcategories
    const subcategories = [
      // Home Services
      {
        categoryId: createdCategories[0]._id,
        name: 'Plumbing Services',
        slug: 'plumbing-services',
        description: 'Professional plumbing repair and installation services',
        rates: ['Tap repair: ₹200-500', 'Pipe leak fixing: ₹300-800', 'Toilet repair: ₹400-1000'],
        minCharge: 200,
        locations: ['malappuram']
      },
      {
        categoryId: createdCategories[0]._id,
        name: 'Electrical Services',
        slug: 'electrical-services',
        description: 'Safe and reliable electrical repair and installation',
        rates: ['Switch/Socket repair: ₹150-400', 'Fan installation: ₹300-600', 'Wiring work: ₹500-2000'],
        minCharge: 150,
        locations: ['malappuram']
      },
      // Cleaning Services
      {
        categoryId: createdCategories[1]._id,
        name: 'Sofa Cleaning',
        slug: 'sofa-cleaning',
        description: 'Deep cleaning and sanitization of sofas and upholstery',
        rates: ['2-seater sofa: ₹800-1200', '3-seater sofa: ₹1200-1800', 'L-shaped sofa: ₹1500-2500'],
        minCharge: 800,
        locations: ['malappuram']
      },
      {
        categoryId: createdCategories[1]._id,
        name: 'House Cleaning',
        slug: 'house-cleaning',
        description: 'Complete house cleaning and maintenance',
        rates: ['1BHK: ₹1500-2500', '2BHK: ₹2500-4000', '3BHK: ₹4000-6000'],
        minCharge: 1500,
        locations: ['malappuram']
      },
      // Appliance Repair
      {
        categoryId: createdCategories[2]._id,
        name: 'AC Repair',
        slug: 'ac-repair',
        description: 'Professional AC repair, service, and maintenance',
        rates: ['AC service: ₹800-1500', 'Gas refill: ₹2000-3500', 'Compressor repair: ₹3000-8000'],
        minCharge: 800,
        locations: ['malappuram']
      }
    ];

    await Subcategory.insertMany(subcategories);

    res.status(200).json({ 
      message: 'Database seeded successfully',
      admin: { username: 'admin', password: 'admin123' }
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
