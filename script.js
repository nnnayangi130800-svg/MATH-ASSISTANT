document.getElementById("sendBtn").onclick = askAI;
document.getElementById("copyBtn").onclick = copyText;
document.getElementById("speakBtn").onclick = speakText;

async function askAI() {
    const question = document.getElementById("userInput").value;
    const resBox = document.getElementById("responseBox");

    resBox.textContent = "Sedang memproses...";

    const res = await fetch("/api/ask", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ question })
    });

    const data = await res.json();
    resBox.textContent = data.answer;
}

// Salin jawaban ke clipboard
function copyText() {
    const text = document.getElementById("responseBox").textContent;
    navigator.clipboard.writeText(text);
    alert("Jawaban telah disalin!");
}

// Text-to-speech
function speakText() {
    const text = document.getElementById("responseBox").textContent;
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "id-ID";
    speechSynthesis.speak(msg);
}
