// api/ask.js
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  
    try{
      const { question } = req.body || {};
      if(!question) return res.status(400).json({ error: 'Missing question' });
  
      const API_KEY = process.env.USECHAT_API_KEY || '';
      if(!API_KEY){
        return res.status(500).json({ error: 'AI API key not configured (USECHAT_API_KEY)' });
      }
  
      // build prompt for math tutor (Indonesian by default)
      const prompt = `You are a helpful math tutor. Answer clearly and step-by-step. Question:\n\n${question}\n\n`;
  
      // Example request to UseChat-like endpoint (adjust if different provider)
      const payload = {
        model: 'gpt-4o-mini', // provider-specific model name
        messages: [
          { role: 'system', content: 'You are a helpful math tutor. Be concise but clear.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 800
      };
  
      const r = await fetch('https://api.usechat.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify(payload),
        // Note: Vercel has its own function timeout (default 10s on Hobby). If your provider is slow,
        // consider using a provider with faster response or reduce model/timeout expectations.
      });
  
      if(!r.ok){
        const txt = await r.text().catch(()=>null);
        return res.status(502).json({ error: 'Upstream error', details: txt || r.statusText });
      }
  
      const json = await r.json();
      // adapt to provider response shape
      const answer = json?.choices?.[0]?.message?.content || json?.result || JSON.stringify(json);
  
      return res.status(200).json({ answer });
    } catch(err){
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  }
  