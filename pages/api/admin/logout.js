export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Set-Cookie', 'adminToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict');
  
  res.status(200).json({ success: true, message: 'Logout successful' });
}
