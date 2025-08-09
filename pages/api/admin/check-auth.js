import { verifyToken } from '../../../lib/auth';
import dbConnect from '../../../lib/mongodb';
import Admin from '../../../models/Admin';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = req.cookies.adminToken;
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    await dbConnect();
    const admin = await Admin.findById(decoded.adminId).select('-passwordHash');
    
    if (!admin) {
      return res.status(401).json({ error: 'Admin not found' });
    }

    res.status(200).json({ 
      success: true, 
      admin: { id: admin._id, username: admin.username }
    });
  } catch (error) {
    console.error('Auth check error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
