const crypto = require('crypto');
const { createToken } = require('./_auth');

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { password } = req.body || {};

  if (!password) {
    return res.status(400).json({ error: 'Mot de passe requis' });
  }

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    console.error('ADMIN_PASSWORD non configuré dans les variables d\'environnement Vercel');
    return res.status(500).json({ error: 'Configuration serveur manquante. Contactez l\'administrateur.' });
  }

  const match = password.trim() === expected.trim();

  if (!match) {
    return res.status(401).json({ error: 'Mot de passe incorrect' });
  }

  const token = createToken();
  return res.json({ token });
};
