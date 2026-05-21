export default async function handler(req, res) {
  const { code } = req.query;

  const r = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      code,
    }),
  });

  const { access_token, error } = await r.json();

  if (error || !access_token) {
    res.status(401).send(`Erreur OAuth : ${error || 'token manquant'}`);
    return;
  }

  const msg = JSON.stringify(
    'authorization:github:success:' +
      JSON.stringify({ token: access_token, provider: 'github' })
  );

  res.setHeader('Content-Type', 'text/html');
  res.send(`<!doctype html><html><body><script>
(function () {
  function onMsg(e) {
    window.opener.postMessage(${msg}, e.origin);
    window.removeEventListener('message', onMsg);
  }
  window.addEventListener('message', onMsg, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script></body></html>`);
}
