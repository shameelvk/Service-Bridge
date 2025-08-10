import dbConnect from '../../lib/mongodb';
import Subcategory from '../../models/Subcategory';
import { withAuth } from '../../lib/auth';
import { slugify } from '../../utils/slugify';

async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      return getSubcategories(req, res);
    case 'POST':
      return createSubcategory(req, res);
    case 'PUT':
      return updateSubcategory(req, res);
    case 'DELETE':
      return deleteSubcategory(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function getSubcategories(req, res) {
  try {
    const { categoryId } = req.query;
    
    let query = {};
    if (categoryId) {
      query.categoryId = categoryId;
    }

    const subcategories = await Subcategory.find(query)
      .populate('categoryId', 'name slug')
      .sort({ createdAt: -1 });
    
    res.status(200).json({ subcategories });
  } catch (error) {
    console.error('Get subcategories error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function createSubcategory(req, res) {
  try {
    let { categoryId, name, description, rates, minCharge, locations, location } = req.body;

    if (!categoryId || !name || !minCharge) {
      return res.status(400).json({ error: 'Category ID, name, and minimum charge are required' });
    }

    const slug = slugify(name);
    
    const existingSubcategory = await Subcategory.findOne({ slug });
    if (existingSubcategory) {
      return res.status(400).json({ error: 'Subcategory with this name already exists' });
    }

    // Support both old and new format
    if (!locations && location) locations = [location];
    if (!locations || locations.length === 0) locations = ['Malappuram'];

    const subcategory = new Subcategory({
      categoryId,
      name,
      slug,
      description,
      rates: rates || [],
      minCharge: Number(minCharge),
      locations
    });

    await subcategory.save();
    await subcategory.populate('categoryId', 'name slug');
    
    res.status(201).json({ subcategory });
  } catch (error) {
    console.error('Create subcategory error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateSubcategory(req, res) {
  try {
    const { id, categoryId, name, description, rates, minCharge, location } = req.body;

    if (!id || !categoryId || !name || !minCharge) {
      return res.status(400).json({ error: 'ID, category ID, name, and minimum charge are required' });
    }

    const slug = slugify(name);

    // Support both old and new format
    if (!locations && location) locations = [location];
    if (!locations || locations.length === 0) locations = ['Malappuram'];

    const update = {
      categoryId,
      name,
      description,
      rates: rates || [],
      minCharge: Number(minCharge),
      locations,
      slug
    };

    const updated = await Subcategory.findByIdAndUpdate(id, update, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }

    res.status(200).json({ subcategory: updated });
  } catch (error) {
    console.error('Update subcategory error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteSubcategory(req, res) {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }

    const subcategory = await Subcategory.findByIdAndDelete(id);
    
    if (!subcategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }

    res.status(200).json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    console.error('Delete subcategory error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export default function SubcategoriesApi(req, res) {
  if (req.method === 'GET') {
    return handler(req, res);
  }
  return withAuth(handler)(req, res);
}
