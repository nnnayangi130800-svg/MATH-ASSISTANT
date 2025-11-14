// PAGE SWITCHER
document.querySelectorAll("[data-target]").forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.dataset.target;
        document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
        document.getElementById(target).classList.add("active");
        window.scrollTo(0, 0);
    });
});

/* ============================
   1. RUMUS — Kelas 10 Sem 1
============================= */

const rumus = [
    {
        title: "Eksponen",
        body: `a^m × a^n = a^(m+n)
a^m ÷ a^n = a^(m−n)
(a^m)^n = a^(m×n)
(ab)^n = a^n b^n
a^(−n) = 1 / a^n`
    },
    {
        title: "Logaritma",
        body: `log_a b = c  ⇔  a^c = b
log(xy) = log x + log y
log(x/y) = log x − log y
log(x^k) = k log x`
    },
    {
        title: "Persamaan Linear",
        body: `y = mx + c
m = (y2 − y1)/(x2 − x1)`
    },
    {
        title: "Fungsi Kuadrat",
        body: `y = ax² + bx + c
Diskriminan: D = b² − 4ac`
    },
    {
        title: "Trigonometri Dasar",
        body: `sin = depan / miring
cos = samping / miring
tan = depan / samping`
    },
    {
        title: "Bangun Datar",
        body: `Persegi: L = s²
Persegi Panjang: L = p×l
Lingkaran: L = πr²`
    },
];

const rumusContainer = document.getElementById("rumusContainer");

rumus.forEach(r => {
    const div = document.createElement("div");
    div.className = "block";
    div.innerHTML = `<strong>${r.title}</strong><pre>${r.body}</pre>`;
    rumusContainer.appendChild(div);
});


/* ============================
   2. LATIHAN SOAL
============================= */

const latihan = [
    {
        q: "Hitung 2^3 × 2^4",
        a: `Langkah 1: Basis sama → tambahkan pangkat
Langkah 2: 3 + 4 = 7
Langkah 3: 2^7 = 128`
    },
    {
        q: "Selesaikan: log₂ 8",
        a: `Langkah 1: log₂ 8 = c → 2^c = 8
Langkah 2: 2^3 = 8
Jadi c = 3`
    },
    {
        q: "Gradien garis melalui (2,5) dan (6,13)",
        a: `m = (13−5) / (6−2)
m = 8/4 = 2`
    },
];

const latihanList = document.getElementById("latihanList");

latihan.forEach((item, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <strong>${item.q}</strong>
        <button class="back" style="background:#457B9D;margin-top:10px"
                onclick="toggleAns(${i})">Lihat Langkah</button>
        <div id="ans-${i}" class="ans">${item.a}</div>`;
    latihanList.appendChild(li);
});

function toggleAns(i) {
    const el = document.getElementById("ans-" + i);
    el.style.display = el.style.display === "block" ? "none" : "block";
}
window.toggleAns = toggleAns;


/* ============================
   3. TIPS CEPAT
============================= */

const tips = [
    {rule: "Eksponen", txt: "Basis sama → pangkat ditambah. Contoh: 2³ × 2⁴ = 2⁷"},
    {rule: "Logaritma", txt: "log(xy) = log x + log y (memecah perkalian)"},
    {rule: "Kuadrat", txt: "D = b² − 4ac menentukan jumlah akar"},
    {rule: "Trigonometri", txt: "tan = sin ÷ cos"}
];

const tipsContainer = document.getElementById("tipsContainer");

tips.forEach(t => {
    const div = document.createElement("div");
    div.className = "tip";
    div.innerHTML = `<strong>${t.rule}</strong><br>${t.txt}`;
    tipsContainer.appendChild(div);
});
