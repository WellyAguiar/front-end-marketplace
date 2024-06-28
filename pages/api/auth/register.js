import { registerUser } from '../../../controllers/authController';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await registerUser(req, res);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
