import dbConnect from '../../../lib/mongodb';
import Subcategory from '../../../models/Subcategory';
import Category from '../../../models/Category';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();
    
    const { slug } = req.query;
    
    const subcategory = await Subcategory.findOne({ slug })
      .populate('categoryId', 'name slug');
    
    if (!subcategory) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    res.status(200).json({ subcategory });
  } catch (error) {
    console.error('Get subcategory error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
