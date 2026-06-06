const crypto = require('crypto');

function getSecret() {
  return process.env.ADMIN_SECRET || 'pronuptia-default-secret-changeme';
}

function createToken() {
  const ts = Date.now().toString(36);
  const hmac = crypto.createHmac('sha256', getSecret()).update(ts).digest('hex');
  return `${ts}.${hmac}`;
}

function verifyToken(token) {
  if (!token || typeof token !== 'string') return false;
  const dotIdx = token.indexOf('.');
  if (dotIdx < 0) return false;
  const ts = token.slice(0, dotIdx);
  const sig = token.slice(dotIdx + 1);
  const age = Date.now() - parseInt(ts, 36);
  if (isNaN(age) || age < 0 || age > 8 * 3600000) return false; // expire 8h
  const expected = crypto.createHmac('sha256', getSecret()).update(ts).digest('hex');
  try {
    if (sig.length !== expected.length) return false;
    return crypto.timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'));
  } catch {
    return false;
  }
}

function getTokenFromRequest(req) {
  const auth = req.headers['authorization'] || '';
  return auth.startsWith('Bearer ') ? auth.slice(7) : null;
}

module.exports = { createToken, verifyToken, getTokenFromRequest };
