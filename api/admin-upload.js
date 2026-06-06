const https = require('https');
const crypto = require('crypto');
const { verifyToken, getTokenFromRequest } = require('./_auth');

const REPO = process.env.GITHUB_REPO || 'sacha0903-lab/pronutpia-lyon';
const BRANCH = 'main';

function githubRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const bodyStr = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'api.github.com',
      path,
      method,
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'User-Agent': 'Pronuptia-Admin/1.0',
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        ...(bodyStr ? { 'Content-Length': Buffer.byteLength(bodyStr) } : {}),
      },
    };

    const req = https.request(options, (r) => {
      let data = '';
      r.on('data', (c) => (data += c));
      r.on('end', () => {
        try {
          resolve({ status: r.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: r.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

const handler = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const token = getTokenFromRequest(req);
  if (!verifyToken(token)) {
    return res.status(401).json({ error: 'Session expirée.' });
  }

  const { filename, dataUrl } = req.body || {};

  if (!filename || !dataUrl) {
    return res.status(400).json({ error: 'filename et dataUrl sont requis.' });
  }

  // Extraire la partie base64 depuis le data URL
  const match = dataUrl.match(/^data:image\/(jpeg|jpg|png|webp|gif);base64,(.+)$/i);
  if (!match) {
    return res.status(400).json({ error: 'Format d\'image invalide. Accepté : JPG, PNG, WebP.' });
  }

  const base64Content = match[2];

  // Vérifier taille approximative (base64 → bytes)
  const sizeBytes = (base64Content.length * 3) / 4;
  if (sizeBytes > 7 * 1024 * 1024) {
    return res.status(413).json({ error: 'Image trop grande (max 7 Mo). Compressez-la avant l\'envoi.' });
  }

  // Nom de fichier sécurisé avec hash pour éviter les doublons
  const safeName = filename
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .toLowerCase()
    .replace(/-+/g, '-')
    .slice(0, 80);
  const hash = crypto.randomBytes(4).toString('hex');
  const finalName = `${Date.now()}-${hash}-${safeName}`;
  const filePath = `assets/images/uploads/${finalName}`;

  // Vérifier si le fichier existe déjà (pour récupérer son SHA si besoin)
  const check = await githubRequest('GET', `/repos/${REPO}/contents/${filePath}`);
  const existingSha = check.status === 200 ? check.body.sha : undefined;

  const uploadBody = {
    message: `Admin: upload ${finalName}`,
    content: base64Content,
    branch: BRANCH,
    ...(existingSha ? { sha: existingSha } : {}),
  };

  const { status, body } = await githubRequest(
    'PUT',
    `/repos/${REPO}/contents/${filePath}`,
    uploadBody
  );

  if (status !== 200 && status !== 201) {
    return res.status(502).json({ error: 'Échec de l\'upload.', details: body?.message });
  }

  return res.json({
    ok: true,
    path: `/${filePath}`,
    url: body.content?.download_url || `/${filePath}`,
  });
};

// Augmenter la limite du body parser pour les images (jusqu'à 8 MB)
handler.config = {
  api: {
    bodyParser: {
      sizeLimit: '8mb',
    },
  },
};

module.exports = handler;
