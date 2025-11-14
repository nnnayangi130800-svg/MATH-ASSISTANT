document.getElementById("sendBtn").addEventListener("click", async () => {
    
    const question = document.getElementById("userInput").value;
    const lang = document.getElementById("languageSelect").value;

    if (!question.trim()) {
        alert("Pertanyaan tidak boleh kosong!");
        return;
    }

    document.getElementById("responseBox").innerHTML = "⏳ Sedang memproses...";

    const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, lang })
    });

    const data = await res.json();

    document.getElementById("responseBox").innerHTML = data.answer;
});
