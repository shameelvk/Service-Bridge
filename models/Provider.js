import mongoose from 'mongoose';

const ProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  subcategoryIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subcategory'
  }],
  locations: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Provider || mongoose.model('Provider', ProviderSchema);
