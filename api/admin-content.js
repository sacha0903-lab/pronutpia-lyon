const https = require('https');
const { verifyToken, getTokenFromRequest } = require('./_auth');

const REPO = process.env.GITHUB_REPO || 'sacha0903-lab/pronutpia-lyon';
const BRANCH = 'main';

const ALLOWED_FILES = [
  '_data/settings.json',
  '_data/collections/amelie.json',
  '_data/collections/pronuptia.json',
  '_data/collections/libelle.json',
  '_data/collections/randy-fenoli.json',
  '_data/collections/eddy-k.json',
  '_data/collections/justin-alexander.json',
  '_data/collections/modeca-papillon.json',
  '_data/collections/modeca-courtes.json',
];

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

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const token = getTokenFromRequest(req);
  if (!verifyToken(token)) {
    return res.status(401).json({ error: 'Session expirée, veuillez vous reconnecter.' });
  }

  const file = req.query.file;
  if (!file || !ALLOWED_FILES.includes(file)) {
    return res.status(400).json({ error: 'Fichier non autorisé.' });
  }

  // ── GET : lire le fichier depuis GitHub ──────────────────────────────────
  if (req.method === 'GET') {
    const { status, body } = await githubRequest(
      'GET',
      `/repos/${REPO}/contents/${file}?ref=${BRANCH}`
    );

    if (status !== 200) {
      return res.status(502).json({ error: 'Impossible de lire le fichier.', details: body });
    }

    const content = Buffer.from(body.content, 'base64').toString('utf-8');
    return res.json({ content, sha: body.sha });
  }

  // ── PUT : écrire le fichier sur GitHub ───────────────────────────────────
  if (req.method === 'PUT') {
    const { content, sha, message } = req.body || {};

    if (!content || !sha) {
      return res.status(400).json({ error: 'content et sha sont requis.' });
    }

    const encoded = Buffer.from(content, 'utf-8').toString('base64');
    const { status, body } = await githubRequest(
      'PUT',
      `/repos/${REPO}/contents/${file}`,
      {
        message: message || `Admin: mise à jour ${file}`,
        content: encoded,
        sha,
        branch: BRANCH,
      }
    );

    if (status !== 200 && status !== 201) {
      const msg =
        body?.message === 'conflict'
          ? 'Conflit : le fichier a été modifié entre-temps. Rechargez la page.'
          : 'Impossible de sauvegarder.';
      return res.status(502).json({ error: msg, details: body });
    }

    return res.json({
      ok: true,
      sha: body.content?.sha,
      commit: body.commit?.sha,
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
