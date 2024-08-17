import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please add an email'],
  },
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  number: {
    type: String,
    required: [true, 'Please add a number'],
  },
  product: {
    type: String,
    required: [true, 'Please add a product'],
  },
});

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
