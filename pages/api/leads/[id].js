// /pages/api/leads/[id].js
import mongoose from 'mongoose';
import Lead from '../../../models/Lead';
import dbConnect from '../../../lib/dbConnect';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  // Connect to the database
  await dbConnect();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid lead ID' });
  }

  switch (method) {
    case 'PUT':
      try {
        const { name, email, number, product } = req.body;

        const lead = await Lead.findByIdAndUpdate(id, { name, email, number, product }, { new: true });
        if (!lead) {
          return res.status(404).json({ success: false, message: 'Lead not found' });
        }

        res.status(200).json({ success: true, data: lead });
      } catch (error) {
        console.error("Error updating lead:", error);
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletedLead = await Lead.findByIdAndDelete(id);

        if (!deletedLead) {
          return res.status(404).json({ success: false, message: 'Lead not found' });
        }

        res.status(200).json({ success: true, message: 'Lead deleted successfully' });
      } catch (error) {
        console.error("Error deleting lead:", error);
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
