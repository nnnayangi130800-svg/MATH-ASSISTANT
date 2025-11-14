// -----------------------
// LANGUAGE SWITCH
// -----------------------
let lang = "id";

document.getElementById("langID").onclick = () => setLang("id");
document.getElementById("langEN").onclick = () => setLang("en");

function setLang(x) {
    lang = x;
    if (x === "id") {
        document.getElementById("title").innerText = "Math Assistant AI";
        document.getElementById("question").placeholder = "Tanyakan soal matematika...";
        document.getElementById("sendBtn").innerText = "Kirim";
        document.getElementById("quizTitle").innerText = "Mini Quiz";
    } else {
        document.getElementById("title").innerText = "Math Assistant AI";
        document.getElementById("question").placeholder = "Ask a math question...";
        document.getElementById("sendBtn").innerText = "Send";
        document.getElementById("quizTitle").innerText = "Mini Quiz";
    }
}

// -----------------------
// SEND QUESTION
// -----------------------
document.getElementById("sendBtn").onclick = async () => {
    const q = document.getElementById("question").value;
    if (!q.trim()) return;

    document.getElementById("answerBox").innerText = "⏳ Thinking...";

    const res = await fetch("/api/math", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, lang })
    });

    const data = await res.json();
    document.getElementById("answerBox").innerText = data.answer;
};

// -----------------------
// TEXT TO SPEECH
// -----------------------
document.getElementById("speakBtn").onclick = () => {
    const text = document.getElementById("answerBox").innerText;
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = lang === "id" ? "id-ID" : "en-US";
    speechSynthesis.speak(speech);
};

// -----------------------
// COPY ANSWER
// -----------------------
document.getElementById("copyBtn").onclick = () => {
    navigator.clipboard.writeText(
        document.getElementById("answerBox").innerText
    );
    alert("Tersalin!");
};

// -----------------------
// MINI QUIZ
// -----------------------
const quiz = [
    { q: "5 + 7 =", a: "12" },
    { q: "9 × 3 =", a: "27" },
    { q: "Akar dari 81 =", a: "9" }
];

let current = 0;
document.getElementById("quizQuestion").innerText = quiz[current].q;

document.getElementById("quizSubmit").onclick = () => {
    const ans = document.getElementById("quizInput").value.trim();

    if (ans === quiz[current].a) {
        document.getElementById("quizResult").innerText = "Benar!";
    } else {
        document.getElementById("quizResult").innerText = "Salah, coba lagi.";
    }
};
