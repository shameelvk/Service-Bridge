import dbConnect from '../../lib/mongodb';
import Provider from '../../models/Provider';
import { withAuth } from '../../lib/auth';

async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      return getProviders(req, res);
    case 'POST':
      return createProvider(req, res);
    case 'PUT':
      return updateProvider(req, res);
    case 'DELETE':
      return deleteProvider(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function getProviders(req, res) {
  try {
    const providers = await Provider.find({})
      .populate('subcategoryIds', 'name slug')
      .sort({ createdAt: -1 });
    
    res.status(200).json({ providers });
  } catch (error) {
    console.error('Get providers error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function createProvider(req, res) {
  try {
    const { name, phone, subcategoryIds, locations, isActive } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }

    // Support both old and new format
    let providerLocations = locations;
    if (!providerLocations || providerLocations.length === 0) providerLocations = ['Malappuram'];

    const provider = new Provider({
      name,
      phone,
      subcategoryIds: subcategoryIds || [],
      locations: providerLocations,
      isActive: isActive !== undefined ? isActive : true
    });

    await provider.save();
    await provider.populate('subcategoryIds', 'name slug');
    
    res.status(201).json({ provider });
  } catch (error) {
    console.error('Create provider error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateProvider(req, res) {
  try {
    const { id, name, phone, subcategoryIds, location, isActive } = req.body;

    if (!id || !name || !phone) {
      return res.status(400).json({ error: 'ID, name, and phone are required' });
    }

    const provider = await Provider.findByIdAndUpdate(
      id,
      {
        name,
        phone,
        subcategoryIds: subcategoryIds || [],
        location,
        isActive
      },
      { new: true }
    ).populate('subcategoryIds', 'name slug');

    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }

    res.status(200).json({ provider });
  } catch (error) {
    console.error('Update provider error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteProvider(req, res) {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }

    const provider = await Provider.findByIdAndDelete(id);
    
    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }

    res.status(200).json({ message: 'Provider deleted successfully' });
  } catch (error) {
    console.error('Delete provider error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export default withAuth(handler);
