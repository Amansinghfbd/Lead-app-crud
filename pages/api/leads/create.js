import dbConnect from '../../../lib/dbConnect';
import Lead from '../../../models/Lead';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const lead = await Lead.create(req.body);
        res.status(201).json({ success: true, data: lead });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
