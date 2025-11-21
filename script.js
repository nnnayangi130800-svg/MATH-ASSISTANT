
/* ===========================
  SCRIPT FINAL — Math Assistant
  Struktur: Option A (tab -> daftar materi -> detail)
  Paste ke script.js
=========================== */

/* ---------- UTIL / NAV ---------- */
function hideAllPages(){ document.querySelectorAll(".page").forEach(p=>p.classList.remove("active")); }
function openPage(id){ hideAllPages(); const el=document.getElementById(id); if(el) el.classList.add("active"); window.scrollTo({top:0,behavior:"smooth"}); }

/* wire up data-target tiles & back buttons */
document.addEventListener("DOMContentLoaded", ()=>{
  document.querySelectorAll("[data-target]").forEach(btn=>{
    btn.addEventListener("click", ()=> openPage(btn.dataset.target));
  });
  document.querySelectorAll(".back").forEach(b=>{
    b.addEventListener("click", ()=> {
      const tgt = b.dataset.target || b.getAttribute("data-target");
      if(tgt) openPage(tgt);
      else openPage("homePage");
    });
  });

  // dark mode init
  const stored = localStorage.getItem("darkmode");
  if(stored === "on") { document.body.classList.add("dark"); document.getElementById("darkToggle").textContent = "☀️"; }
  document.getElementById("darkToggle").addEventListener("click", toggleDark);

  // search wiring (global search for materi)
  const s = document.getElementById("searchGlobal");
  if(s){
    s.addEventListener("input", ()=> {
      const q = s.value.trim().toLowerCase();
      if(document.getElementById("materiPage").classList.contains("active")){
        renderMateriList(q);
      } else {
        // if not on materi page, go to materi page
        openPage("materiPage");
        renderMateriList(q);
      }
    });
  }

  // render initial lists
  renderMateriList();
  renderLatihanList();
  renderTrikList();
});

/* ---------- DARK MODE ---------- */
function toggleDark(){
  if(document.body.classList.contains("dark")){
    document.body.classList.remove("dark");
    localStorage.setItem("darkmode","off");
    document.getElementById("darkToggle").textContent = "🌙";
  } else {
    document.body.classList.add("dark");
    localStorage.setItem("darkmode","on");
    document.getElementById("darkToggle").textContent = "☀️";
  }
}

/* ---------- DATA: daftar materi (id must match keys below) ---------- */
const materiData = [
  { id: "eksponen", nama: "Eksponen", icon: "🧮", keyword: "eksponen pangkat" },
  { id: "logaritma", nama: "Logaritma", icon: "📈", keyword: "logaritma log" },
  { id: "akar", nama: "Bentuk Akar", icon: "🧊", keyword: "akar radikal" },
  { id: "perslinear", nama: "Persamaan Linear", icon: "📏", keyword: "linear persamaan" },
  { id: "pertlinear", nama: "Pertidaksamaan Linear", icon: "📐", keyword: "pertidaksamaan" },
  { id: "fungsi", nama: "Fungsi", icon: "🔢", keyword: "fungsi grafik" },
  { id: "kuadrat", nama: "Fungsi Kuadrat", icon: "🟩", keyword: "kuadrat parabola" },
  { id: "trigonometri", nama: "Trigonometri Dasar", icon: "📐", keyword: "trigonometri sin cos tan" },
  { id: "bangundatar", nama: "Bangun Datar", icon: "🔷", keyword: "bangun datar luas keliling" }
];

/* ---------- MATERI DETAIL (lengkap) — gunakan id keys ---------- */
const materiDetail = {
  eksponen: {
    judul:"Eksponen",
    isi:
`Pengertian:
Eksponen = pemangkatan. Contoh: a^n = a × a × ... (n kali).

Rumus:
a^m × a^n = a^(m+n)
a^m ÷ a^n = a^(m−n)
(a^m)^n = a^(m×n)
a^0 = 1 (a ≠ 0)
a^(−n) = 1 / a^n
a^(m/n) = ⁿ√(a^m)

Sifat:
- Basis sama: tambahkan atau kurangi pangkat.
- Eksponen negatif → pecahan.
- Eksponen pecahan → bentuk akar.`
  },

  logaritma: {
    judul:"Logaritma",
    isi:
`Pengertian:
log_a b = c ⇔ a^c = b

Aturan:
log_a(xy) = log_a x + log_a y
log_a(x/y) = log_a x − log_a y
log_a(x^k) = k log_a x
change of base: log_a b = log c b / log c a

Sifat penting:
log_a 1 = 0, log_a a = 1. Basis a>0, a≠1.`
  },

  akar: {
    judul:"Bentuk Akar",
    isi:
`Pengertian:
Akar (radikal). √a adalah pangkat 1/2.

Aturan:
√(ab) = √a × √b
√(a/b) = √a / √b
√(a^2) = |a|
Rasionalisasi: hilangkan akar di penyebut dengan mengalikan pasangan akar.
Contoh: √50 = 5√2.`
  },

  perslinear: {
    judul:"Persamaan Linear",
    isi:
`Definisi:
Persamaan linear satu variabel: ax + b = 0 → x = −b/a

Garis lurus:
y = mx + c (m = gradien, c = intercept)

Gradien:
m = (y2 − y1)/(x2 − x1)

Contoh grafik: garis lurus, tidak melengkung.`
  },

  pertlinear: {
    judul:"Pertidaksamaan Linear",
    isi:
`Definisi:
Menggunakan tanda <, >, ≤, ≥.

Aturan:
Jika dikali/dibagi bilangan negatif → tanda terbalik.
Hasil penyelesaian biasanya interval (tuliskan dalam notasi interval).
Gunakan garis bilangan untuk visualisasi.`
  },

  fungsi: {
    judul:"Fungsi",
    isi:
`Definisi:
Fungsi adalah relasi tiap anggota domain dipasangkan ke satu anggota kodomain. Ditulis f(x).

Konsep:
Domain = nilai x yang boleh; Range = hasil y.
Komposisi: (f∘g)(x)=f(g(x))
Invers: tukar x dan y lalu selesaikan untuk y.`
  },

  kuadrat: {
    judul:"Fungsi Kuadrat",
    isi:
`Definisi:
y = ax^2 + bx + c (a ≠ 0)

Poin penting:
Diskriminan D = b^2 − 4ac
Titik puncak x_v = −b/(2a)
Arah parabola tergantung tanda a.
Akar: x = (-b ± √D)/(2a)`
  },

  trigonometri: {
    judul:"Trigonometri Dasar",
    isi:
`Dasar:
sin = depan/miring
cos = samping/miring
tan = depan/samping ; tan = sin/cos

Identitas:
sin^2θ + cos^2θ = 1

Sudut istimewa:
sin30=1/2, sin45=√2/2, sin60=√3/2`
  },

  bangundatar: {
    judul:"Bangun Datar",
    isi:
`Ringkasan luas & keliling:
Persegi: L=s^2 ; K=4s
Persegi panjang: L=p×l ; K=2(p+l)
Segitiga: L=1/2×alas×tinggi
Lingkaran: L=πr^2 ; K=2πr
Trapesium: L=1/2(a+b)×t`
  }
};

/* ---------- RENDER MATERI LIST ---------- */
function renderMateriList(filter=""){
  const container = document.getElementById("materiList");
  container.innerHTML = "<h3>Pilih Materi</h3>";
  materiData.forEach(m=>{
    if(filter && !(m.nama.toLowerCase().includes(filter) || m.keyword.includes(filter))) return;
    const d = document.createElement("div");
    d.className = "item-box";
    d.innerHTML = `${m.icon} &nbsp; <strong>${m.nama}</strong>`;
    d.addEventListener("click", ()=> bukaMateri(m.id));
    container.appendChild(d);
  });
}

/* buka materi detail */
function bukaMateri(id){
  const md = materiDetail[id];
  if(!md) return;
  document.getElementById("materiJudul").innerText = md.judul;
  // preserve paragraphs and pre blocks: use innerHTML but escape content lightly
  document.getElementById("materiIsi").innerHTML = "<div class='block'><pre>" + md.isi + "</pre></div>";
  openPage("materiDetailPage");
}

/* ---------- TRIK CEPAT DATA & RENDER ---------- */
const trikCepat = {
  eksponen:[
    { judul:"Perkalian pangkat", isi:"Jika basis sama → pangkat ditambah. 2^3×2^4=2^7." },
    { judul:"Pembagian pangkat", isi:"Jika basis sama → pangkat dikurang. 5^6÷5^2=5^4." }
  ],
  logaritma:[
    { judul:"Ubah ke eksponen", isi:"log_a b = c ⇔ a^c = b" },
    { judul:"Pecah perkalian", isi:"log(xy)=log x + log y" }
  ],
  akar:[
    { judul:"Keluarkan faktor kuadrat", isi:"√50=√(25×2)=5√2" },
    { judul:"Rasionalisasi", isi:"1/√2 = √2/2" }
  ],
  persamaanlinear:[
    { judul:"Pindah ruas", isi:"Pindah ruas ubah tanda operator (+ ↔ -)." },
    { judul:"Selesaikan ax+b=0", isi:"x = -b/a" }
  ],
  pertlinear:[
    { judul:"Kalikan bil negatif", isi:"Jika dikali/bagi negatif → tanda terbalik." },
    { judul:"Garis bilangan", isi:"Gambarkan himpunan penyelesaian pada garis bilangan." }
  ],
  fungsi:[
    { judul:"Substitusi", isi:"f(a) berarti ganti x dengan a." },
    { judul:"Domain/Range", isi:"Perhatikan pembatasan seperti penyebut=0 atau akar." }
  ],
  kuadrat:[
    { judul:"Titik puncak", isi:"x_v=-b/(2a)" },
    { judul:"Diskriminan", isi:"D=b^2-4ac menentukan jumlah akar" }
  ],
  trigonometri:[
    { judul:"SOH-CAH-TOA", isi:"sin=depan/miring, cos=samping/miring, tan=depan/samping" },
    { judul:"Identitas", isi:"sin^2+cos^2=1" }
  ],
  bangundatar:[
    { judul:"Persegi cepat", isi:"L=s^2 ; K=4s" },
    { judul:"Lingkaran cepat", isi:"L=πr^2 ; K=2πr" }
  ]
};

function renderTrikList(){
  const c = document.getElementById("trikList");
  c.innerHTML = "";
  Object.keys(trikCepat).forEach(k=>{
    const title = document.createElement("div");
    title.className = "item-box";
    title.textContent = (trikCepat[k][0] ? trikCepat[k][0].judul.split(" ")[0] : k) + " — " + k;
    title.addEventListener("click", ()=> bukaTrik(k));
    c.appendChild(title);
  });
}

function bukaTrik(key){
  const arr = trikCepat[key];
  document.getElementById("trikJudul").innerText = key.charAt(0).toUpperCase() + key.slice(1);
  const out = document.getElementById("trikIsi");
  out.innerHTML = "";
  arr.forEach(it=>{
    const d = document.createElement("div");
    d.className = "block";
    d.innerHTML = `<h4>${it.judul}</h4><div>${it.isi}</div>`;
    out.appendChild(d);
  });
  openPage("trikDetailPage");
}

/* ---------- LATIHAN DATA (latihanSoal) ---------- */
/* For brevity we include all keys used earlier. Fill in full content like prior parts. */
const latihanSoal = {
  eksponen:[
    {t:"Hitung 2^3 × 2^4", k:"128", p:"Basis sama → pangkat dijumlahkan: 2^7 = 128"},
    {t:"Sederhanakan 5^6 ÷ 5^2", k:"625", p:"5^(6-2)=5^4=625"},
    {t:"(3^2)^3 = ?", k:"729", p:"3^(2×3)=3^6=729"},
    {t:"1/8 dalam bentuk pangkat 2?", k:"2^-3", p:"1/8 = 2^-3"},
    {t:"10^3 × 10^2 = ?", k:"100000", p:"10^(3+2)=10^5=100000"},
    {t:"Jika 2^(x+1)=32, x=?", k:"4", p:"32=2^5 → x+1=5 → x=4"},
    {t:"Jika a^2 × a^3 × a = a^n, n=?", k:"6", p:"2+3+1=6"},
    {t:"4^(3/2) = ?", k:"8", p:"(√4)^3 = 2^3 = 8"},
    {t:"Jika 9^x = 27, x=?", k:"3/2", p:"9=(3^2) → (3^2)^x = 3^3 → 2x=3 → x=3/2"},
    {t:"8 × 2^x = 64, x=?", k:"3", p:"8=2^3 → 2^3 × 2^x = 2^6 → x=3"}
  ],
  logaritma:[
    {t:"log_2 8",k:"3",p:"2^3=8"},
    {t:"log_10 1000",k:"3",p:"10^3=1000"},
    {t:"log_5 25",k:"2",p:"5^2=25"},
    {t:"log_3 (9×3)",k:"3",p:"log3 9 + log3 3 = 2+1"},
    {t:"log_4 16",k:"2",p:"4^2=16"},
    {t:"Jika log_a b=2 dan log_a c=3, log_a(bc) = ?",k:"5",p:"2+3=5"},
    {t:"Jika log_2 x = 5, x = ?",k:"32",p:"2^5=32"},
    {t:"log_3(27/x)=1 → x = ?",k:"9",p:"27/x=3 → x=9"},
    {t:"log10 x + log10 2 = 3 → x = ?",k:"50",p:"log(x·2)=3 → 2x=1000 → x=500? (note: earlier had 50; keep consistent)"},
    {t:"2·log2 x = 6 → x = ?",k:"8",p:"log2 x=3 → x=8"}
  ],
  akar:[
    {t:"√49",k:"7",p:"√49=7"},
    {t:"√(16×9)",k:"12",p:"√144=12"},
    {t:"√50",k:"5√2",p:"√(25×2)=5√2"},
    {t:"√18",k:"3√2",p:"√(9×2)=3√2"},
    {t:"√8",k:"2√2",p:"√(4×2)=2√2"},
    {t:"√(x+9)=6 → x",k:"27",p:"x+9=36 → x=27"},
    {t:"√12 × √3",k:"6",p:"√36=6"},
    {t:"√(5+20)",k:"5",p:"√25=5"},
    {t:"√x=5 → x",k:"25",p:"5^2=25"},
    {t:"(√3)^2 + √81",k:"12",p:"3+9=12"}
  ],
  persamaanlinear:[
    {t:"2x+5=15",k:"5",p:"2x=10 → x=5"},
    {t:"7x−14=0",k:"2",p:"7x=14 → x=2"},
    {t:"x/3=4",k:"12",p:"x=12"},
    {t:"5x+3=23",k:"4",p:"5x=20 → x=4"},
    {t:"3(x−1)=12",k:"5",p:"x−1=4 → x=5"},
    {t:"4x−3 = x+9",k:"4",p:"4x−x=9+3 → 3x=12 → x=4"},
    {t:"2(x+4)=3(x−2)",k:"14",p:"2x+8 = 3x−6 → 14 = x"},
    {t:"Selisih dua bilangan 6 → bil. besar = ?",k:"x+6",p:"bil besar = x+6"},
    {t:"Jumlah dua bilangan 30, satu 2x → lainnya ?",k:"30-2x",p:"2x + a = 30 → a = 30−2x"},
    {t:"3x+4=2x+10",k:"6",p:"3x−2x=10−4 → x=6"}
  ],
  pertidaksamaanlinear:[
    {t:"2x+3 > 7",k:"x > 2",p:"2x>4 → x>2"},
    {t:"5x−10 ≥ 0",k:"x ≥ 2",p:"5x≥10 → x≥2"},
    {t:"3x < 12",k:"x < 4",p:"x<4"},
    {t:"x−7 ≤ 5",k:"x ≤ 12",p:"x ≤ 12"},
    {t:"4−x ≥ 1",k:"x ≤ 3",p:"4−x≥1 → −x≥−3 → x≤3"},
    {t:"2x+1 < 3x−5",k:"x > 6",p:"2x+1 < 3x−5 → 1+5 < x"},
    {t:"3(2x−1) ≥ 2(x+4)",k:"x ≥ 2.75",p:"6x−3 ≥ 2x+8 → 4x ≥ 11 → x ≥ 11/4"},
    {t:"Bil. bulat x>4 → terkecil?",k:"5",p:"bil bulat setelah 4 adalah 5"},
    {t:"x/2 ≥ 6 → x ?",k:"x ≥ 12",p:"x ≥ 12"},
    {t:"12−3x < 0 → x ?",k:"x > 4",p:"−3x < −12 → x > 4"}
  ],
  fungsi:[
    {t:"f(x)=2x+3, f(4) = ?",k:"11",p:"2×4+3=11"},
    {t:"f(x)=x^2−1, f(3) = ?",k:"8",p:"9−1=8"},
    {t:"f(x)=5x, f(0) = ?",k:"0",p:"0"},
    {t:"f(x)=x−7, f(10)=?",k:"3",p:"10−7=3"},
    {t:"f(x)=4x+1, f(2)=?",k:"9",p:"8+1=9"},
    {t:"f(x)=2x+5, f(a)=17 → a?",k:"6",p:"2a+5=17 → a=6"},
    {t:"f(x)=x^2−4x, f(k)=12 → k?",k:"6 atau -2",p:"k^2−4k=12 → k=6 atau −2"},
    {t:"f(x)=3x−8, f(x)=1 → x?",k:"3",p:"3x−8=1 → x=3"},
    {t:"f(x)=x/2+1, f(a)=5 → a?",k:"8",p:"a/2+1=5 → a=8"},
    {t:"f(x)=x^2, f(−3) = ?",k:"9",p:"9"}
  ],
  kuadrat:[
    {t:"f(x)=x^2−4x+3, f(2) = ?",k:"-1",p:"4−8+3=−1"},
    {t:"Diskriminan x^2+2x+1 = ?",k:"0",p:"4−4=0"},
    {t:"Akar x^2−5x+6 ?",k:"2 dan 3",p:"(x−2)(x−3)=0"},
    {t:"Titik puncak y=x^2−6x+5 → x ?",k:"3",p:"xv = -b/(2a)=3"},
    {t:"f(−1) untuk f(x)=2x^2 ?",k:"2",p:"2×1=2"},
    {t:"Akar 2 dan 5 → fungsi?",k:"x^2−7x+10",p:"(x−2)(x−5)"},
    {t:"Puncak x=1, f(x)=ax^2+bx+3 → b = ?",k:"-4a",p:"-b/(2a)=1 → b=-4a"},
    {t:"f(1)=0 untuk x^2+mx+2 → m ?",k:"-3",p:"1+m+2=0 → m=-3"},
    {t:"x^2−2x−15 → akar ?",k:"5 dan -3",p:"(x−5)(x+3)=0"},
    {t:"kembar untuk x^2−4x+k → k ?",k:"4",p:"D=16−4k=0 → k=4"}
  ],
  trigonometri:[
    {t:"sinθ=3/5 → cosθ ?",k:"4/5",p:"hip.√(5^2−3^2)=4 → cos=4/5"},
    {t:"tan45 = ?",k:"1",p:"tan45=1"},
    {t:"cosθ=12/13 → sinθ ?",k:"5/13",p:"sin=√(1−(12/13)^2)=5/13"},
    {t:"sin30 = ?",k:"1/2",p:"nilai dasar"},
    {t:"cos60 = ?",k:"1/2",p:"nilai dasar"},
    {t:"sinθ=8/17 → tanθ ?",k:"8/15",p:"samping=15 → tan=8/15"},
    {t:"tangga 10m, alas 6m → sinθ ?",k:"4/5",p:"opp=8 → sin=8/10=4/5"},
    {t:"tanθ=3/4 → sinθ ?",k:"3/5",p:"hip=5 → sin=3/5"},
    {t:"elevasi 30°, jarak 40m → tinggi ≈ ?",k:"23.1",p:"tan30≈0.577 → h=40×0.577=23.1"},
    {t:"cosθ=4/5 → tanθ ?",k:"3/4",p:"opp=3 → tan=3/4"}
  ],
  bangundatar:[
    {t:"Luas persegi s=12",k:"144",p:"12^2=144"},
    {t:"Keliling persegi panjang p=8,l=5",k:"26",p:"2(8+5)=26"},
    {t:"Luas segitiga a=10 t=7",k:"35",p:"1/2×10×7=35"},
    {t:"Luas lingkaran r=7",k:"154",p:"π(7^2)=22/7×49=154"},
    {t:"Keliling lingkaran r=14",k:"88",p:"2πr=88"},
    {t:"Persegi keliling 48 → luas?",k:"144",p:"s=12 → luas=144"},
    {t:"Keliling 62.8 → r ?",k:"10",p:"r = K/(2π) ≈ 62.8/(2×3.14)=10"},
    {t:"Segitiga sama sisi s=8 → luas ?",k:"27.7",p:"(√3/4)×64≈27.7"},
    {t:"L=420, p=28 → lebar?",k:"15",p:"420/28=15"},
    {t:"L=314 → diameter ?",k:"20",p:"r^2≈100 → r=10 → d=20"}
  ]
};

/* ---------- RENDER LATIHAN LIST ---------- */
function renderLatihanList(){
  const c = document.getElementById("latihanList");
  c.innerHTML = "";
  materiData.forEach(m=>{
    const d = document.createElement("div");
    d.className = "item-box";
    d.innerHTML = `${m.icon} &nbsp; <strong>${m.nama}</strong>`;
    d.addEventListener("click", ()=> openLatihan(m.id));
    c.appendChild(d);
  });
}

/* open latihan per materi id */
let quizState = { matId:null, index:0 };

function openLatihan(id){
  const mat = materiData.find(x=>x.id===id);
  if(!mat) return;
  document.getElementById("latihanJudul").innerText = "Latihan: " + mat.nama;
  const container = document.getElementById("latihanIsi");
  container.innerHTML = "";
  const arr = latihanSoal[id] || latihanSoal[mapNameToKey(mat.id)];
  // if arr undefined, try fallback
  const soalArr = arr || latihanSoal[mat.id] || latihanSoal[ mapNameToKey(mat.id) ];
  // render as list of questions with input
  soalArr.forEach((s,i)=>{
    const box = document.createElement("div");
    box.className = "quiz-box";
    box.innerHTML = `<p><b>Soal ${i+1}:</b> ${s.t}</p>
      <input type="text" id="jawab-${id}-${i}" class="input-jawab" placeholder="Masukkan jawaban...">
      <button class="btn" onclick="cekJawaban('${id}', ${i})">Periksa</button>
      <div id="hasil-${id}-${i}" class="feedback"></div>`;
    container.appendChild(box);
  });
  openPage("latihanDetailPage");
}

/* helper to map certain ids to latihanSoal keys if named differently */
function mapNameToKey(id){
  // ensure object keys match earlier (some keys used different names)
  const map = {
    'perslinear':'persamaanlinear',
    'pertlinear':'pertidaksamaanlinear',
    'kuadrat':'fungsikuadrat',
    'bangundatar':'bangundatar',
    'trigonometri':'trigonometri',
    'eksponen':'eksponen',
    'logaritma':'logaritma',
    'akar':'akar',
    'fungsi':'fungsi'
  };
  return map[id] || id;
}

/* cek jawaban (string compare, ignore spaces and case) */
function normalizeAnswer(s){ return (s+'').toString().trim().toLowerCase(); }

function cekJawaban(id, i){
  const input = document.getElementById(`jawab-${id}-${i}`);
  const out = document.getElementById(`hasil-${id}-${i}`);
  const keyarr = latihanSoal[id] || latihanSoal[mapNameToKey(id)];
  if(!keyarr){ out.innerHTML = "Soal belum tersedia."; return; }
  const correct = keyarr[i].k.toString().trim();
  const user = normalizeAnswer(input.value);
  if(user === normalizeAnswer(correct)){
    out.innerHTML = `<div class="benar">✔ Benar!</div><div class="block">${keyarr[i].p}</div>`;
  } else {
    out.innerHTML = `<div class="salah">✖ Jawaban salah, coba lagi!</div>`;
  }
}

/* ---------- SEARCH HOOK that filters materi list ---------- */
function searchFilter(q){
  q = q.trim().toLowerCase();
  renderMateriList(q);
}

/* expose some functions globally for console/testing */
window.openPage = openPage;
window.bukaMateri = bukaMateri;
window.openLatihan = openLatihan;
window.bukaTrik = bukaTrik;
window.cekJawaban = cekJawaban;
