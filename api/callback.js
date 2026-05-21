module.exports = async function (req, res) {
  const code = req.query.code;

  const r = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      code: code,
    }),
  });

  const data = await r.json();
  const access_token = data.access_token;
  const error = data.error;

  if (error || !access_token) {
    res.status(401).send('Erreur OAuth : ' + (error || 'token manquant'));
    return;
  }

  var content = JSON.stringify({ token: access_token, provider: 'github' });
  var msg = JSON.stringify('authorization:github:success:' + content);

  res.setHeader('Content-Type', 'text/html');
  res.send('<!doctype html><html><body><script>' +
    '(function(){' +
    'function onMsg(e){window.opener.postMessage(' + msg + ',e.origin);window.removeEventListener("message",onMsg);}' +
    'window.addEventListener("message",onMsg,false);' +
    'window.opener.postMessage("authorizing:github","*");' +
    '})();' +
    '<\/script></body></html>');
};
