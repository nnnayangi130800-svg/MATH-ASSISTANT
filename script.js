
// ======== PAGE SWITCH ==========
function showPage(id) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    window.scrollTo(0, 0);
}

function goHome() {
    showPage("homePage");
}

// ======== DARK MODE ==========
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

// ======== SEARCH SYSTEM ==========
function searchContent() {
    const q = document.getElementById("searchInput").value.toLowerCase();
    const items = document.querySelectorAll("#content .item-box");

    items.forEach(b => {
        b.style.display = b.innerText.toLowerCase().includes(q) ? "block" : "none";
    });
}

// ======== LOADER WRAPPERS ==========
function loadMateri() {
    showPage("contentPage");
    loadMateriList();
}
function loadLatihan() {
    showPage("contentPage");
    loadLatihanList();
}
function loadTrikCepat() {
    showPage("contentPage");
    loadTrikCepatList();
}
function loadTentang() {
    showPage("contentPage");
    document.getElementById("content").innerHTML = `
        <h2>Tentang Aplikasi</h2>
        <p>Aplikasi belajar matematika untuk kelas 10 SMA kurikulum merdeka.</p>
    `;
}
/* ===================================================
   PART 2 — MATERI LENGKAP (1–9)
=================================================== */

// DAFTAR MATERI UTAMA (menampilkan kotak-kotak materi)
function loadMateriList() {
    const content = document.getElementById("content");

    content.innerHTML = `
        <h2>Materi Kelas 10 Semester 1</h2>

        <div class="item-box" onclick="showMateri(1)">🧮 Eksponen</div>
        <div class="item-box" onclick="showMateri(2)">📈 Logaritma</div>
        <div class="item-box" onclick="showMateri(3)">🧊 Bentuk Akar</div>
        <div class="item-box" onclick="showMateri(4)">📏 Persamaan Linear</div>
        <div class="item-box" onclick="showMateri(5)">📐 Pertidaksamaan Linear</div>
        <div class="item-box" onclick="showMateri(6)">🔢 Fungsi</div>
        <div class="item-box" onclick="showMateri(7)">🟩 Fungsi Kuadrat</div>
        <div class="item-box" onclick="showMateri(8)">📐 Trigonometri Dasar</div>
        <div class="item-box" onclick="showMateri(9)">🔷 Bangun Datar</div>
    `;
}

// =======================
// DETAIL SETIAP MATERI
// =======================

function showMateri(id) {
    let html = "";
    const c = document.getElementById("content");

    // 1. Eksponen
    if (id === 1) {
        html = `
            <h2>🧮 Materi: Eksponen</h2>

            <div class="item-box">
                <h3>Pengertian</h3>
                <p>Eksponen adalah bentuk penulisan bilangan berpangkat. Jika a bilangan real dan n bilangan bulat positif, maka:
                <br><b>aⁿ = a × a × ... × a (sebanyak n kali)</b></p>
            </div>

            <div class="item-box">
                <h3>Rumus-Rumus Eksponen</h3>
                <pre>
aᵐ × aⁿ = aᵐ⁺ⁿ
aᵐ ÷ aⁿ = aᵐ⁻ⁿ
(aᵐ)ⁿ = aᵐⁿ
(ab)ⁿ = aⁿbⁿ
(a/b)ⁿ = aⁿ / bⁿ
a⁻ⁿ = 1/aⁿ
a⁰ = 1  (a ≠ 0)
                </pre>
            </div>

            <div class="item-box">
                <h3>Sifat-Sifat Eksponen</h3>
                <ul>
                    <li>Jika pangkat negatif → menjadi pecahan.</li>
                    <li>Jika pangkat pecahan → berubah ke bentuk akar.</li>
                    <li>Jika basis sama → operasi eksponen menjadi penjumlahan atau pengurangan pangkat.</li>
                </ul>
            </div>
        `;
    }

    // 2. Logaritma
    if (id === 2) {
        html = `
            <h2>📈 Materi: Logaritma</h2>

            <div class="item-box">
                <h3>Pengertian</h3>
                <p>Logaritma merupakan kebalikan dari eksponen.
                Jika aᶜ = b, maka:
                <br><b>logₐ b = c</b>
                </p>
            </div>

            <div class="item-box">
                <h3>Aturan Logaritma</h3>
                <pre>
logₐ (xy) = logₐ x + logₐ y
logₐ (x / y) = logₐ x - logₐ y
logₐ (xᵏ) = k logₐ x
logₐ b = log b / log a
                </pre>
            </div>

            <div class="item-box">
                <h3>Sifat-Sifat Penting</h3>
                <ul>
                    <li>logₐ 1 = 0</li>
                    <li>logₐ a = 1</li>
                    <li>a harus positif dan ≠ 1</li>
                </ul>
            </div>
        `;
    }

    // 3. Bentuk Akar
    if (id === 3) {
        html = `
            <h2>🧊 Materi: Bentuk Akar</h2>

            <div class="item-box">
                <h3>Pengertian</h3>
                <p>Bentuk akar adalah bilangan dalam bentuk √a.
                Akar merupakan bentuk eksponen pangkat 1/2.</p>
            </div>

            <div class="item-box">
                <h3>Rumus Bentuk Akar</h3>
                <pre>
√a × √b = √(ab)
√a ÷ √b = √(a / b)
√aⁿ = aⁿ/²
a√b = √(a²b)
                </pre>
            </div>

            <div class="item-box">
                <h3>Penyederhanaan</h3>
                <ul>
                    <li>√50 = √(25×2) = 5√2</li>
                    <li>√72 = √(36×2) = 6√2</li>
                </ul>
            </div>
        `;
    }

    // 4. Persamaan Linear
    if (id === 4) {
        html = `
            <h2>📏 Materi: Persamaan Linear</h2>

            <div class="item-box">
                <h3>Definisi</h3>
                <p>Persamaan linear satu variabel berbentuk:
                <br><b>ax + b = 0</b></p>
            </div>

            <div class="item-box">
                <h3>Rumus Umum</h3>
                <pre>
ax + b = 0
x = -b/a
                </pre>
            </div>

            <div class="item-box">
                <h3>Contoh Grafik</h3>
                <p>Bentuk garis lurus dengan gradien m = a dan titik potong y = b.</p>
            </div>
        `;
    }

    // 5. Pertidaksamaan Linear
    if (id === 5) {
        html = `
            <h2>📐 Materi: Pertidaksamaan Linear</h2>

            <div class="item-box">
                <h3>Pengertian</h3>
                <p>Pertidaksamaan linear adalah kalimat matematika yang menggunakan tanda pertidaksamaan:
                <br><b>&lt;, &gt;, ≤, ≥</b></p>
            </div>

            <div class="item-box">
                <h3>Aturan Penting</h3>
                <ul>
                    <li>Jika kedua ruas dikali bilangan negatif → tanda dibalik.</li>
                    <li>Penyelesaian sering berupa himpunan.</li>
                </ul>
            </div>
        `;
    }

    // 6. Fungsi
    if (id === 6) {
        html = `
            <h2>🔢 Materi: Fungsi</h2>

            <div class="item-box">
                <h3>Pengertian</h3>
                <p>Fungsi adalah relasi yang memasangkan setiap elemen domain ke satu elemen kodomain.</p>
            </div>

            <div class="item-box">
                <h3>Kunci Fungsi</h3>
                <ul>
                    <li>Setiap x memiliki satu y.</li>
                    <li>Ditulis: f(x)</li>
                    <li>Domain, kodomain, range.</li>
                </ul>
            </div>
        `;
    }

    // 7. Fungsi Kuadrat
    if (id === 7) {
        html = `
            <h2>🟩 Materi: Fungsi Kuadrat</h2>

            <div class="item-box">
                <h3>Definisi</h3>
                <p>Fungsi kuadrat berbentuk:
                <br><b>f(x) = ax² + bx + c</b> dengan a ≠ 0.</p>
            </div>

            <div class="item-box">
                <h3>Rumus Penting</h3>
                <pre>
Diskriminan: D = b² - 4ac
Titik puncak: x = -b/(2a)
Akar-akar: 
x₁,₂ = (-b ± √D) / 2a
                </pre>
            </div>
        `;
    }

    // 8. Trigonometri Dasar
    if (id === 8) {
        html = `
            <h2>📐 Materi: Trigonometri Dasar</h2>

            <div class="item-box">
                <h3>Definisi</h3>
                <p>Trigonometri mempelajari perbandingan sisi pada segitiga siku-siku.</p>
            </div>

            <div class="item-box">
                <h3>Rumus Dasar</h3>
                <pre>
sin θ = depan / miring
cos θ = samping / miring
tan θ = depan / samping
                </pre>
            </div>

            <div class="item-box">
                <h3>Identitas Penting</h3>
                <pre>
sin²θ + cos²θ = 1
tan θ = sin θ / cos θ
                </pre>
            </div>
        `;
    }

    // 9. Bangun Datar
    if (id === 9) {
        html = `
            <h2>🔷 Materi: Bangun Datar</h2>

            <div class="item-box">
                <h3>Luas Bangun Datar</h3>
                <pre>
Persegi: L = s²
Persegi Panjang: L = p × l
Segitiga: L = ½ a t
Lingkaran: L = π r²
                </pre>
            </div>

            <div class="item-box">
                <h3>Keliling Bangun Datar</h3>
                <pre>
Persegi: K = 4s
Lingkaran: K = 2πr
                </pre>
            </div>
        `;
    }

    c.innerHTML = html;
    window.scrollTo(0, 0);
}
/* ===================================================
   PART 3 — LATIHAN SOAL (5 RUTIN + 5 NON-RUTIN)
=================================================== */

// ========================
// DATA BANK SOAL
// ========================

const latihanData = {
    1: { // Eksponen
        title: "Eksponen",
        soal: [
            // --- 5 RUTIN ---
            {q: "Hitung 2³ × 2⁴", ans: "128", explain: "Basis sama → pangkat dijumlahkan: 3+4=7 → 2⁷=128"},
            {q: "Hitung 5² × 5³", ans: "3125", explain: "2+3=5 → 5⁵ = 3125"},
            {q: "Hitung 3⁴ ÷ 3²", ans: "9", explain: "4−2=2 → 3²=9"},
            {q: "Hitung (2³)²", ans: "64", explain: "3×2=6 → 2⁶=64"},
            {q: "Hitung 4⁻¹", ans: "0.25", explain: "4⁻¹ = 1/4 = 0.25"},

            // --- 5 NON RUTIN ---
            {q: "Jika 2ˣ = 32, maka x = ?", ans: "5", explain: "2⁵ = 32"},
            {q: "Jika 3ˣ = 81, nilai x?", ans: "4", explain: "Karena 81=3⁴"},
            {q: "Jika (5ˣ)(5³)=5⁷, maka x = ?", ans: "4", explain: "x+3=7 → x=4"},
            {q: "Tentukan a jika 2ᵃ = 1/8", ans: "-3", explain: "1/8=2⁻³ → a=-3"},
            {q: "Jika 9ˣ = 27, x = ?", ans: "1.5", explain: "9=3² & 27=3³ → 3²ˣ=3³ → 2x=3 → x=1.5"},
        ]
    },

    2: { // Logaritma
        title: "Logaritma",
        soal: [
            // rutin
            {q: "Hitung log₂ 8", ans: "3", explain: "2³=8 → log₂8=3"},
            {q: "Hitung log₁₀ 1000", ans: "3", explain: "10³=1000"},
            {q: "Hitung log₅ 25", ans: "2", explain: "5²=25"},
            {q: "Hitung log₃ 9", ans: "2", explain: "3²=9"},
            {q: "Hitung log₂ 16", ans: "4", explain: "2⁴=16"},

            // non rutin
            {q: "Jika logₐ b = 3 dan logₐ c = 2, hitung logₐ (bc)", ans: "5", explain: "3+2=5"},
            {q: "Jika log₃ x = 4, tentukan x", ans: "81", explain: "3⁴=81"},
            {q: "Hitung log₂ (1/8)", ans: "-3", explain: "2⁻³ = 1/8"},
            {q: "Jika log₅ (x) = 1/2, maka x = ?", ans: "√5", explain: "5¹ᐟ² = √5"},
            {q: "Jika log₇ (x²)=4, nilai x positif?", ans: "49", explain: "x² = 7⁴ = 2401 → x=49"},
        ]
    },

    3: { // Bentuk akar
        title: "Bentuk Akar",
        soal: [
            // rutin
            {q: "Sederhanakan √50", ans: "5√2", explain: "50=25×2 → √25√2=5√2"},
            {q: "Sederhanakan √72", ans: "6√2", explain: "72=36×2"},
            {q: "Sederhanakan √32", ans: "4√2", explain: "32=16×2"},
            {q: "Hitung √144", ans: "12", explain: "144=12²"},
            {q: "Sederhanakan √18", ans: "3√2", explain: "18=9×2"},

            // non rutin
            {q: "Jika √x = 7, maka x = ?", ans: "49", explain: "7²=49"},
            {q: "Jika √(2x)=6, x = ?", ans: "18", explain: "2x=36"},
            {q: "Hitung nilai √8 × √2", ans: "4", explain: "√16 = 4"},
            {q: "Hitung √(50/2)", ans: "5", explain: "√25=5"},
            {q: "Sederhanakan √200", ans: "10√2", explain: "200=100×2"},
        ]
    },

    4: { // Persamaan Linear
        title: "Persamaan Linear",
        soal: [
            // rutin
            {q: "Selesaikan: 2x + 6 = 10", ans: "2", explain: "2x=4 → x=2"},
            {q: "Selesaikan: 5x − 10 = 0", ans: "2", explain: "5x=10"},
            {q: "Selesaikan: 3x=15", ans: "5", explain: "x=5"},
            {q: "Selesaikan: x + 7 = 2", ans: "-5", explain: "x=-5"},
            {q: "Selesaikan: 4x − 20 = 0", ans: "5", explain: "4x=20"},

            // non rutin
            {q: "Jika 2x+3 = x+10, hitung x", ans: "7", explain: "2x-x = 10-3"},
            {q: "Jika x−4 = 2x+1, x = ?", ans: "-5", explain: "x-2x = 1+4"},
            {q: "Jika 3(x−2)=12, x = ?", ans: "6", explain: "x−2=4"},
            {q: "Jika 5x−3=2x+6, x = ?", ans: "3", explain: "5x-2x=6+3"},
            {q: "Jika 4(x+3)=x+21, hitung x", ans: "3", explain: "4x−x=21−12"},
        ]
    },

    5: { // Pertidaksamaan Linear
        title: "Pertidaksamaan Linear",
        soal: [
            // rutin
            {q: "Selesaikan: x + 3 > 7", ans: "x > 4", explain: "x>4"},
            {q: "Selesaikan: 2x − 4 ≥ 6", ans: "x ≥ 5", explain: "2x≥10"},
            {q: "Selesaikan: 3x < 9", ans: "x < 3", explain: "3x<9"},
            {q: "Selesaikan: 5x ≥ 20", ans: "x ≥ 4", explain: "x≥4"},
            {q: "Selesaikan: x − 2 ≤ 1", ans: "x ≤ 3", explain: "x≤3"},

            // non rutin
            {q: "Selesaikan: 2(x−1) > x+3", ans: "x > 5", explain: "2x−2 > x+3"},
            {q: "Selesaikan: 4−x ≥ 2x", ans: "x ≤ 4/3", explain: "−x−2x≥−4"},
            {q: "Selesaikan: 3x+5 < 2x−1", ans: "x < −6", explain: "3x−2x<−1−5"},
            {q: "Selesaikan: 7x−4 ≤ 3x+8", ans: "x ≤ 3", explain: "7x−3x≤8+4"},
            {q: "Selesaikan: 9−2x > x+3", ans: "x < 2", explain: "−2x−x > 3−9"},
        ]
    },

    6: { // Fungsi
        title: "Fungsi",
        soal: [
            // rutin
            {q: "Jika f(x)=2x, f(3)=", ans: "6", explain: "2×3=6"},
            {q: "Jika f(x)=x+5, f(4)=", ans: "9", explain: "4+5"},
            {q: "Jika f(x)=3x−1, f(2)=", ans: "5", explain: "6−1"},
            {q: "Jika f(x)=x², f(5)=", ans: "25", explain: "5²"},
            {q: "Jika f(x)=4x, f(1)=", ans: "4", explain: "4×1"},

            // non rutin
            {q: "Jika f(x)=x²−4, f(−2)=", ans: "0", explain: "(−2)²−4=0"},
            {q: "Jika f(x)=2x+1, nilai x saat f(x)=9", ans: "4", explain: "2x+1=9"},
            {q: "Jika f(x)=x², cari x saat f(x)=49", ans: "7", explain: "x²=49"},
            {q: "Jika f(x)=3x−5, f(4)=", ans: "7", explain: "3×4−5=7"},
            {q: "Jika f(x)=x²−3x, f(3)=", ans: "0", explain: "9−9=0"},
        ]
    },

    7: { // Fungsi Kuadrat
        title: "Fungsi Kuadrat",
        soal: [
            // rutin
            {q: "Hitung diskriminan dari x²+4x+4", ans: "0", explain: "D=4²−4(1)(4)=0"},
            {q: "Hitung puncak dari y=x²−4x+3", ans: "(2,−1)", explain: "x=−b/2a=2 → y=−1"},
            {q: "Hitung nilai y saat x=2 pada y=x²+2x", ans: "8", explain: "4+4"},
            {q: "Akar-akar dari x²−9=0", ans: "3 dan −3", explain: "x=±3"},
            {q: "Hitung  f(3) untuk f(x)=2x²", ans: "18", explain: "2×9"},

            // non rutin
            {q: "Jika akar-akar: 2 dan 5, tentukan fungsi kuadratnya", ans: "x²−7x+10", explain: "(x−2)(x−5)"},
            {q: "Jika puncak di (1,−4), tentukan nilai a jika melalui (0,−3)", ans: "1", explain: "masukkan titik"},
            {q: "Jika D<0, maka akar?", ans: "Tidak real", explain: "D<0 → tidak punya akar real"},
            {q: "Nilai minimum y=x²+4x+8 adalah?", ans: "4", explain: "Minimum pada x=−2 → y=4"},
            {q: "Nilai maksimum y=−x²+4x adalah?", ans: "4", explain: "puncak di x=2 → y=4"},
        ]
    },

    8: { // Trigonometri
        title: "Trigonometri Dasar",
        soal: [
            // rutin
            {q: "sin 30° =", ans: "1/2", explain: "sin 30° = 1/2"},
            {q: "cos 60° =", ans: "1/2", explain: "cos 60° = 1/2"},
            {q: "tan 45° =", ans: "1", explain: "tan 45° = 1"},
            {q: "sin 90° =", ans: "1", explain: "sin 90° = 1"},
            {q: "cos 0° =", ans: "1", explain: "cos 0° = 1"},

            // non rutin
            {q: "Hitung sin² 30° + cos² 30°", ans: "1", explain: "Identitas trigonom."},
            {q: "Jika tan θ = 1, θ = ?", ans: "45°", explain: "tan=1 terjadi di 45°"},
            {q: "Jika sin θ = 1/2, θ = ?", ans: "30°", explain: "Nilai dasar trigonom."},
            {q: "Jika cos θ = 0, θ = ?", ans: "90°", explain: "cos=0 di 90°"},
            {q: "Jika tan θ = √3, θ = ?", ans: "60°", explain: "tan 60° = √3"},
        ]
    },

    9: { // Bangun Datar
        title: "Bangun Datar",
        soal: [
            // rutin
            {q: "Luas persegi s=4", ans: "16", explain: "4²"},
            {q: "Keliling persegi p=5", ans: "20", explain: "4×5"},
            {q: "Luas lingkaran r=7", ans: "154", explain: "πr² = 22/7×49"},
            {q: "Keliling lingkaran r=7", ans: "44", explain: "2πr"},
            {q: "Luas segitiga a=6 t=4", ans: "12", explain: "½×6×4"},

            // non rutin
            {q: "Jika luas persegi 64, s = ?", ans: "8", explain: "√64=8"},
            {q: "Jika luas lingkaran 314, r ≈ ?", ans: "10", explain: "πr²≈314"},
            {q: "Jika keliling persegi 48, s = ?", ans: "12", explain: "48/4"},
            {q: "Jika segitiga luasnya 30 dan alas 10, tinggi = ?", ans: "6", explain: "½×10×t=30"},
            {q: "Jika persegi panjang luas 45 dan p=9, l=?", ans: "5", explain: "45/9=5"},
        ]
    }
};


// ========================
// HALAMAN DAFTAR MATERI LATIHAN
// ========================

function loadLatihanList() {
    const c = document.getElementById("content");
    c.innerHTML = `
        <h2>Latihan Soal — Pilih Materi</h2>
        <div class="item-box" onclick="openLatihan(1)">🧮 Eksponen</div>
        <div class="item-box" onclick="openLatihan(2)">📈 Logaritma</div>
        <div class="item-box" onclick="openLatihan(3)">🧊 Bentuk Akar</div>
        <div class="item-box" onclick="openLatihan(4)">📏 Persamaan Linear</div>
        <div class="item-box" onclick="openLatihan(5)">📐 Pertidaksamaan Linear</div>
        <div class="item-box" onclick="openLatihan(6)">🔢 Fungsi</div>
        <div class="item-box" onclick="openLatihan(7)">🟩 Fungsi Kuadrat</div>
        <div class="item-box" onclick="openLatihan(8)">📐 Trigonometri Dasar</div>
        <div class="item-box" onclick="openLatihan(9)">🔷 Bangun Datar</div>
    `;
}


// ========================
// HALAMAN SOAL PER MATERI
// ========================

let currentMateri = null;
let currentIndex = 0;

function openLatihan(id) {
    currentMateri = id;
    currentIndex = 0;
    loadSoal();
}

function loadSoal() {
    const data = latihanData[currentMateri];
    const item = data.soal[currentIndex];

    const c = document.getElementById("content");
    c.innerHTML = `
        <h2>${data.title} — Soal ${currentIndex + 1} / ${data.soal.length}</h2>
        <div class="quiz-box">
            <p><b>${item.q}</b></p>
            <input id="jawab" placeholder="Masukkan jawaban">
            <button onclick="cekJawaban()">Cek Jawaban</button>
            <p id="feedback"></p>
        </div>
    `;
}

function cekJawaban() {
    const data = latihanData[currentMateri];
    const item = data.soal[currentIndex];

    let user = document.getElementById("jawab").value.trim();
    let feed = document.getElementById("feedback");

    if (user === "") {
        feed.innerHTML = "Masukkan jawaban!";
        return;
    }

    // BENAR
    if (user === item.ans) {
        feed.innerHTML = `
            <span style="color:green"><b>Benar!</b></span><br>
            Penjelasan:<br>${item.explain}
        `;

        setTimeout(() => {
            currentIndex++;
            if (currentIndex < data.soal.length) {
                loadSoal();
            } else {
                document.getElementById("content").innerHTML = `
                    <h2>Selesai!</h2>
                    <p>Semua soal materi <b>${data.title}</b> telah selesai.</p>
                `;
            }
        }, 1200);

    } else {
        feed.innerHTML = `<span style="color:red">Salah, coba lagi!</span>`;
    }
}
/* ================================================
   PART 4 — TRIK CEPAT (Materi 1–4)
================================================= */

const trikCepat = [

    /* =====================
       1. EKSPOENEN
    ====================== */
    {
        title: "Eksponen",
        emoji: "🧮",
        items: [
            {
                rule: "Basis Sama → Pangkat Tinggal Ditambah",
                tips: "Jika aᵐ × aⁿ, maka cukup tambahkan pangkatnya.",
                contoh: "2³ × 2⁴ = 2⁷ = 128"
            },
            {
                rule: "Pembagian Eksponen → Pangkat Dikurangkan",
                tips: "Jika aᵐ ÷ aⁿ, hitung m − n.",
                contoh: "5⁶ ÷ 5² = 5⁴ = 625"
            },
            {
                rule: "Pangkat dari Pangkat → Kalikan Pangkat",
                tips: "(aᵐ)ⁿ = aᵐⁿ",
                contoh: "(3²)³ = 3⁶"
            },
            {
                rule: "Eksponen Negatif → Jadikan Pecahan",
                tips: "a⁻ⁿ = 1 / aⁿ",
                contoh: "4⁻² = 1/16"
            },
            {
                rule: "Akar = Pangkat Pecahan",
                tips: "ⁿ√a = a¹⁄ⁿ",
                contoh: "√25 = 25¹⁄² = 5"
            }
        ]
    },

    /* =====================
       2. LOGARITMA
    ====================== */
    {
        title: "Logaritma",
        emoji: "📈",
        items: [
            {
                rule: "Ubah ke Bentuk Eksponen",
                tips: "logₐ b = c → aᶜ = b",
                contoh: "log₂ 32 = 5 → 2⁵=32"
            },
            {
                rule: "Logaritma Perkalian → Jumlahkan",
                tips: "log(xy) = log x + log y",
                contoh: "log(4×5) = log 20"
            },
            {
                rule: "Logaritma Pembagian → Kurangkan",
                tips: "log(x/y) = log x − log y",
                contoh: "log(8/2) = log 4"
            },
            {
                rule: "Pangkat Turun ke Depan",
                tips: "log(xᵏ) = k log x",
                contoh: "log(3²) = 2 log 3"
            },
            {
                rule: "Ganti Basis Logaritma",
                tips: "logₐ b = log b / log a",
                contoh: "log₂ 10 = log 10 / log 2"
            }
        ]
    },

    /* =====================
       3. BENTUK AKAR
    ====================== */
    {
        title: "Bentuk Akar",
        emoji: "🧊",
        items: [
            {
                rule: "Keluarkan Faktor Kuadrat Sempurna",
                tips: "Cari bilangan yang dapat di-√.",
                contoh: "√50 = √(25×2) = 5√2"
            },
            {
                rule: "Perkalian Akar → Akar dari Perkalian",
                tips: "√a × √b = √(ab)",
                contoh: "√8 × √2 = √16 = 4"
            },
            {
                rule: "Pembagian Akar",
                tips: "√(a/b) = √a / √b",
                contoh: "√(50/2) = √25 = 5"
            },
            {
                rule: "Rasionalisasi Penyebut",
                tips: "Kalikan dengan akar penyebut.",
                contoh: "1/√2 = (1×√2)/(√2×√2) = √2/2"
            },
            {
                rule: "Menggabungkan Akar-akar Sejenis",
                tips: "a√b + c√b = (a+c)√b",
                contoh: "3√2 + 5√2 = 8√2"
            }
        ]
    },

    /* =====================
       4. PERSAMAAN LINEAR
    ====================== */
    {
        title: "Persamaan Linear",
        emoji: "📏",
        items: [
            {
                rule: "Pindah Ruas → Tanda Berubah",
                tips: "Jika pindah dari kiri ke kanan atau sebaliknya, tanda + menjadi − atau sebaliknya.",
                contoh: "x + 5 = 12 → x = 12 − 5 = 7"
            },
            {
                rule: "Jika Mengalikan Kedua Ruas, Gunakan Bilangan yang Sama",
                tips: "Jangan ubah salah satu sisi saja.",
                contoh: "2x = 10 → x = 10/2 = 5"
            },
            {
                rule: "Gunakan Bentuk Sederhana",
                tips: "Satukan dulu x dengan x dan angka dengan angka.",
                contoh: "2x + 3x = 5x"
            },
            {
                rule: "Metode Cepat Persamaan Ax + B = C",
                tips: "x = (C − B)/A",
                contoh: "3x + 6 = 21 → x = (21−6)/3 = 5"
            },
            {
                rule: "Cek Kembali dengan Substitusi",
                tips: "Masukkan hasil ke persamaan awal.",
                contoh: "x=5 → 3(5)+6 = 21 ✔"
            }
        ]
    }

];
/* ==============================
   RENDER TRIK CEPAT
============================== */

function loadTrikCepat() {
    const c = document.getElementById("content");
    c.innerHTML = `<h2>Trik Cepat — Kelas 10</h2>`;

    trikCepat.forEach(m => {
        c.innerHTML += `
            <div class="block">
                <h3>${m.emoji} ${m.title}</h3>
                ${m.items.map(i => `
                    <div class="tip-item">
                        <b>${i.rule}</b><br>
                        <span>${i.tips}</span><br>
                        <i>Contoh: ${i.contoh}</i>
                        <hr>
                    </div>
                `).join('')}
            </div>
        `;
    });
}
/* ===================================================
   PART 4 — TRIK CEPAT (Materi 5–9)
=================================================== */

/* =====================
   5. PERTIDAKSAMAAN LINEAR
===================== */
trikCepat.push({
    title: "Pertidaksamaan Linear",
    emoji: "📐",
    items: [
        {
            rule: "Pindah ruas → tanda tetap",
            tips: "Sama seperti persamaan, pindah ruas hanya mengubah tanda + ↔ −.",
            contoh: "x + 7 > 10 → x > 3"
        },
        {
            rule: "Kali bilangan negatif → tanda DIBALIK",
            tips: "Ini aturan paling penting dalam pertidaksamaan!",
            contoh: "-2x > 8 → x < -4"
        },
        {
            rule: "Gabungkan variabel dan angka",
            tips: "Satukan semua x di satu sisi dan angka di sisi lain.",
            contoh: "3x - 5 ≥ 1 → 3x ≥ 6 → x ≥ 2"
        },
        {
            rule: "Gunakan garis bilangan",
            tips: "Sangat membantu untuk menentukan himpunan penyelesaian.",
            contoh: "x > 2 digambarkan sebagai titik terbuka di 2 → ke kanan"
        },
        {
            rule: "Jika bentuk pecahan → kalikan penyebut",
            tips: "Asal penyebut positif, tanda tidak berubah.",
            contoh: "(x + 4)/2 ≤ 6 → x + 4 ≤ 12 → x ≤ 8"
        }
    ]
});


/* =====================
   6. FUNGSI
===================== */
trikCepat.push({
    title: "Fungsi",
    emoji: "🔢",
    items: [
        {
            rule: "Masukkan x langsung ke f(x)",
            tips: "Jika f(x)=2x+3, maka f(5)=2(5)+3=13.",
            contoh: "f(2)=2(2)+3=7"
        },
        {
            rule: "Domain = nilai x yang boleh",
            tips: "Cek apakah penyebut ≠ 0 atau dalam akar nilai tidak negatif.",
            contoh: "f(x)=1/(x-2) → domain x ≠ 2"
        },
        {
            rule: "Range = nilai y yang mungkin",
            tips: "Gunakan pemahaman grafik atau penyelesaian aljabar.",
            contoh: "f(x)=x² → range y ≥ 0"
        },
        {
            rule: "Invers fungsi → tukar x dan y",
            tips: "Kemudian selesaikan untuk y.",
            contoh: "y=2x+1 → x=2y+1 → y=(x-1)/2"
        },
        {
            rule: "Komposisi fungsi cepat",
            tips: "g(f(x)) = g( hasil f(x) ).",
            contoh: "f(x)=2x, g(x)=x+3 → g(f(x))=2x+3"
        }
    ]
});


/* =====================
   7. FUNGSI KUADRAT
===================== */
trikCepat.push({
    title: "Fungsi Kuadrat",
    emoji: "🟩",
    items: [
        {
            rule: "Titik puncak cepat",
            tips: "Gunakan rumus xᵥ = -b/2a.",
            contoh: "y=x²-4x+3 → xᵥ=2"
        },
        {
            rule: "Menentukan arah parabola",
            tips: "Jika a>0 parabola membuka ke atas; jika a<0 ke bawah.",
            contoh: "y=2x² → membuka ke atas"
        },
        {
            rule: "Akar-akar cepat dengan D",
            tips: "Gunakan b²−4ac untuk melihat jumlah akar.",
            contoh: "D>0 → 2 akar real"
        },
        {
            rule: "Sumbu simetri",
            tips: "x = -b/(2a).",
            contoh: "y=3x²+6x+1 → x=-1"
        },
        {
            rule: "Menentukan nilai maksimum/minimum",
            tips: "Ambil nilai y di titik puncak.",
            contoh: "y pada xᵥ"
        }
    ]
});


/* =====================
   8. TRIGONOMETRI DASAR
===================== */
trikCepat.push({
    title: "Trigonometri Dasar",
    emoji: "📐",
    items: [
        {
            rule: "Ingat segitiga siku-siku",
            tips: "Gunakan SOH-CAH-TOA.",
            contoh: "sin θ = depan/miring"
        },
        {
            rule: "Identitas penting",
            tips: "sin²θ + cos²θ = 1",
            contoh: "Jika sinθ=3/5 → cosθ=4/5"
        },
        {
            rule: "Perbandingan trigono cepat",
            tips: "tan θ = sin θ / cos θ.",
            contoh: "tan = 3/4 ÷ 4/5 = 15/16"
        },
        {
            rule: "Gunakan tabel sudut istimewa",
            tips: "0°, 30°, 45°, 60°, 90°",
            contoh: "sin 30° = 1/2"
        },
        {
            rule: "Hubungan sudut komplementer",
            tips: "sin(90°−θ)=cosθ",
            contoh: "sin60°=cos30°"
        }
    ]
});


/* =====================
   9. BANGUN DATAR
===================== */
trikCepat.push({
    title: "Bangun Datar",
    emoji: "🔷",
    items: [
        {
            rule: "Persegi cepat",
            tips: "Jika sisi diketahui, luas = s² dan keliling = 4s.",
            contoh: "s=6 → L=36, K=24"
        },
        {
            rule: "Persegi panjang",
            tips: "L = p×l",
            contoh: "p=8, l=3 → L=24"
        },
        {
            rule: "Segitiga",
            tips: "L = ½ a t",
            contoh: "a=10, t=8 → L=40"
        },
        {
            rule: "Lingkaran",
            tips: "Gunakan π=22/7 jika r kelipatan 7.",
            contoh: "r=7 → L=154"
        },
        {
            rule: "Keliling lingkaran cepat",
            tips: "K=2πr",
            contoh: "r=14 → K=88"
        }
    ]
});
/* =====================================================
   PART 5 — INTEGRASI FINAL JS
   (NAVIGASI • SEARCH • DARK MODE • RENDER)
===================================================== */

/* -----------------------------
   1. NAVIGASI HALAMAN (SPA)
----------------------------- */

document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.dataset.target;
        loadPage(target);
    });
});

function loadPage(page) {
    const content = document.getElementById("content");

    if (page === "materi") {
        loadMateriList();
    }
    if (page === "latihan") {
        loadLatihanMenu();
    }
    if (page === "trik") {
        loadTrikCepat();
    }
    if (page === "about") {
        content.innerHTML = `
            <h2>Tentang Aplikasi</h2>
            <div class="block">
                Aplikasi ini membantu belajar matematika Kelas 10 SMA
                Kurikulum Merdeka, terdiri dari materi lengkap, latihan soal
                rutin & non rutin, serta trik cepat.
            </div>
        `;
    }

    window.scrollTo(0, 0);
}



/* -----------------------------
   2. SEARCH BAR (MENCARI MATERI)
----------------------------- */

const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("input", () => {
        const q = searchInput.value.toLowerCase();

        // langsung tampilkan materi yang cocok
        const content = document.getElementById("content");
        let result = `<h2>Hasil Pencarian</h2>`;

        materiListData.forEach(m => {
            if (
                m.title.toLowerCase().includes(q) ||
                m.keyword.includes(q)
            ) {
                result += `
                    <div class="item-box" onclick="showMateri(${m.id})">
                        ${m.icon} ${m.title}
                    </div>`;
            }
        });

        if (q.trim() === "") loadMateriList();
        else content.innerHTML = result;
    });
}



/* -----------------------------
   3. DARK MODE
----------------------------- */

document.getElementById("darkToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");

    // simpan preferensi
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("darkMode", isDark ? "1" : "0");
});

// load preferensi
if (localStorage.getItem("darkMode") === "1") {
    document.body.classList.add("dark");
}



/* -----------------------------
   4. LATIHAN SOAL — PILIH MATERI
----------------------------- */

function loadLatihanMenu() {
    const content = document.getElementById("content");

    content.innerHTML = `
        <h2>Pilih Materi Latihan</h2>

        ${latihanSemuaMateri.map(m => `
            <div class="item-box" onclick="loadLatihan(${m.id})">
                ${m.icon} ${m.title}
            </div>
        `).join("")}
    `;
}



/* -----------------------------
   5. LATIHAN SOAL — RENDER TIAP MATERI
----------------------------- */

function loadLatihan(id) {
    const content = document.getElementById("content");
    const materi = latihanSemuaMateri.find(m => m.id === id);

    content.innerHTML = `
        <h2>Latihan: ${materi.icon} ${materi.title}</h2>

        <div id="quizContainer"></div>

        <button class="back-btn" onclick="loadLatihanMenu()">Kembali</button>
    `;

    startQuiz(materi);
}



/* -----------------------------
   6. FUNGSI QUIZ
----------------------------- */

function startQuiz(materi) {
    const container = document.getElementById("quizContainer");
    let index = 0;

    function renderSoal() {
        const s = materi.soal[index];

        container.innerHTML = `
            <div class="block">
                <h3>Soal ${index + 1}/${materi.soal.length}</h3>
                <p>${s.q}</p>

                <input id="jawabanUser" class="input-jawab" placeholder="Tulis jawaban...">

                <button class="btn" onclick="cekJawaban()">Cek Jawaban</button>

                <div id="feedback" class="feedback"></div>
            </div>
        `;
    }

    window.cekJawaban = function () {
        const user = document.getElementById("jawabanUser").value.trim().toLowerCase();
        const s = materi.soal[index];

        const feedback = document.getElementById("feedback");

        if (user === s.jawab.toLowerCase()) {
            feedback.innerHTML = `
                <div class="benar">✔ Jawaban Benar!</div>
                <div class="penjelasan">${s.pembahasan}</div>
                <button class="btn" onclick="lanjut()">Lanjut Soal</button>
            `;
        } else {
            feedback.innerHTML = `<div class="salah">✘ Jawaban Salah, coba lagi!</div>`;
        }
    }

    window.lanjut = function () {
        index++;
        if (index >= materi.soal.length) {
            document.getElementById("quizContainer").innerHTML = `
                <div class="block">
                    <h3>🎉 Kuis Selesai!</h3>
                    <p>Kamu sudah menjawab semua soal.</p>
                    <button class="btn" onclick="loadLatihanMenu()">Kembali ke Menu</button>
                </div>
            `;
        } else {
            renderSoal();
        }
    }

    renderSoal();
}



/* =====================================================
   PART 5 SELESAI
===================================================== */
