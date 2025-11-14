export default async function handler(req, res) {
    const { question, lang } = req.body;
  
    const promptID = lang === "id"
      ? "Jawab pertanyaan matematika berikut dengan jelas dan langkah-langkahnya dalam bahasa Indonesia: "
      : "Answer the following math question clearly with step-by-step explanation in English: ";
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a helpful math tutor." },
            { role: "user", content: promptID + question }
          ]
        })
      });
  
      const data = await response.json();
      const answer = data.choices?.[0]?.message?.content || "Error, coba lagi.";
  
      res.status(200).json({ answer });
  
    } catch (err) {
      res.status(500).json({ answer: "Terjadi kesalahan server." });
    }
  }
  