
// =======================
// DATA MATERI
// =======================
const materiData = {
    "Eksponen": {
        icon: "https://img.icons8.com/?size=100&id=61038&format=png",
        pengertian: "Eksponen adalah bentuk pangkat dari suatu bilangan.",
        rumus: [
            "aᵐ · aⁿ = aᵐ⁺ⁿ",
            "aᵐ / aⁿ = aᵐ⁻ⁿ",
            "(aᵐ)ⁿ = aᵐⁿ",
            "a⁰ = 1"
        ],
        sifat: [
            "Jika basis sama → pangkat dijumlah/dikurang",
            "Jika pangkat dipangkatkan → pangkat dikali"
        ]
    },

    "Logaritma": {
        icon: "https://img.icons8.com/?size=100&id=39816&format=png",
        pengertian: "Logaritma adalah kebalikan dari eksponen.",
        rumus: [
            "logₐ (aⁿ) = n",
            "aˡᵒᵍₐ(x) = x",
            "logₐ(xy) = logₐx + logₐy"
        ],
        sifat: [
            "Logaritma perkalian → dijumlahkan",
            "Logaritma pembagian → dikurangkan"
        ]
    },

    "Persamaan Linear": {
        icon: "https://img.icons8.com/?size=100&id=59823&format=png",
        pengertian: "Persamaan linear adalah persamaan dengan pangkat tertinggi 1.",
        rumus: ["ax + b = 0 ⇒ x = -b/a"],
        sifat: ["Grafik berupa garis lurus."]
    },

    "Sistem Persamaan Linear": {
        icon: "https://img.icons8.com/?size=100&id=2752&format=png",
        pengertian: "SPL adalah dua persamaan linear dua variabel.",
        rumus: ["Metode substitusi, eliminasi, grafik"],
        sifat: ["Hasil: satu solusi, tak hingga, atau tidak ada solusi"]
    },

    "Barisan dan Deret": {
        icon: "https://img.icons8.com/?size=100&id=11173&format=png",
        pengertian: "Barisan adalah urutan bilangan, deret adalah jumlahnya.",
        rumus: [
            "Un = a + (n-1)d",
            "Sn = n/2 (2a + (n-1)d)"
        ],
        sifat: ["Barisan aritmetika memiliki beda tetap."]
    },

    "Fungsi": {
        icon: "https://img.icons8.com/?size=100&id=U26bWBnJK3Rj&format=png",
        pengertian: "Fungsi adalah relasi yang memasangkan setiap x ke satu y.",
        rumus: ["f(x) = ..."],
        sifat: ["Setiap x hanya memiliki satu pasangan y."]
    }
};

// =======================
// LATIHAN SOAL (5 rutin + 5 non rutin)
// =======================
const latihanData = {
    "Eksponen": {
        rutin: [
            "Sederhanakan: 2³ × 2²",
            "Sederhanakan: 5⁶ / 5²",
            "Hitung: (3²)³",
            "Tentukan nilai: 4⁰",
            "Sederhanakan: 2⁴ × 2⁻¹"
        ],
        non: [
            "Jika populasi bakteri berlipat 2 setiap jam, berapa kali lipat setelah 5 jam?",
            "Sebuah uang bertambah 10% tiap tahun. Berapa kali lipat setelah 3 tahun?",
            "Tangga bertambah 2³ anak tangga tiap meter, berapa total 4 meter?",
            "Sebuah mesin menggandakan outputnya dengan eksponen 2. Hitung output setelah 6 tahap.",
            "Robot membelah diri mengikuti pola 2ⁿ. Berapa robot pada n=7?"
        ]
    },

    "Logaritma": {
        rutin: [
            "Hitung log₂ 8",
            "Hitung log₁₀ 100",
            "Hitung log₃ 27",
            "Sederhanakan log₄ (4⁵)",
            "Hitung log₅ 25"
        ],
        non: [
            "Suhu diberi skala logaritmik. Jika naik 1 skala = 10×, berapa kenaikan dari skala 2 ke 4?",
            "Suara naik 2 level logaritma. Berapa kali lipat intensitasnya?",
            "Jika log pertumbuhan tanaman 3, tentukan tinggi jika dasar 2.",
            "Gempa 5 SR dan 7 SR beda berapa kali lipat energi?",
            "Hitung log berbasis 2 dari data komputer 1 TB."
        ]
    }
};

// =======================
// TRIK CEPAT
// =======================
const trikCepat = [
    "Eksponen: basis sama → pangkat dijumlah",
    "Eksponen: pembagian → pangkat dikurang",
    "Logaritma: ln(ab) = ln a + ln b",
    "PLSV: ubah bentuk ax + b = 0 → pindah ruas",
    "Barisan: cek beda tetap untuk aritmetika",
    "Fungsi: cek domain sebelum substitusi"
];

// =======================
// RENDER LIST BOX
// =======================
function renderMateriList() {
    const container = document.getElementById("materiList");
    container.innerHTML = "";
    Object.keys(materiData).forEach(m => {
        container.innerHTML += `
            <div class="box" onclick="openMateri('${m}')">
                <img src="${materiData[m].icon}">
                <div>${m}</div>
            </div>`;
    });
}

function renderLatihanList() {
    const container = document.getElementById("latihanList");
    container.innerHTML = "";
    Object.keys(latihanData).forEach(m => {
        container.innerHTML += `
            <div class="box" onclick="openLatihan('${m}')">
                <img src="${materiData[m].icon}">
                <div>${m}</div>
            </div>`;
    });
}

function renderTrik() {
    const container = document.getElementById("trikContainer");
    trikCepat.forEach(t => {
        container.innerHTML += `<div class="box">${t}</div>`;
    });
}

// =======================
// DETAIL MATERI
// =======================
function openMateri(m) {
    const d = materiData[m];
    document.getElementById("materiDetail").innerHTML = `
        <h2>${m}</h2>
        <p><b>Pengertian:</b> ${d.pengertian}</p>
        <p><b>Rumus:</b></p>
        <ul>${d.rumus.map(r => `<li>${r}</li>`).join("")}</ul>
        <p><b>Sifat:</b></p>
        <ul>${d.sifat.map(s => `<li>${s}</li>`).join("")}</ul>
    `;
}

// =======================
// DETAIL LATIHAN SOAL
// =======================
function openLatihan(m) {
    const d = latihanData[m];
    document.getElementById("latihanDetail").innerHTML = `
        <h2>Latihan Soal: ${m}</h2>

        <h3>Soal Rutin</h3>
        <ol>${d.rutin.map(s => `<li>${s}</li>`).join("")}</ol>

        <h3>Soal Non Rutin</h3>
        <ol>${d.non.map(s => `<li>${s}</li>`).join("")}</ol>
    `;
}

// =======================
// SEARCH
// =======================
document.getElementById("searchBar").addEventListener("input", function () {
    const q = this.value.toLowerCase();
    document.querySelectorAll(".materi-list .box").forEach(b => {
        b.style.display = b.innerText.toLowerCase().includes(q) ? "flex" : "none";
    });
});

// =======================
// TAB SWITCH
// =======================
document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.onclick = () => {
        document.querySelector(".tab-btn.active").classList.remove("active");
        btn.classList.add("active");

        document.querySelector(".tab-content.active").classList.remove("active");
        document.getElementById(btn.dataset.tab).classList.add("active");
    }
});

// =======================
// DARK MODE
// =======================
document.getElementById("darkModeBtn").onclick = () =>
    document.body.classList.toggle("dark");

// INIT
renderMateriList();
renderLatihanList();
renderTrik();
