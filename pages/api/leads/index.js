// /pages/api/index.js
import dbConnect from '../../../lib/dbConnect';
import Lead from '../../../models/Lead';

export default async function handler(req, res) {
  const { method } = req;
  const { search = '', sort = '' } = req.query;

  // Connect to the database
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        let query = {};

        // Implementing search
        if (search) {
          query = {
            $or: [
              { name: { $regex: search, $options: 'i' } }, // Case-insensitive regex search
              { email: { $regex: search, $options: 'i' } },
              { product: { $regex: search, $options: 'i' } }
            ]
          };
        }

        // Implementing sorting
        let sortOrder = {};
        if (sort === 'asc') {
          sortOrder = { name: 1 };
        } else if (sort === 'desc') {
          sortOrder = { name: -1 };
        }

        // Fetching leads with search and sorting applied
        const leads = await Lead.find(query).sort(sortOrder);

        res.status(200).json({ success: true, data: leads });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
