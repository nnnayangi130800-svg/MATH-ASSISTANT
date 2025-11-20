
// =============================
// DARK MODE
// =============================
document.getElementById("darkToggle").onclick = () => {
    document.documentElement.classList.toggle("dark");
};

// =============================
// TAB Navigation
// =============================
const tabs = document.querySelectorAll(".tabBtn");
const pages = document.querySelectorAll(".page");

tabs.forEach(btn => {
    btn.addEventListener("click", () => {
        pages.forEach(p => p.classList.add("hidden"));
        document.getElementById(btn.dataset.target).classList.remove("hidden");
    });
});

// =============================
// DATA MATERI LENGKAP
// =============================
const materiData = [
    { title: "Eksponen 📈", emoji: "📈", content: "Pengertian eksponen...\n(Rumus lengkap sangat panjang di sini)\n(sifat-sifat eksponen lengkap)\n(contoh grafik jika ada)" },
    { title: "Logaritma 🔢", emoji: "🔢", content: "Pengertian logaritma...\nRumus logaritma lengkap..." },
    { title: "Bentuk Akar 🟩", emoji: "🟩", content: "Pengertian akar...\nSifat-sifat akar lengkap..." },
    { title: "Persamaan Linear ➗", emoji: "➗", content: "Penjelasan, rumus, contoh soal..." },
    { title: "Pertidaksamaan Linear ➕", emoji: "➕", content: "Materi lengkap pertidaksamaan..." },
    { title: "Fungsi 📊", emoji: "📊", content: "Pengertian fungsi, grafik, contoh..." },
    { title: "Fungsi Kuadrat 🟦", emoji: "🟦", content: "Rumus umum, diskriminan, grafik..." },
    { title: "Trigonometri Dasar 🧭", emoji: "🧭", content: "Sudut, sinus, cos, tan, kuadran, grafik..." }
];

// =============================
// TAMPILKAN DAFTAR MATERI
// =============================
const materiList = document.getElementById("materiList");
function loadMateri() {
    materiData.forEach(m => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerText = `${m.emoji}  ${m.title}`;
        card.onclick = () => alert(m.content); 
        materiList.appendChild(card);
    });
}
loadMateri();

// =============================
// SEARCH MATERI
// =============================
document.getElementById("searchMateri").addEventListener("keyup", function () {
    let filter = this.value.toLowerCase();
    let cards = materiList.getElementsByClassName("card");

    for (let c of cards) {
        c.style.display = c.innerText.toLowerCase().includes(filter) ? "" : "none";
    }
});

// =============================
// LATIHAN SOAL (5 rutin + 5 non rutin)
// =============================
const latihanData = {
    "Eksponen 📈": [
        { q: "Hitung 2³ × 2²", a: "32", explain: "2³ = 8, 2² = 4, 8×4 = 32" },
        { q: "Sederhanakan 5⁴ / 5²", a: "25", explain: "Pangkat dikurang → 5^(4−2) = 5² = 25" },
        { q: "Tentukan nilai x: 3ˣ = 27", a: "3", explain: "27 = 3³ maka x=3" },
        { q: "Sederhanakan (2⁵)(2⁻³)", a: "4", explain: "2^(5−3)=2²=4" },
        { q: "Hitung nilai 4^(3/2)", a: "8", explain: "Akar kuadrat 4 = 2 → 2³=8" },

        // NON RUTIN
        { q: "Bandingkan mana lebih besar: 2¹⁰ atau 5⁵", a: "2¹⁰", explain: "2¹⁰=1024, 5⁵=3125 → lebih besar 5⁵" },
        { q: "Sebuah bakteri membelah 2× tiap jam, berapa jumlah setelah 6 jam?", a: "64", explain: "2⁶=64" },
        { q: "Jika a²b³ / ab = ?", a: "ab²", explain: "Pangkat dikurang: a^(2−1)b^(3−1)" },
        { q: "Tentukan nilai x: 4ˣ = 1/16", a: "-2", explain: "1/16 = 4⁻²" },
        { q: "Sederhanakan (3² × 3³) / 3", a: "81", explain: "3^(2+3−1)=3⁴=81" }
    ]
};

// tampilkan list materi latihan
const latihanList = document.getElementById("latihanList");
function loadLatihan() {
    for (let m in latihanData) {
        const card = document.createElement("div");
        card.className = "card";
        card.innerText = m;
        card.onclick = () => startQuiz(m);
        latihanList.appendChild(card);
    }
}
loadLatihan();

// =============================
// QUIZ ENGINE
// =============================
let currentSet = [];
let qIndex = 0;

function startQuiz(materi) {
    document.getElementById("quizArea").classList.remove("hidden");
    currentSet = latihanData[materi];
    qIndex = 0;
    showQuestion();
}

function showQuestion() {
    const q = currentSet[qIndex];
    document.getElementById("quizTitle").innerText = `Soal ${qIndex + 1}`;
    document.getElementById("quizQuestion").innerText = q.q;
    document.getElementById("quizFeedback").innerText = "";
    document.getElementById("nextQuiz").classList.add("hidden");
    document.getElementById("quizAnswer").value = "";
}

document.getElementById("submitAns").onclick = () => {
    let user = document.getElementById("quizAnswer").value.trim();
    let correct = currentSet[qIndex].a;

    if (user === correct) {
        document.getElementById("quizFeedback").innerText = "Benar! " + currentSet[qIndex].explain;
        document.getElementById("nextQuiz").classList.remove("hidden");
    } else {
        document.getElementById("quizFeedback").innerText = "❌ Salah, coba lagi";
    }
};

document.getElementById("nextQuiz").onclick = () => {
    qIndex++;
    if (qIndex < currentSet.length) showQuestion();
    else document.getElementById("quizFeedback").innerText = "Kuis selesai!";
};

// =============================
// TRIK CEPAT
// =============================
const trikData = [
    "Eksponen: jika basis sama × maka pangkat ditambah",
    "Eksponen: jika basis sama ÷ maka pangkat dikurang",
    "Logaritma: log(a^b) = b log(a)",
    "Logaritma: log(ab)=log(a)+log(b)",
    "Bentuk Akar: √ab = √a × √b",
    "Linear: ubah ax+b=c menjadi ax=c-b"
];

const trikList = document.getElementById("trikList");

function loadTrik() {
    trikData.forEach(t => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerText = "⚡ " + t;
        trikList.appendChild(card);
    });
}
loadTrik();
