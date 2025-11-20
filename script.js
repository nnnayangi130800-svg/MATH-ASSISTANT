
// PART 1: Core app + merge helper
// - Provides navigation, dark mode, search, render functions
// - Provides mergeMaterials(moduleObj) to append PART 2..5 (MATERIALS modules)
// - Minimal sample MATERIALS empty (will be extended by later parts)

// ---------- CORE (initial empty materials) ----------
window.MATERIALS = {}; // will be populated by PART 2..5 via mergeMaterials()

let quizState = null;
function el(id){ return document.getElementById(id); }
function openPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const elp = document.getElementById(id);
  if(elp) elp.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}

// ---------- Navigation ----------
document.querySelectorAll('.tile').forEach(btn=>{
  btn.addEventListener('click', ()=> openPage(btn.dataset.target));
});
document.querySelectorAll('.back').forEach(b=>{
  b.addEventListener('click', ()=> {
    const target = b.dataset.target || 'homePage';
    openPage(target);
  });
});

// ---------- Dark mode ----------
const darkToggle = el('darkToggle');
darkToggle.addEventListener('click', ()=>{
  document.body.classList.toggle('dark');
  darkToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  localStorage.setItem('math_dark', document.body.classList.contains('dark') ? '1' : '0');
});
if(localStorage.getItem('math_dark')==='1'){ document.body.classList.add('dark'); darkToggle.textContent='☀️'; }

// ---------- Search ----------
el('searchBar').addEventListener('input', ()=>{
  const q = el('searchBar').value.trim().toLowerCase();
  document.querySelectorAll('#materiList .card').forEach(card=>{
    card.style.display = card.innerText.toLowerCase().includes(q) ? 'flex' : 'none';
  });
});

// ---------- Render functions (will use window.MATERIALS) ----------
function renderMaterials(){
  const list = el('materiList'); list.innerHTML = '';
  Object.keys(window.MATERIALS).forEach(key=>{
    const d = window.MATERIALS[key];
    const card = document.createElement('div'); card.className = 'card';
    card.innerHTML = `<div class="icon">${d.icon || '📘'}</div>
                      <div><div class="title-small">${key}</div><div class="subtitle">Klik untuk buka materi lengkap</div></div>`;
    card.addEventListener('click', ()=> {
      el('materiDetail').innerHTML = d.content || '<p>Materi kosong.</p>';
      openPage('materiDetailPage');
      // auto-draw graphs if present (modules can set flags)
      if(typeof d.onOpen === 'function') try{ d.onOpen(); } catch(e){ console.warn(e); }
    });
    list.appendChild(card);
  });
}

function renderLatihanList(){
  const list = el('latihanList'); list.innerHTML = '';
  Object.keys(window.MATERIALS).forEach(key=>{
    const d = window.MATERIALS[key];
    const card = document.createElement('div'); card.className='card';
    card.innerHTML = `<div class="icon">${d.icon || '📝'}</div>
                      <div><div class="title-small">${key}</div><div class="subtitle">Klik untuk mulai kuis (5 rutin + 5 non-rutin)</div></div>`;
    card.addEventListener('click', ()=> {
      startQuizForTopic(key);
      openPage('latihanDetailPage');
    });
    list.appendChild(card);
  });
}

function renderTrikList(){
  const cont = el('trikList'); cont.innerHTML = '';
  Object.keys(window.MATERIALS).forEach(key=>{
    const tip = (window.MATERIALS[key] && window.MATERIALS[key].trick) ? window.MATERIALS[key].trick : 'Baca materi untuk trik cepat.';
    const div = document.createElement('div'); div.className='tip';
    div.innerHTML = `<strong>${key}</strong><div style="margin-top:6px">${tip}</div>`;
    cont.appendChild(div);
  });
}

// ---------- merge helper (use this to add PART 2..5 modules) ----------
/*
  Usage:
    // each PART (2..5) should call:
    mergeMaterials({
      "Eksponen": { icon: "🔢", content: "...", quiz: { routine: [...], nonroutine: [...] }, trick: "..." , onOpen: function(){ ... } },
      "Logaritma": { ... }
    });

  mergeMaterials will:
  - add/overwrite keys into window.MATERIALS
  - re-render lists (Materi, Latihan, Trik)
*/
function mergeMaterials(moduleObj){
  if(!moduleObj || typeof moduleObj !== 'object') return;
  Object.keys(moduleObj).forEach(k=>{
    window.MATERIALS[k] = moduleObj[k];
  });
  // re-render UI lists
  renderMaterials();
  renderLatihanList();
  renderTrikList();
  console.log('mergeMaterials: added', Object.keys(moduleObj));
}

// ---------- QUIZ engine (re-usable) ----------
let quizState = null;

function startQuizForTopic(topic){
  const item = window.MATERIALS[topic];
  if(!item || (!item.quiz || (!item.quiz.routine.length && !item.quiz.nonroutine.length))){
    el('latihanDetail').innerHTML = `<div class="block"><p>Latihan untuk "${topic}" belum tersedia.</p></div>`;
    el('quizArea').style.display = 'none';
    return;
  }
  // build pool
  const pool = [];
  item.quiz.routine.forEach(q=> pool.push({...q, type:'routine'}));
  item.quiz.nonroutine.forEach(q=> pool.push({...q, type:'non'}));
  // fill to 10 if necessary (fallback)
  if(pool.length < 10){
    const copy = pool.slice();
    let i = 0;
    while(pool.length < 10 && copy.length){
      pool.push({...copy[i % copy.length]});
      i++;
    }
  }
  // shuffle
  for(let i=pool.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [pool[i],pool[j]]=[pool[j],pool[i]]; }

  quizState = { topic, pool, idx:0, score:0 };
  renderQuizQuestion();
  el('quizArea').style.display = 'block';
  el('latihanDetail').innerHTML = `<div class="block"><h2>Kuis: ${topic}</h2><p>Jawaban benar menampilkan penjelasan rinci; salah → coba lagi.</p></div>`;
}

function renderQuizQuestion(){
  const area = el('quizArea'); area.innerHTML = '';
  const qobj = quizState.pool[quizState.idx];
  const container = document.createElement('div'); container.className='block';
  container.innerHTML = `<div class="quiz-question">[${quizState.idx+1}/${quizState.pool.length}] ${qobj.q}</div>`;
  const choicesDiv = document.createElement('div'); choicesDiv.className='choices';
  qobj.choices.forEach((c,i)=>{
    const b = document.createElement('button'); b.className='choice-btn'; b.textContent = c;
    b.addEventListener('click', ()=>{
      if(b.classList.contains('correct') || b.classList.contains('wrong')) return;
      if(i === qobj.correct){
        b.classList.add('correct');
        const explain = document.createElement('div');
        explain.innerHTML = `<div style="padding:10px;border-radius:8px;background:#e6ffed;border:1px solid #8ef0a0"><strong>Benar!</strong><div style="margin-top:8px">${qobj.explain}</div></div>`;
        container.appendChild(explain);
        const next = document.createElement('button'); next.className='show-btn'; next.textContent = (quizState.idx < quizState.pool.length-1) ? 'Soal berikutnya' : 'Selesai';
        next.addEventListener('click', ()=>{
          if(quizState.idx < quizState.pool.length-1){ quizState.idx++; renderQuizQuestion(); }
          else { showQuizResult(); }
        });
        container.appendChild(next);
        quizState.score++;
      } else {
        b.classList.add('wrong');
        const hint = document.createElement('div');
        hint.innerHTML = `<div style="padding:10px;border-radius:8px;background:#fff0f0;border:1px solid #f1a1a1"><strong>Salah — coba lagi</strong></div>`;
        container.appendChild(hint);
      }
    });
    choicesDiv.appendChild(b);
  });
  container.appendChild(choicesDiv);
  area.appendChild(container);
}

function showQuizResult(){
  el('quizArea').innerHTML = `<div class="block"><h2>Hasil Kuis: ${quizState.topic}</h2><p>Skor: ${quizState.score} / ${quizState.pool.length}</p><p>Tekan kembali untuk pilih topik lain.</p></div>`;
}

// ---------- Simple graph helpers for modules to call (optional) ----------
function drawExponentialSample(targetId='expoGraph'){
  const g = document.getElementById(targetId); if(!g) return;
  g.innerHTML = ''; const svgNS='http://www.w3.org/2000/svg'; const svg=document.createElementNS(svgNS,'svg');
  svg.setAttribute('viewBox','0 0 220 120'); svg.setAttribute('width','100%'); svg.setAttribute('height','120');
  const ax=document.createElementNS(svgNS,'line'); ax.setAttribute('x1','10'); ax.setAttribute('y1','100'); ax.setAttribute('x2','210'); ax.setAttribute('y2','100'); ax.setAttribute('stroke','#ddd'); svg.appendChild(ax);
  const ay=document.createElementNS(svgNS,'line'); ay.setAttribute('x1','40'); ay.setAttribute('y1','10'); ay.setAttribute('x2','40'); ay.setAttribute('y2','100'); ay.setAttribute('stroke','#ddd'); svg.appendChild(ay);
  let d=''; for(let px=0; px<=160; px++){ const x=(px/16)*5; const yval=Math.pow(2,x/5); const py=100 - Math.min(90, Math.log2(yval)*12); const sx=40+px; d += (px===0?'M':' L') + sx + ' ' + py; }
  const path=document.createElementNS(svgNS,'path'); path.setAttribute('d',d); path.setAttribute('stroke','#457B9D'); path.setAttribute('fill','none'); path.setAttribute('stroke-width','2'); svg.appendChild(path);
  g.appendChild(svg);
}
function drawQuadraticSample(targetId='quadGraph'){
  const g = document.getElementById(targetId); if(!g) return;
  g.innerHTML=''; const svgNS='http://www.w3.org/2000/svg'; const svg=document.createElementNS(svgNS,'svg');
  svg.setAttribute('viewBox','0 0 220 120'); svg.setAttribute('width','100%'); svg.setAttribute('height','120');
  const axis=document.createElementNS(svgNS,'line'); axis.setAttribute('x1','10'); axis.setAttribute('y1','60'); axis.setAttribute('x2','210'); axis.setAttribute('y2','60'); axis.setAttribute('stroke','#eee'); svg.appendChild(axis);
  let pathD=''; for(let px=0; px<=200; px+=2){ const x=(px-100)/10; const y=x*x - 4*x + 3; const py=60 - (y*4); pathD += (px===0?'M':'L') + (10+px) + ' ' + py; }
  const path=document.createElementNS(svgNS,'path'); path.setAttribute('d',pathD); path.setAttribute('stroke','#3A7D44'); path.setAttribute('fill','none'); path.setAttribute('stroke-width','2'); svg.appendChild(path);
  g.appendChild(svg);
}

// ---------- initial render (empty) ----------
renderMaterials();
renderLatihanList();
renderTrikList();
openPage('homePage');

// ---------- Developer note ----------
console.log('PART 1 loaded. Use mergeMaterials(moduleObj) to add PART 2..5 content (MATERIALS).');
/* ============================================================
   PART 2 — MATERI LENGKAP KELAS 10 (KURIKULUM MERDEKA)
   Materi 1–3: Eksponen, Logaritma, Bentuk Akar
   ============================================================ */

/* ------------------------------------------------------------
   MATERI 1 — EKSPONEN
   ------------------------------------------------------------ */
materials.eksponen = {
    title: "Eksponen",
    emoji: "𝑥²",
    sections: [
        {
            heading: "Pengertian Eksponen",
            content: `
Eksponen adalah bentuk penulisan yang menyatakan perkalian berulang dari suatu bilangan.

Jika a bilangan real dan n bilangan bulat positif, maka:

    aⁿ = a × a × a × ... × a (sebanyak n kali)

Contoh:
    3⁴ = 3 × 3 × 3 × 3 = 81

Eksponen sangat penting dalam matematika karena dipakai untuk:  
• pertumbuhan (eksponensial)  
• fungsi matematika tingkat lanjut  
• persamaan ilmiah  
• perhitungan skala besar  
`
        },
        {
            heading: "Sifat-Sifat Eksponen",
            content: `
Beberapa sifat eksponen penting:

1. aᵐ × aⁿ = aᵐ⁺ⁿ  
2. aᵐ ÷ aⁿ = aᵐ⁻ⁿ  
3. (aᵐ)ⁿ = aᵐⁿ  
4. (ab)ⁿ = aⁿ bⁿ  
5. (a/b)ⁿ = aⁿ / bⁿ  
6. a⁰ = 1 (a ≠ 0)  
7. a⁻ⁿ = 1 / aⁿ  
`
        },
        {
            heading: "Eksponen dalam Grafik",
            content: `
Fungsi bentuk y = aˣ memiliki karakteristik:

• Jika a > 1 → grafik naik (eksponensial meningkat)  
• Jika 0 < a < 1 → grafik turun (eksponensial menurun)

Contoh grafik umum:
y = 2ˣ → grafik cepat naik  
y = (1/2)ˣ → grafik menurun
`
        }
    ]
};

quizzes.eksponen = {
    routine: [
        {
            q: "Hitung nilai 2³ × 2⁵",
            a: "2⁸ = 256",
            steps: "Gunakan sifat aᵐ × aⁿ = aᵐ⁺ⁿ → 2³×2⁵ = 2⁸ = 256"
        },
        {
            q: "Sederhanakan 5⁷ ÷ 5²",
            a: "5⁵ = 3125",
            steps: "Gunakan sifat aᵐ ÷ aⁿ = aᵐ⁻ⁿ → 5⁷ ÷ 5² = 5⁵"
        },
        {
            q: "Hitung nilai (3²)³",
            a: "3⁶ = 729",
            steps: "(aᵐ)ⁿ = aᵐⁿ → (3²)³ = 3⁶"
        },
        {
            q: "Sederhanakan 4⁻²",
            a: "1/16",
            steps: "a⁻ⁿ = 1/aⁿ → 4⁻² = 1/4²"
        },
        {
            q: "Hitung nilai 10³ × 10⁻¹",
            a: "10² = 100",
            steps: "aᵐ × aⁿ = aᵐ⁺ⁿ → 10³ × 10⁻¹ = 10²"
        }
    ],

    nonRoutine: [
        {
            q: "Jika 2ˣ = 32, tentukan x!",
            a: "x = 5",
            steps: "32 = 2⁵ → maka x = 5"
        },
        {
            q: "Jika 5ˣ × 5² = 125, cari x.",
            a: "x = 1",
            steps: "125 = 5³ → x+2 = 3 → x=1"
        },
        {
            q: "Budi menabung, uangnya bertambah 2 kali lipat setiap tahun. Jika awalnya 500 ribu, berapa tahun sampai menjadi 4 juta?",
            a: "3 tahun",
            steps: "500k × 2ⁿ = 4 juta → 2ⁿ = 8 → n = 3"
        },
        {
            q: "Mesin menghasilkan bakteri bertambah 3 kali setiap jam. Awalnya 10 bakteri. Hitung jumlah setelah 4 jam.",
            a: "810 bakteri",
            steps: "10 × 3⁴ = 810"
        },
        {
            q: "Jika (x²)(x³) = 1000, berapa nilai x?",
            a: "x = 10",
            steps: "x⁵ = 100000 → x = 10"
        }
    ]
};

tricks.eksponen = [
    "Jika basis sama dan dikalikan → pangkat dijumlahkan.",
    "Jika basis sama dan dibagi → pangkat dikurangkan.",
    "Jika pangkat dipangkatkan → pangkat dikalikan.",
    "a⁰ selalu = 1.",
    "a⁻ⁿ = 1/aⁿ memudahkan perhitungan."
];

/* ------------------------------------------------------------
   MATERI 2 — LOGARITMA
   ------------------------------------------------------------ */
materials.logaritma = {
    title: "Logaritma",
    emoji: "🔢",
    sections: [
        {
            heading: "Pengertian Logaritma",
            content: `
Logaritma adalah kebalikan dari eksponen.

Jika aᵇ = c, maka logₐ(c) = b.

Contoh:
10² = 100 → log₁₀(100) = 2
`
        },
        {
            heading: "Sifat-Sifat Logaritma",
            content: `
1. logₐ(1) = 0  
2. logₐ(a) = 1  
3. logₐ(bc) = logₐ b + logₐ c  
4. logₐ(b/c) = logₐ b - logₐ c  
5. logₐ(bⁿ) = n logₐ b  
6. Perubahan basis: logₐ b = (log c b) / (log c a)
`
        },
        {
            heading: "Hubungan Eksponen dan Logaritma",
            content: `
Jika aˣ = b → x = logₐ(b)

Ini dipakai untuk:
• mencari pangkat  
• menyelesaikan pertumbuhan  
• grafik fungsi logaritma  
`
        }
    ]
};

quizzes.logaritma = {
    routine: [
        {
            q: "Hitung log₁₀(1000)",
            a: "3",
            steps: "1000 = 10³ → log₁₀(1000) = 3"
        },
        {
            q: "Hitung log₂(8)",
            a: "3",
            steps: "8 = 2³ → log₂(8)=3"
        },
        {
            q: "Hitung log₅(25)",
            a: "2",
            steps: "25 = 5² → log₅(25)=2"
        },
        {
            q: "Hitung log₄(16)",
            a: "2",
            steps: "16 = 4²"
        },
        {
            q: "Hitung log₃(1)",
            a: "0",
            steps: "logₐ(1)=0"
        }
    ],
    nonRoutine: [
        {
            q: "Jika logₐ(49) = 2 logₐ(7), benar atau salah?",
            a: "Benar",
            steps: "49 = 7² → logₐ(49)=2 logₐ(7)"
        },
        {
            q: "Jika 3ˣ = 81, tentukan log₃(81).",
            a: "4",
            steps: "81=3⁴"
        },
        {
            q: "Jika log₂(x)=5, tentukan x.",
            a: "32",
            steps: "x=2⁵"
        },
        {
            q: "Tentukan nilai log₉(27).",
            a: "3/2",
            steps: "27 = 3³, 9 = 3² → log₉(27)=3/2"
        },
        {
            q: "Jika logₐ(b)=2 dan logₐ(c)=3, hitung logₐ(bc²).",
            a: "8",
            steps: "log(b) + 2log(c) = 2 + 6 = 8"
        }
    ]
};

tricks.logaritma = [
    "logₐ(1) selalu = 0.",
    "logₐ(a) selalu = 1.",
    "log(bc) → pecah jadi log b + log c.",
    "log(b/c) → log b − log c.",
    "Jika aˣ = b → x = logₐ(b)."
];

/* ------------------------------------------------------------
   MATERI 3 — BENTUK AKAR
   ------------------------------------------------------------ */
materials.akar = {
    title: "Bentuk Akar",
    emoji: "√",
    sections: [
        {
            heading: "Pengertian Bentuk Akar",
            content: `
Bentuk akar adalah bentuk bilangan yang masih memiliki tanda √.

Contoh:
√2, √5, √7

Bentuk akar tidak dapat disederhanakan kecuali mengandung faktor kuadrat.
`
        },
        {
            heading: "Sifat-Sifat Bentuk Akar",
            content: `
1. √(ab) = √a √b  
2. √(a/b) = √a / √b  
3. a√b × c√d = ac √(bd)  
4. √a × √a = a  
5. Untuk menyederhanakan: cari faktor kuadrat terbesar  
`
        },
        {
            heading: "Rasionalisasi Penyebut",
            content: `
Jika penyebut mengandung akar, ubah menjadi bilangan rasional.

Contoh:
1 / √3 = √3 / 3  
`
        }
    ]
};

quizzes.akar = {
    routine: [
        {
            q: "Sederhanakan √50",
            a: "5√2",
            steps: "50 = 25×2 → √50 = √25√2 = 5√2"
        },
        {
            q: "Sederhanakan √72",
            a: "6√2",
            steps: "72 = 36×2 → √72 = 6√2"
        },
        {
            q: "Sederhanakan √32",
            a: "4√2",
            steps: "32 = 16×2 → √32 = 4√2"
        },
        {
            q: "Sederhanakan √18",
            a: "3√2",
            steps: "18=9×2 → 3√2"
        },
        {
            q: "Rasionalkan 1/√5",
            a: "√5/5",
            steps: "Kali √5/√5"
        }
    ],
    nonRoutine: [
        {
            q: "Jika luas persegi = 98 cm², tentukan panjang sisi.",
            a: "7√2",
            steps: "s = √98 = √49×2 = 7√2"
        },
        {
            q: "Tentukan nilai √8 × √12",
            a: "4√6",
            steps: "√96 = √16×6 = 4√6"
        },
        {
            q: "Sederhanakan √(5/8)",
            a: "√10 / 4",
            steps: "√5/√8 = √5/(2√2) → rasionalkan"
        },
        {
            q: "Hitung 2√3 × 3√6",
            a: "6√18 = 18√2",
            steps: "2×3 √(3×6) = 6√18 = 18√2"
        },
        {
            q: "Jika keliling persegi = 16√3, tentukan luasnya.",
            a: "48",
            steps: "s = 4√3 → s² = 48"
        }
    ]
};

tricks.akar = [
    "Selalu cari faktor kuadrat terbesar.",
    "√a × √a = a — dipakai untuk menyederhanakan.",
    "Untuk rasionalkan penyebut, kalikan dengan pasangan akarnya.",
    "Jika √(ab), pecah menjadi √a √b.",
    "Jika √(a/b), pisah jadi √a / √b."
];
// =======================
// MATERI 4 — BENTUK AKAR
// =======================

const materi4 = `
<h2>4. Bentuk Akar (Radikal)</h2>

<p>Bentuk akar adalah bentuk bilangan yang melibatkan tanda akar √. 
Bentuk ini sering digunakan untuk menyatakan hasil bilangan yang tidak dapat disederhanakan ke bentuk bilangan rasional.</p>

<h3>a. Pengertian Bentuk Akar</h3>
<p>Bentuk akar adalah ekspresi matematika yang menggunakan simbol √ untuk menyatakan akar suatu bilangan.
Contoh: √2, √3, √5.</p>

<h3>b. Sifat-sifat Bentuk Akar</h3>
<ul>
<li>√a × √b = √(ab)</li>
<li>√a ÷ √b = √(a/b)</li>
<li>(√a)<sup>2</sup> = a</li>
<li>a√b = √(a²b)</li>
</ul>

<h3>c. Menyederhanakan Bentuk Akar</h3>
<p>Contoh: √75 → √(25 × 3) = 5√3</p>

<h3>d. Operasi Penjumlahan & Pengurangan</h3>
<p>Bentuk akar hanya dapat dijumlahkan jika akar sejenis.</p>
<p>Contoh: 3√2 + 5√2 = 8√2</p>

<h3>e. Operasi Perkalian</h3>
<p>Contoh: √3 × √12 = √36 = 6</p>

<h3>f. Operasi Pembagian</h3>
<p>Contoh: √50 / √2 = √25 = 5</p>

<h3>g. Merasionalkan Penyebut</h3>
<p>Contoh: 5 / √3 → (5√3)/3</p>
`;

function tampilMateri4() {
    document.getElementById("content").innerHTML = materi4;
}
// ==========================
// MATERI 5 — PERSAMAAN LINEAR
// ==========================

const materi5 = `
<h2>5. Persamaan Linear</h2>

<p>Persamaan linear adalah persamaan yang variabelnya berpangkat satu dan dapat diselesaikan menggunakan operasi dasar.</p>

<h3>a. Bentuk Umum</h3>
<p>ax + b = 0, dengan a ≠ 0</p>

<h3>b. Cara Menyelesaikan</h3>
<p>Pindahkan variabel ke satu sisi dan konstanta ke sisi lain.</p>

<p>Contoh:<br>
3x + 9 = 0<br>
3x = -9<br>
x = -3</p>

<h3>c. Penerapan Dalam Kehidupan</h3>
<p>Persamaan linear digunakan untuk menyelesaikan masalah finansial, jarak, waktu, kecepatan, dan perbandingan.</p>

<h3>d. Grafik Persamaan Linear</h3>
<p>Bentuk grafik adalah garis lurus dengan gradien m = a dan titik potong b.</p>
`;

function tampilMateri5() {
    document.getElementById("content").innerHTML = materi5;
}
// ===============================
// MATERI 6 — PERTIDAKSAMAAN LINEAR
// ===============================

const materi6 = `
<h2>6. Pertidaksamaan Linear</h2>

<p>Pertidaksamaan linear adalah kalimat matematika yang menggunakan tanda &lt;, &gt;, ≤, atau ≥ dengan variabel pangkat satu.</p>

<h3>a. Contoh Bentuk Umum</h3>
<p>ax + b &gt; 0</p>

<h3>b. Aturan Penyelesaian</h3>
<ul>
<li>Jika dikali atau dibagi bilangan negatif, tanda pertidaksamaan dibalik.</li>
<li>Dapat diselesaikan seperti persamaan linear.</li>
</ul>

<h3>c. Contoh Penyelesaian</h3>
<p>2x - 4 &gt; 6<br>
2x &gt; 10<br>
x &gt; 5</p>

<h3>d. Grafik Pada Garis Bilangan</h3>
<p>Gunakan titik terbuka untuk &lt; dan &gt;, titik tertutup untuk ≤ dan ≥.</p>
`;

function tampilMateri6() {
    document.getElementById("content").innerHTML = materi6;
}
// =======================
// MATERI 7 — FUNGSI
// =======================

const materi7 = `
<h2>7. Fungsi</h2>

<p>Fungsi adalah relasi khusus yang memasangkan setiap anggota domain dengan tepat satu anggota kodomain.</p>

<h3>a. Pengertian Fungsi</h3>
<p>Jika setiap elemen x pada himpunan A memiliki pasangan tunggal ke elemen y di himpunan B, maka relasi tersebut disebut fungsi, ditulis sebagai y = f(x).</p>

<h3>b. Domain, Kodomain, dan Range</h3>
<ul>
<li><b>Domain</b>: Semua nilai x yang boleh digunakan.</li>
<li><b>Kodomain</b>: Semua nilai yang mungkin menjadi hasil fungsi.</li>
<li><b>Range</b>: Nilai y yang benar-benar muncul dari fungsi.</li>
</ul>

<h3>c. Notasi Fungsi</h3>
<p>Bentuk umum fungsi: f(x) = ax + b, f(x) = x², f(x) = √x, dll.</p>

<h3>d. Menentukan Nilai Fungsi</h3>
<p>Jika f(x) = 2x - 3, maka:</p>
<ul>
<li>f(2) = 2(2) - 3 = 1</li>
<li>f(-1) = -2 - 3 = -5</li>
</ul>

<h3>e. Grafik Fungsi</h3>
<p>Grafik fungsi terdiri dari titik-titik (x, y) yang memenuhi persamaan y = f(x).</p>

<h3>f. Fungsi Satu-Satu dan Onto</h3>
<p>
<b>Satu-satu (injective)</b>: setiap nilai y berasal dari satu nilai x.<br>
<b>Onto (surjective)</b>: semua elemen kodomain dipetakan oleh domain.
</p>
`;

function tampilMateri7() {
    document.getElementById("content").innerHTML = materi7;
}
// ==========================
// MATERI 8 — FUNGSI KUADRAT
// ==========================

const materi8 = `
<h2>8. Fungsi Kuadrat</h2>

<p>Fungsi kuadrat adalah fungsi dengan pangkat tertinggi variabel x adalah dua, berbentuk umum:</p>
<p><b>f(x) = ax² + bx + c, dengan a ≠ 0</b></p>

<h3>a. Bentuk Umum</h3>
<p>
Jika a &gt; 0, grafik terbuka ke atas (senyum).<br>
Jika a &lt; 0, grafik terbuka ke bawah (sedih).
</p>

<h3>b. Titik Puncak (Vertex)</h3>
<p>
Rumus titik puncak parabola:<br>
x<sub>p</sub> = -b / (2a)<br>
y<sub>p</sub> = f(x<sub>p</sub>)
</p>

<h3>c. Sumbu Simetri</h3>
<p>Sumbu simetri berada pada garis x = -b/(2a).</p>

<h3>d. Akar-akar Fungsi Kuadrat</h3>
<p>Akar persamaan dapat dicari dengan rumus:</p>
<p>
x = (-b ± √(b² - 4ac)) / (2a)
</p>

<p>Jika D = b² - 4ac, maka:</p>
<ul>
<li>D &gt; 0 → dua akar real berbeda</li>
<li>D = 0 → satu akar real kembar</li>
<li>D &lt; 0 → tidak memiliki akar real</li>
</ul>

<h3>e. Grafik Fungsi Kuadrat</h3>
<p>Grafik berbentuk parabola, ditentukan oleh nilai a, titik puncak, arah buka, serta titik potong sumbu.</p>
`;

function tampilMateri8() {
    document.getElementById("content").innerHTML = materi8;
}
// =====================================
// MATERI 9 — TRIGONOMETRI DASAR LENGKAP
// =====================================

const materi9 = `
<h2>9. Trigonometri Dasar</h2>

<p>Trigonometri adalah cabang matematika yang mempelajari hubungan antara sudut dan sisi dalam segitiga, terutama segitiga siku-siku.</p>

<h3>a. Perbandingan Trigonometri</h3>
<p>Untuk segitiga siku-siku dengan sudut θ:</p>
<ul>
<li><b>sin θ</b> = depan / miring</li>
<li><b>cos θ</b> = samping / miring</li>
<li><b>tan θ</b> = depan / samping</li>
<li><b>cosec θ</b> = 1/sin θ</li>
<li><b>sec θ</b> = 1/cos θ</li>
<li><b>cot θ</b> = 1/tan θ</li>
</ul>

<h3>b. Nilai Trigonometri Sudut Istimewa</h3>
<table border="1" style="border-collapse:collapse; text-align:center;">
<tr><th>Sudut</th><th>sin</th><th>cos</th><th>tan</th></tr>
<tr><td>0°</td><td>0</td><td>1</td><td>0</td></tr>
<tr><td>30°</td><td>1/2</td><td>√3/2</td><td>1/√3</td></tr>
<tr><td>45°</td><td>√2/2</td><td>√2/2</td><td>1</td></tr>
<tr><td>60°</td><td>√3/2</td><td>1/2</td><td>√3</td></tr>
<tr><td>90°</td><td>1</td><td>0</td><td>undefined</td></tr>
</table>

<h3>c. Identitas Trigonometri Dasar</h3>
<ul>
<li>sin² θ + cos² θ = 1</li>
<li>tan θ = sin θ / cos θ</li>
<li>1 + tan² θ = sec² θ</li>
<li>1 + cot² θ = csc² θ</li>
</ul>

<h3>d. Grafik Trigonometri</h3>
<p>
Grafik sin dan cos berbentuk gelombang:<br>
• Amplitudo: 1<br>
• Periode: 2π<br>
• Tan memiliki asimtot di π/2, 3π/2, dst.
</p>

<h3>e. Penerapan Trigonometri</h3>
<ul>
<li>Menghitung tinggi bangunan</li>
<li>Menghitung kemiringan jalan</li>
<li>Arah navigasi</li>
<li>Perhitungan gelombang</li>
</ul>
`;

function tampilMateri9() {
    document.getElementById("content").innerHTML = materi9;
}
function cekJawaban(idSoal, jawabanBenar, penjelasan) {
    const input = document.getElementById(idSoal).value.trim();

    if (input === "") {
        alert("Isi jawabannya dulu ya!");
        return;
    }

    if (input == jawabanBenar) {
        document.getElementById(idSoal + "_hasil").innerHTML =
            `<p style='color:green; font-weight:bold;'>Jawaban benar! 🎉</p>
             <p>${penjelasan}</p>`;
    } else {
        document.getElementById(idSoal + "_hasil").innerHTML =
            `<p style='color:red; font-weight:bold;'>Jawaban salah, coba lagi!</p>`;
    }
}
// ========================
// LATIHAN SOAL — EKSPONEN
// ========================

const latihan1 = `
<h2>Latihan Soal — Eksponen</h2>

<h3>🟦 Soal Rutin</h3>

1. Hitung nilai dari 2³.<br>
<input id="e1"><button onclick="cekJawaban('e1','8','2³ = 2×2×2 = 8')">Cek</button>
<div id="e1_hasil"></div><br>

2. Sederhanakan 3² × 3³.<br>
<input id="e2"><button onclick="cekJawaban('e2','243','Karena basis sama → pangkat dijumlah: 3⁵ = 243')">Cek</button>
<div id="e2_hasil"></div><br>

3. Sederhanakan 5⁴ ÷ 5².<br>
<input id="e3"><button onclick="cekJawaban('e3','25','Pangkat dikurang: 5² = 25')">Cek</button>
<div id="e3_hasil"></div><br>

4. Nilai dari (2²)³ adalah …<br>
<input id="e4"><button onclick="cekJawaban('e4','64','(2²)³ = 2⁶ = 64')">Cek</button>
<div id="e4_hasil"></div><br>

5. Nilai 4⁰ adalah …<br>
<input id="e5"><button onclick="cekJawaban('e5','1','a⁰ = 1 (selama a ≠ 0)')">Cek</button>
<div id="e5_hasil"></div><br>


<h3>🟧 Soal Non-Rutin</h3>

6. Jika 2ˣ = 32, maka nilai x = …<br>
<input id="e6"><button onclick="cekJawaban('e6','5','32 = 2⁵ → maka x = 5')">Cek</button>
<div id="e6_hasil"></div><br>

7. Sederhanakan (3³ × 9²) ÷ 27.<br>
<input id="e7"><button onclick="cekJawaban('e7','81','Ubah ke basis 3: 9=3², 27=3³ → hasil = 3⁴ = 81')">Cek</button>
<div id="e7_hasil"></div><br>

8. Jika 5ˣ × 25 = 125, maka x = …<br>
<input id="e8"><button onclick="cekJawaban('e8','1','Ubah basis 25=5², 125=5³ → 5ˣ+2 = 5³ → x=1')">Cek</button>
<div id="e8_hasil"></div><br>

9. Jika 4ˣ = 2⁶, maka x = …<br>
<input id="e9"><button onclick="cekJawaban('e9','3','4 = 2² → 4ˣ = 2²ˣ = 2⁶ → 2x = 6 → x = 3')">Cek</button>
<div id="e9_hasil"></div><br>

10. Sederhanakan (8³ × 16) ÷ 4⁵.<br>
<input id="e10"><button onclick="cekJawaban('e10','8','Ubah ke basis 2 → hasil = 2³ = 8')">Cek</button>
<div id="e10_hasil"></div><br>
`;

function tampilLatihan1() {
    document.getElementById("content").innerHTML = latihan1;
}
// ========================
// LATIHAN SOAL — LOGARITMA
// ========================

const latihan2 = `
<h2>Latihan Soal — Logaritma</h2>

<h3>🟦 Soal Rutin</h3>

1. Nilai dari log₁₀ 100 adalah …<br>
<input id="l1"><button onclick="cekJawaban('l1','2','100 = 10² → log₁₀ 100 = 2')">Cek</button>
<div id="l1_hasil"></div><br>

2. Hitung log₂ 8.<br>
<input id="l2"><button onclick="cekJawaban('l2','3','8 = 2³ → log₂ 8 = 3')">Cek</button>
<div id="l2_hasil"></div><br>

3. Nilai log₃ 27 adalah …<br>
<input id="l3"><button onclick="cekJawaban('l3','3','27 = 3³ → log₃ 27 = 3')">Cek</button>
<div id="l3_hasil"></div><br>

4. Sederhanakan log₅ 125.<br>
<input id="l4"><button onclick="cekJawawan('l4','3','125 = 5³ → log₅ 125 = 3')">Cek</button>
<div id="l4_hasil"></div><br>

5. Nilai log₄ 1 adalah …<br>
<input id="l5"><button onclick="cekJawaban('l5','0','logₐ 1 = 0')">Cek</button>
<div id="l5_hasil"></div><br>


<h3>🟧 Soal Non-Rutin</h3>

6. Jika log₂ x = 5, maka x = …<br>
<input id="l6"><button onclick="cekJawaban('l6','32','x = 2⁵ = 32')">Cek</button>
<div id="l6_hasil"></div><br>

7. Jika log₃ (x + 2) = 2, tentukan x.<br>
<input id="l7"><button onclick="cekJawaban('l7','7','x+2 = 3² = 9 → x = 7')">Cek</button>
<div id="l7_hasil"></div><br>

8. Sederhanakan log₂ 16 + log₂ 8.<br>
<input id="l8"><button onclick="cekJawaban('l8','7','log₂ 16=4 dan log₂ 8=3 → total = 7')">Cek</button>
<div id="l8_hasil"></div><br>

9. Jika 2 log₃ x = 4, maka x = …<br>
<input id="l9"><button onclick="cekJawaban('l9','9','log₃ x = 2 → x = 3² = 9')">Cek</button>
<div id="l9_hasil"></div><br>

10. Sederhanakan log₅ 125 + log₅ 25.<br>
<input id="l10"><button onclick="cekJawaban('l10','5','log₅125=3, log₅25=2 → total = 5')">Cek</button>
<div id="l10_hasil"></div><br>
`;

function tampilLatihan2() {
    document.getElementById("content").innerHTML = latihan2;
}
// ========================
// LATIHAN SOAL — BENTUK AKAR
// ========================

const latihan3 = `
<h2>Latihan Soal — Bentuk Akar</h2>

<h3>🟦 Soal Rutin</h3>

1. Sederhanakan √25.<br>
<input id="a1"><button onclick="cekJawaban('a1','5','√25 = 5')">Cek</button>
<div id="a1_hasil"></div><br>

2. Sederhanakan √50.<br>
<input id="a2"><button onclick="cekJawaban('a2','5√2','√50 = √(25×2) = 5√2')">Cek</button>
<div id="a2_hasil"></div><br>

3. Sederhanakan √18.<br>
<input id="a3"><button onclick="cekJawaban('a3','3√2','√18 = √(9×2) = 3√2')">Cek</button>
<div id="a3_hasil"></div><br>

4. Sederhanakan 2√3 × 3√2.<br>
<input id="a4"><button onclick="cekJawaban('a4','6√6','2×3 × √3√2 = 6√6')">Cek</button>
<div id="a4_hasil"></div><br>

5. Sederhanakan √27 ÷ √3.<br>
<input id="a5"><button onclick="cekJawaban('a5','3','√27/√3 = √9 = 3')">Cek</button>
<div id="a5_hasil"></div><br>


<h3>🟧 Soal Non-Rutin</h3>

6. Jika √x = 5, nilai x = …<br>
<input id="a6"><button onclick="cekJawaban('a6','25','Kuadratkan kedua sisi: x = 25')">Cek</button>
<div id="a6_hasil"></div><br>

7. Sederhanakan √(12) × √(8).<br>
<input id="a7"><button onclick="cekJawaban('a7','4√6','√(12×8) = √96 = 4√6')">Cek</button>
<div id="a7_hasil"></div><br>

8. Jika √(3x) = 6, tentukan x.<br>
<input id="a8"><button onclick="cekJawaban('a8','12','Kuadratkan: 3x = 36 → x=12')">Cek</button>
<div id="a8_hasil"></div><br>

9. Sederhanakan √200.<br>
<input id="a9"><button onclick="cekJawaban('a9','10√2','√200 = √(100×2) = 10√2')">Cek</button>
<div id="a9_hasil"></div><br>

10. Sederhanakan √8 + √18.<br>
<input id="a10"><button onclick="cekJawaban('a10','5√2','√8=2√2, √18=3√2 → total=5√2')">Cek</button>
<div id="a10_hasil"></div><br>
`;

function tampilLatihan3() {
    document.getElementById("content").innerHTML = latihan3;
}
/* ================================
   LATIHAN SOAL – PERSAMAAN LINEAR
   ================================ */

materiData["persamaan_linear_latihan"] = {
    rutin: [
        {
            soal: "Tentukan nilai x dari persamaan 3x + 5 = 20.",
            jawaban: "5",
            pembahasan: "3x + 5 = 20 → 3x = 15 → x = 5."
        },
        {
            soal: "Jika 4x - 7 = 21, maka nilai x adalah?",
            jawaban: "7",
            pembahasan: "4x - 7 = 21 → 4x = 28 → x = 7."
        },
        {
            soal: "Selesaikan: 2x + 9 = 3x - 6.",
            jawaban: "15",
            pembahasan: "2x + 9 = 3x - 6 → 9 + 6 = x → x = 15."
        },
        {
            soal: "Tentukan x: 12 - 3x = 6.",
            jawaban: "2",
            pembahasan: "12 - 3x = 6 → -3x = -6 → x = 2."
        },
        {
            soal: "Jika 5(x - 2) = 20, maka x = ?",
            jawaban: "6",
            pembahasan: "5(x - 2) = 20 → x - 2 = 4 → x = 6."
        }
    ],
    nonRutin: [
        {
            soal: "Ani membeli 3 pensil dan 2 buku seharga total Rp27.000. Jika harga sebuah buku Rp10.000, berapa harga satu pensil?",
            jawaban: "2333",
            pembahasan: "3p + 2(10000)=27000 → 3p = 7000 → p = 2333 (dibulatkan)."
        },
        {
            soal: "Selisih dua bilangan adalah 12. Jika bilangan kecil x dan bilangan besar 3x, tentukan nilai x.",
            jawaban: "6",
            pembahasan: "3x - x = 12 → 2x = 12 → x = 6."
        },
        {
            soal: "Ibu membeli jeruk & apel total 18 buah. Jika jeruk 2 kali lebih banyak dari apel, berapa buah masing-masing?",
            jawaban: "apel=6, jeruk=12",
            pembahasan: "j = 2a dan j + a = 18 → 3a = 18 → a = 6, j = 12."
        },
        {
            soal: "Umur ayah 4 tahun lebih tua dari 3 kali umur anak. Jika jumlah umur mereka 40 tahun, tentukan umur ayah.",
            jawaban: "31",
            pembahasan: "a = 3c + 4 dan a + c = 40 → substitusi → umur ayah = 31."
        },
        {
            soal: "Sebuah tali dipotong menjadi dua bagian. Bagian pertama 5 cm lebih panjang dari dua kali bagian kedua. Jika total panjang 65 cm, tentukan panjang bagian pertama.",
            jawaban: "45",
            pembahasan: "p1 = 2p2 + 5 dan p1 + p2 = 65 → substitusi → p1 = 45 cm."
        }
    ]
};


/* ====================================
   LATIHAN SOAL – PERTIDAKSAMAAN LINEAR
   ==================================== */

materiData["pertidaksamaan_linear_latihan"] = {
    rutin: [
        {
            soal: "Tentukan himpunan penyelesaian: 3x - 5 > 1.",
            jawaban: "x > 2",
            pembahasan: "3x - 5 > 1 → 3x > 6 → x > 2."
        },
        {
            soal: "Selesaikan: 4x + 8 ≤ 20.",
            jawaban: "x ≤ 3",
            pembahasan: "4x ≤ 12 → x ≤ 3."
        },
        {
            soal: "Tentukan penyelesaian: 2 - x ≥ 5.",
            jawaban: "x ≤ -3",
            pembahasan: "2 - x ≥ 5 → -x ≥ 3 → x ≤ -3."
        },
        {
            soal: "Selesaikan: 7x < 35.",
            jawaban: "x < 5",
            pembahasan: "x < 5."
        },
        {
            soal: "Tentukan HP dari: 5 - 3x ≤ 17.",
            jawaban: "x ≥ -4",
            pembahasan: "5 - 3x ≤ 17 → -3x ≤ 12 → x ≥ -4."
        }
    ],
    nonRutin: [
        {
            soal: "Sebuah bus hanya bisa menampung maksimal 60 penumpang. Jika sudah ada 18 orang, tuliskan pertidaksamaan jumlah orang yang masih boleh naik.",
            jawaban: "x ≤ 42",
            pembahasan: "18 + x ≤ 60 → x ≤ 42."
        },
        {
            soal: "Harga 1 tiket konser Rp50.000. Uang Dita Rp250.000. Tuliskan pertidaksamaan banyak tiket yang bisa dibeli.",
            jawaban: "x ≤ 5",
            pembahasan: "50000x ≤ 250000 → x ≤ 5."
        },
        {
            soal: "Suatu bilangan 4 lebih besar dari dua kali bilangan lain. Tentukan pertidaksamaannya.",
            jawaban: "x > 2y + 4",
            pembahasan: "Definisi soal."
        },
        {
            soal: "Total belanja ≤ Rp150.000. Jika sudah membeli barang Rp80.000, tuliskan batas maksimal harga barang berikutnya.",
            jawaban: "x ≤ 70000",
            pembahasan: "80.000 + x ≤ 150.000 → x ≤ 70.000."
        },
        {
            soal: "Umur Andi minimal 3 tahun lebih tua dari Budi. Tuliskan pertidaksamaannya.",
            jawaban: "A ≥ B + 3",
            pembahasan: "Definisi soal."
        }
    ]
};


/* ======================
   LATIHAN SOAL – FUNGSI
   ====================== */

materiData["fungsi_latihan"] = {
    rutin: [
        {
            soal: "Diketahui f(x) = 3x + 2. Tentukan f(4).",
            jawaban: "14",
            pembahasan: "f(4) = 3(4) + 2 = 14."
        },
        {
            soal: "Jika f(x) = x² - 5, maka f(3) = ?",
            jawaban: "4",
            pembahasan: "3² - 5 = 4."
        },
        {
            soal: "Diketahui f(x) = 7 - x. Tentukan f(-2).",
            jawaban: "9",
            pembahasan: "f(-2) = 7 - (-2) = 9."
        },
        {
            soal: "Jika f(x) = 2x, tentukan f(½).",
            jawaban: "1",
            pembahasan: "2 × 1/2 = 1."
        },
        {
            soal: "Jika f(x) = 4x + 1, tentukan nilai x jika f(x)=17.",
            jawaban: "4",
            pembahasan: "4x + 1 = 17 → x = 4."
        }
    ],
    nonRutin: [
        {
            soal: "Harga parkir dinyatakan dengan f(x) = 2000 + 1000(x - 1). Berapa biaya parkir 5 jam?",
            jawaban: "6000",
            pembahasan: "2000 + 1000(4) = 6000."
        },
        {
            soal: "Suhu dalam derajat F dinyatakan F(x)=1.8x+32. Jika suhu 30°C, berapa °F?",
            jawaban: "86",
            pembahasan: "1.8(30)+32=86°F."
        },
        {
            soal: "Pendapatan ojek online: f(x)=5000 + 2000x. Jika ia mendapat Rp21.000, ia dapat berapa order?",
            jawaban: "8",
            pembahasan: "21000 = 5000 + 2000x → x = 8."
        },
        {
            soal: "Jarak tempuh f(t)=60t. Jika jarak 150 km, berapa waktu tempuh?",
            jawaban: "2.5",
            pembahasan: "150 = 60t → t=2.5 jam."
        },
        {
            soal: "Suatu fungsi f(x)=x². Jika output adalah 49, tentukan x.",
            jawaban: "7 atau -7",
            pembahasan: "x²=49 → x = ±7."
        }
    ]
};
/* ============================
   LATIHAN SOAL – FUNGSI KUADRAT
   ============================ */

materiData["fungsi_kuadrat_latihan"] = {
    rutin: [
        {
            soal: "Tentukan nilai f(2) jika f(x) = x² + 3x + 2.",
            jawaban: "12",
            pembahasan: "f(2) = 4 + 6 + 2 = 12."
        },
        {
            soal: "Tentukan titik puncak dari fungsi f(x) = x² - 4x + 1.",
            jawaban: "(2, -3)",
            pembahasan: "p = -b/2a = 4/2 = 2 → f(2)=4 -8 +1 = -3."
        },
        {
            soal: "Diketahui f(x)=2x². Berapa f(3)?",
            jawaban: "18",
            pembahasan: "2 × 9 = 18."
        },
        {
            soal: "Arah buka grafik f(x)=−x²+6x adalah…",
            jawaban: "ke bawah",
            pembahasan: "Koefisien x² negatif → membuka ke bawah."
        },
        {
            soal: "Tentukan akar-akar persamaan x²−9=0.",
            jawaban: "3 dan -3",
            pembahasan: "x = ±√9 → 3 dan -3."
        }
    ],
    nonRutin: [
        {
            soal: "Sebuah bola dilempar dan tinggi h(t)=−5t²+20t+3. Berapa tinggi maksimum yang dicapai?",
            jawaban: "23",
            pembahasan: "p = −b/(2a) = −20/(−10) = 2 → h(2) = −20 + 40 + 3 = 23 m."
        },
        {
            soal: "Bentuk taman persegi panjang memiliki luas A(x)=x(20−x). Berapa luas maksimum?",
            jawaban: "100",
            pembahasan: "A(x)=20x−x² parabola buka bawah → p = 10 → A(10)=100."
        },
        {
            soal: "Grafik y=x²−6x+c melalui titik (2,−3). Tentukan nilai c.",
            jawaban: "5",
            pembahasan: "−3 = 4 − 12 + c → c = 5."
        },
        {
            soal: "Sebuah parabola melalui (0,5), (1,2), (3,8). Tentukan nilai a + b + c dari y = ax²+bx+c.",
            jawaban: "5",
            pembahasan: "Dari sistem persamaan → a=2, b=−7, c=5 → jumlah = 5."
        },
        {
            soal: "Sebuah fungsi f(x)=ax² memiliki f(2)=18. Tentukan f(5).",
            jawaban: "112.5",
            pembahasan: "a = 18/4 = 4.5 → f(5)=4.5×25=112.5."
        }
    ]
};
/* ====================
   LATIHAN SOAL – GEOMETRI
   ==================== */

materiData["geometri_latihan"] = {
    rutin: [
        {
            soal: "Hitung keliling persegi dengan sisi 12 cm.",
            jawaban: "48",
            pembahasan: "K = 4s = 48."
        },
        {
            soal: "Luas segitiga dengan alas 10 cm dan tinggi 6 cm adalah…",
            jawaban: "30",
            pembahasan: "L = 1/2 × 10 × 6 = 30."
        },
        {
            soal: "Hitung luas lingkaran dengan r = 7 cm (π = 22/7).",
            jawaban: "154",
            pembahasan: "L = πr² = 22/7 × 49 = 154."
        },
        {
            soal: "Keliling lingkaran r = 14 cm (π=22/7).",
            jawaban: "88",
            pembahasan: "K = 2πr = 2 × 22/7 × 14 = 88."
        },
        {
            soal: "Volume kubus dengan sisi 5 cm.",
            jawaban: "125",
            pembahasan: "V = s³ = 125."
        }
    ],
    nonRutin: [
        {
            soal: "Sebuah taman berbentuk lingkaran dengan diameter 20 m. Luas area yang bisa ditanami bunga adalah?",
            jawaban: "314",
            pembahasan: "r=10 → L=πr²=3.14×100=314 m²."
        },
        {
            soal: "Sebuah tangga 10 m disandarkan ke tembok, ujung tangga berada 8 m di atas tanah. Berapa jarak kaki tangga ke tembok?",
            jawaban: "6",
            pembahasan: "Pythagoras: 10² = 8² + x² → x = 6 m."
        },
        {
            soal: "Sebuah kolam persegi panjang panjangnya 12 m dan diagonal 13 m. Tentukan lebarnya.",
            jawaban: "5",
            pembahasan: "13² = 12² + w² → w=5."
        },
        {
            soal: "Sebuah bola basket jari-jari 6 cm. Berapa volumenya? (gunakan 3.14)",
            jawaban: "904.32",
            pembahasan: "V = 4/3 π r³ = 4/3 × 3.14 × 216 = 904.32."
        },
        {
            soal: "Sebuah rumah memiliki atap berbentuk prisma segitiga. Luas alas segitiga 15 m² dan panjang rumah 10 m. Berapa volumenya?",
            jawaban: "150",
            pembahasan: "V = L alas × panjang = 15 × 10 = 150 m³."
        }
    ]
};
/* ======================================
   LATIHAN SOAL – TRIGONOMETRI DASAR
   ====================================== */

materiData["trigonometri_latihan"] = {
    rutin: [
        {
            soal: "Jika sin 30° = ?",
            jawaban: "1/2",
            pembahasan: "Nilai dasar trigonometri."
        },
        {
            soal: "cos 60° = ?",
            jawaban: "1/2",
            pembahasan: "Nilai dasar trigonometri."
        },
        {
            soal: "tan 45° = ?",
            jawaban: "1",
            pembahasan: "tan 45° = 1."
        },
        {
            soal: "Hitung sin 90°.",
            jawaban: "1",
            pembahasan: "Nilai trigonometri."
        },
        {
            soal: "cos 0° = ?",
            jawaban: "1",
            pembahasan: "Cosinus sudut nol."
        }
    ],
    nonRutin: [
        {
            soal: "Sebuah tangga 5 m disandarkan ke tembok. Jika jarak kaki tangga ke tembok 3 m, tentukan sudut kemiringan tangga menggunakan sin.",
            jawaban: "sin θ = 4/5",
            pembahasan: "Tinggi = √(5²−3²)=4 → sin = 4/5."
        },
        {
            soal: "Sebuah bukit memiliki sudut elevasi 30°. Jika jarak horizontal 40 m, tentukan tinggi bukit.",
            jawaban: "20",
            pembahasan: "tan 30° = h/40 → h = 40×1/√3 ≈ 20 m."
        },
        {
            soal: "Seorang pengamat melihat ujung gedung dengan elevasi 45°. Jarak ke gedung 10 m. Berapa tinggi gedung?",
            jawaban: "10",
            pembahasan: "tan 45° = h/10 → h = 10 m."
        },
        {
            soal: "Sudut sebuah segitiga siku-siku adalah 53°. Jika sisi samping = 12 cm, hitung sisi miring.",
            jawaban: "20",
            pembahasan: "cos 53° = 12/h → 0.6 = 12/h → h = 20."
        },
        {
            soal: "Perahu melihat mercusuar dengan elevasi 60°. Jarak horizontal 30 m. Berapa tinggi mercusuar?",
            jawaban: "≈52",
            pembahasan: "tan 60° = h/30 → h = 30√3 ≈ 52 m."
        }
    ]
};
