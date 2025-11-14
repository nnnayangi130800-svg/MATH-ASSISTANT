export default async function handler(req, res) {
    const { question } = req.body;

    const response = await fetch("https://api.deepseek.com/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.DEEPSEEK_KEY}`
        },
        body: JSON.stringify({
            model: "deepseek-chat",
            messages: [{ role: "user", content: question }]
        })
    });

    const json = await response.json();
    const answer = json.choices?.[0]?.message?.content || "Tidak ada jawaban dari AI";

    res.status(200).json({ answer });
}
