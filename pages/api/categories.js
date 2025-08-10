import dbConnect from '../../lib/mongodb';
import Category from '../../models/Category';
import { withAuth } from '../../lib/auth';
import { slugify } from '../../utils/slugify';

async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      return getCategories(req, res);
    case 'POST':
      return createCategory(req, res);
    case 'PUT':
      return updateCategory(req, res);
    case 'DELETE':
      return deleteCategory(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function getCategories(req, res) {
  try {
    const { slug } = req.query;
    
    let query = {};
    if (slug) {
      query.slug = slug;
    }
    
    const categories = await Category.find(query).sort({ createdAt: -1 });
    res.status(200).json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function createCategory(req, res) {
  try {
    const { name, description, locations } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const slug = slugify(name);
    const category = new Category({ name, slug, description, locations });
    await category.save();

    res.status(201).json({ category });
  } catch (error) {
    console.error('Create category error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Category with this name already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateCategory(req, res) {
  try {
    const { id, name, description, locations } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Category ID is required' });
    }

    const updates = { name, description, locations };
    if (name) updates.slug = slugify(name);

    const category = await Category.findByIdAndUpdate(id, updates, { new: true });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json({ category });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteCategory(req, res) {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }

    const category = await Category.findByIdAndDelete(id);
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export default function CategoriesApi(req, res) {
  if (req.method === 'GET') {
    return handler(req, res);
  }
  return withAuth(handler)(req, res);
}
