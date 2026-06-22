// api/contact.js — Pronuptia Lyon
// Reçoit les données du formulaire RDV et envoie un email via Resend.
// Variable d'environnement requise dans Vercel : RESEND_API_KEY

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const d = req.body || {};

  // Validation des champs obligatoires
  const missing = ['prenom', 'nom', 'email', 'telephone', 'type_rdv'].filter(f => !d[f]);
  if (missing.length) {
    return res.status(400).json({ error: 'Champs manquants : ' + missing.join(', ') });
  }

  // Formatage de la date
  const dateStr = d.date
    ? new Date(d.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  const heureLabel = { matin: 'Matin (10h – 12h)', 'apres-midi': 'Après-midi (12h – 16h)', 'fin-journee': 'Fin de journée (16h – 19h)' }[d.heure] || d.heure;

  const accompagnantLabel = { seule: 'Vient seule', '1': '1 personne', '2': '2 personnes', '3+': '3 personnes ou plus' }[d.accompagnants] || d.accompagnants;

  // Ligne de tableau helper
  const row = (label, value, alt) => value
    ? `<tr>
        <td style="padding:11px 16px;background:${alt ? '#faf7f2' : '#ffffff'};border-bottom:1px solid #ede6da;font-family:Arial,sans-serif;font-size:12px;font-weight:700;color:#6a6058;width:38%;vertical-align:top">${label}</td>
        <td style="padding:11px 16px;background:${alt ? '#faf7f2' : '#ffffff'};border-bottom:1px solid #ede6da;font-family:Arial,sans-serif;font-size:13px;color:#1a1715;vertical-align:top">${value}</td>
      </tr>`
    : '';

  const html = `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0ebe3">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ebe3;padding:40px 20px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

        <!-- En-tête -->
        <tr>
          <td style="background:#6b1a28;padding:28px 32px;text-align:center">
            <p style="margin:0;font-family:Georgia,serif;font-size:11px;font-weight:400;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.65)">Pronuptia Lyon</p>
            <h1 style="margin:8px 0 0;font-family:Georgia,serif;font-size:22px;font-weight:400;color:#ffffff">Nouvelle demande de rendez-vous</h1>
          </td>
        </tr>

        <!-- Bandeau type RDV -->
        <tr>
          <td style="background:#c4a882;padding:12px 32px;text-align:center">
            <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#ffffff">${d.type_rdv || 'Non précisé'}</p>
          </td>
        </tr>

        <!-- Corps -->
        <tr>
          <td style="background:#ffffff;padding:0">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${row('Prénom / Nom', `${d.prenom} ${d.nom}`, false)}
              ${row('Email', `<a href="mailto:${d.email}" style="color:#6b1a28;text-decoration:none">${d.email}</a>`, true)}
              ${row('Téléphone', `<a href="tel:${d.telephone}" style="color:#6b1a28;text-decoration:none">${d.telephone}</a>`, false)}
              ${row('Date souhaitée', dateStr, true)}
              ${row('Heure préférée', heureLabel, false)}
              ${row('Collection', d.collection !== 'indefini' ? d.collection : 'Pas encore décidé', true)}
              ${row('Accompagnants', accompagnantLabel, false)}
              ${d.message ? row('Message', d.message.replace(/\n/g, '<br>'), true) : ''}
            </table>
          </td>
        </tr>

        <!-- Bouton répondre -->
        <tr>
          <td style="background:#faf7f2;padding:24px 32px;text-align:center">
            <a href="mailto:${d.email}?subject=Confirmation de votre rendez-vous Pronuptia Lyon — ${encodeURIComponent(d.prenom + ' ' + d.nom)}"
               style="display:inline-block;background:#6b1a28;color:#ffffff;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;padding:14px 28px">
              Répondre à ${d.prenom}
            </a>
          </td>
        </tr>

        <!-- Pied -->
        <tr>
          <td style="background:#f0ebe3;padding:20px 32px;text-align:center;border-top:1px solid #ddd5c8">
            <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#9a9088">Pronuptia Lyon · 9 rue des Remparts d'Ainay, 69002 Lyon · 04 78 37 12 58</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY manquante');
    return res.status(500).json({ error: 'Configuration serveur manquante' });
  }

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // ⚠️  Avant vérification du domaine pronuptia-lyon.fr dans Resend,
        // le "from" doit rester onboarding@resend.dev (limite du plan gratuit).
        // Après vérification : remplacez par "Pronuptia Lyon <noreply@pronuptia-lyon.fr>"
        from: 'Pronuptia Lyon <onboarding@resend.dev>',
        to: ['smvpronuptia@gmail.com'],
        reply_to: d.email,
        subject: `RDV ${d.type_rdv} — ${d.prenom} ${d.nom}`,
        html
      })
    });

    if (!resendRes.ok) {
      const err = await resendRes.json().catch(() => ({}));
      console.error('Resend error:', err);
      return res.status(502).json({ error: 'Erreur d\'envoi email' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};
