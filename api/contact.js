const origins = new Set(['https://empat.studio', 'https://www.empat.studio']);

module.exports = async function contact(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const fail = (status, error) => res.status(status).json({ error });
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return fail(405, 'Method not allowed'); }
  if (!origins.has(req.headers.origin)) return fail(403, 'Forbidden');
  let body = req.body;
  try { if (typeof body === 'string') body = JSON.parse(body); } catch { return fail(400, 'Invalid request'); }
  if (!body || typeof body !== 'object' || JSON.stringify(body).length > 16000) return fail(400, 'Invalid request');
  const field = key => typeof body[key] === 'string' ? body[key].trim() : '';
  if (field('_honey')) return res.status(200).json({ ok: true });
  const name = field('vardas'), email = field('email'), message = field('zinute');
  if (!name || name.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || /[\r\n]/.test(email) || !message || message.length > 10000 || field('privatumas') !== 'sutinku') return fail(400, 'Patikrink privalomus laukus ir sutikimą.');
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM) return fail(503, 'Siuntimas laikinai nepasiekiamas. Parašyk info.empatstudio@gmail.com.');
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST', signal: AbortSignal.timeout(12000),
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: process.env.CONTACT_FROM, to: ['info.empatstudio@gmail.com'], reply_to: email, subject: 'Nauja užklausa iš empat.studio', text: `Vardas: ${name}\nEl. paštas: ${email}\nTelefonas: ${field('telefonas').slice(0,80)}\nPaslauga: ${field('paslauga').slice(0,200)}\n\n${message}` })
    });
    const result = await response.json();
    if (!response.ok || !result.id) return fail(502, 'Nepavyko išsiųsti. Bandyk dar kartą arba parašyk info.empatstudio@gmail.com.');
    return res.status(200).json({ ok: true });
  } catch { return fail(502, 'Nepavyko išsiųsti. Bandyk dar kartą arba parašyk info.empatstudio@gmail.com.'); }
};
