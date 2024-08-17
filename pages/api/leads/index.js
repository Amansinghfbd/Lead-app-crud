import dbConnect from '../../../lib/dbConnect';
import Lead from '../../../models/Lead';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const leads = await Lead.find({});
        res.status(200).json({ success: true, data: leads });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
