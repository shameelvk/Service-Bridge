import dbConnect from '../../lib/mongodb';
import ContactMessage from '../../models/ContactMessage';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      return getContactMessages(req, res);
    case 'POST':
      return createContactMessage(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function getContactMessages(req, res) {
  try {
    const contactMessages = await ContactMessage.find({}).sort({ createdAt: -1 });
    res.status(200).json({ contactMessages });
  } catch (error) {
    console.error('Get contact messages error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function createContactMessage(req, res) {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const contactMessage = new ContactMessage({
      name,
      email,
      phone,
      message
    });

    await contactMessage.save();
    res.status(201).json({ contactMessage });
  } catch (error) {
    console.error('Create contact message error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
