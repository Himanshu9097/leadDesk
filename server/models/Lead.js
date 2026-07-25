import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Name must be at least 3 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    budget: {
      type: String,
      required: [true, 'Budget is required'],
      enum: ['Under ₹50,000', '₹50,000–₹2,00,000', '₹2,00,000–₹5,00,000', '₹5,00,000+'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      minlength: [10, 'Message must be at least 10 characters'],
    },
    status: {
      type: String,
      required: true,
      enum: ['New', 'Contacted', 'Closed'],
      default: 'New',
    },
  },
  {
    timestamps: true,
  }
);

// Add index for search
leadSchema.index({ name: 'text', email: 'text', message: 'text' });

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;
