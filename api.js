// api/ask.js (OpenAI, robust)
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  
    try {
      const { question } = req.body || {};
      if (!question) return res.status(400).json({ error: 'Missing question in body' });
  
      const API_KEY = process.env.OPENAI_API_KEY;
      if (!API_KEY) {
        return res.status(500).json({ error: 'OPENAI_API_KEY not configured in environment variables' });
      }
  
      const prompt = `Kamu adalah tutor matematika untuk siswa SMA. Jawab pertanyaan berikut dengan langkah-langkah yang jelas, terstruktur, dan singkat.\n\nPertanyaan:\n${question}\n\nBerikan jawaban langkah demi langkah dalam bahasa Indonesia.`;
  
      const payload = {
        model: 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: 'You are a helpful math tutor. Provide clear step-by-step answers in Indonesian.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 900,
        temperature: 0.2
      };
  
      const r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify(payload)
      });
  
      if (!r.ok) {
        const txt = await r.text().catch(()=>'');
        console.error('OpenAI upstream error', r.status, txt);
        return res.status(502).json({ error: 'Upstream OpenAI error', status: r.status, details: txt });
      }
  
      const json = await r.json();
      const answer = json?.choices?.[0]?.message?.content || '(no answer)';
  
      return res.status(200).json({ answer });
    } catch (err) {
      console.error('Server exception:', err);
      return res.status(500).json({ error: err.message || 'Server error' });
    }
  }
  