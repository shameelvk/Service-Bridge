import dbConnect from '../../lib/mongodb';
import Location from '../../models/Location';
import { verifyToken } from '../../lib/auth';

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case 'GET': {
      // Get all locations
      const locations = await Location.find({ isActive: true });
      return res.status(200).json({ success: true, locations });
    }
    case 'POST': {
      // Admin only: Add new location
      try {
        await verifyToken(req, res);
        const { name, slug, district, state, pincode, description } = req.body;
        
        // Validate required fields
        if (!name || !slug || !district) {
          return res.status(400).json({ 
            success: false, 
            message: 'Name, slug, and district are required fields' 
          });
        }
        
        // Check if slug already exists
        const existingLocation = await Location.findOne({ slug });
        if (existingLocation) {
          return res.status(400).json({ 
            success: false, 
            message: 'A location with this slug already exists' 
          });
        }
        
        const location = await Location.create({ 
          name, 
          slug: slug.toLowerCase(), 
          district, 
          state: state || 'Kerala', 
          pincode, 
          description 
        });
        return res.status(201).json({ success: true, location });
      } catch (e) {
        console.error('Location creation error:', e);
        if (e.name === 'ValidationError') {
          return res.status(400).json({ 
            success: false, 
            message: 'Validation error: ' + Object.values(e.errors).map(err => err.message).join(', ')
          });
        }
        if (e.code === 11000) {
          return res.status(400).json({ 
            success: false, 
            message: 'Location with this slug already exists' 
          });
        }
        return res.status(500).json({ 
          success: false, 
          message: e.message || 'Failed to create location' 
        });
      }
    }
    case 'PUT': {
      // Admin only: Update location
      try {
        await verifyToken(req, res);
        const { id, ...updates } = req.body;
        const location = await Location.findByIdAndUpdate(id, updates, { new: true });
        return res.status(200).json({ success: true, location });
      } catch (e) {
        return res.status(401).json({ success: false, message: e.message });
      }
    }
    case 'DELETE': {
      // Admin only: Delete location
      try {
        await verifyToken(req, res);
        const { id } = req.body;
        await Location.findByIdAndDelete(id);
        return res.status(200).json({ success: true });
      } catch (e) {
        return res.status(401).json({ success: false, message: e.message });
      }
    }
    default:
      return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
