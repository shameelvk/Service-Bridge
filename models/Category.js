import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  locations: [{
    type: String
  }]
}, {
  timestamps: true
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
