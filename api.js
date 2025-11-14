import OpenAI from "openai";

export default async function handler(req, res) {
    try {
        const { question, lang } = req.body;

        const client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: lang === "id"
                        ? "Kamu adalah asisten matematika ahli. Berikan jawaban jelas dan langkah-langkahnya."
                        : "You are an expert math assistant. Provide clear answers with steps."
                },
                { role: "user", content: question }
            ]
        });

        res.status(200).json({
            answer: completion.choices[0].message.content
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ answer: "Error server." });
    }
}
