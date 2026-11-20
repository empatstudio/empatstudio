const assert = require('node:assert/strict');
const handler = require('../api/contact.js');
const valid = { vardas: 'Bandomoji užklausa', email: 'test@example.com', zinute: 'Siuntimo patikra', privatumas: 'sutinku' };
async function request(body, method = 'POST', origin = 'https://www.empat.studio') {
  const res = { headers: {}, setHeader(k,v) { this.headers[k]=v; }, status(s) { this.code=s; return this; }, json(body) { this.body=body; return this; } };
  await handler({ method, headers: { origin }, body }, res);
  return res;
}
(async () => {
  const oldFetch = global.fetch, oldKey = process.env.RESEND_API_KEY, oldFrom = process.env.CONTACT_FROM;
  let calls = 0;
  global.fetch = async (_url, options) => { calls++; const payload = JSON.parse(options.body); assert.deepEqual(payload.to, ['info.empatstudio@gmail.com']); assert.equal(payload.reply_to, valid.email); return { ok: true, json: async () => ({ id: 'mock-id' }) }; };
  try {
    assert.equal((await request(valid, 'GET')).code, 405);
    assert.equal((await request(valid, 'POST', 'https://example.com')).code, 403);
    assert.equal((await request({})).code, 400);
    assert.equal((await request('{')).code, 400);
    assert.equal((await request({...valid, email:'bad\r\n@example.com'})).code, 400);
    assert.equal((await request({...valid, privatumas:''})).code, 400);
    assert.equal((await request({...valid, zinute:'x'.repeat(10001)})).code, 400);
    assert.equal((await request({...valid, _honey:'bot'})).code, 200);
    delete process.env.RESEND_API_KEY;
    assert.equal((await request(valid)).code, 503);
    assert.equal(calls, 0);
    process.env.RESEND_API_KEY = 'test-only'; process.env.CONTACT_FROM = 'test@example.com';
    assert.equal((await request(valid)).body.ok, true);
    global.fetch = async () => ({ok:false,json:async()=>({message:'Rejected'})});
    assert.equal((await request(valid)).code, 502);
    global.fetch = async () => { throw new Error('Network failure'); };
    assert.equal((await request(valid)).code, 502);
    console.log('Contact handler: validation, no-send rejection paths, mocked success and provider failures passed. No real emails sent.');
  } finally {
    global.fetch = oldFetch;
    if (oldKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = oldKey;
    if (oldFrom === undefined) delete process.env.CONTACT_FROM; else process.env.CONTACT_FROM = oldFrom;
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
