import mongoose from 'mongoose';

const SubcategorySchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
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
  rates: [{
    type: String,
    trim: true
  }],
  minCharge: {
    type: Number,
    required: true,
    min: 0
  },
  locations: {
    type: [String],
    required: true,
    default: ['Malappuram']
  }
}, {
  timestamps: true
});

export default mongoose.models.Subcategory || mongoose.model('Subcategory', SubcategorySchema);
