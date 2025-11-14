// SPA navigation
document.querySelectorAll('.tile').forEach(btn=>{
    btn.addEventListener('click', ()=> openPage(btn.dataset.target));
  });
  ['backFromTanya','backFromRumus','backFromLatihan','backFromTips','backFromAbout','backFromContact'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.addEventListener('click', ()=> openPage('home'));
  });
  function openPage(id){
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    const el = document.getElementById(id);
    if(el) el.classList.add('active');
    window.scrollTo(0,0);
  }
  openPage('home');
  
  // Elements
  const sendBtn = document.getElementById('sendBtn');
  const copyBtn = document.getElementById('copyBtn');
  const questionInput = document.getElementById('questionInput');
  const answerBox = document.getElementById('answerBox');
  const status = document.getElementById('status');
  const historyList = document.getElementById('historyList');
  
  if(sendBtn) sendBtn.addEventListener('click', handleAsk);
  if(copyBtn) copyBtn.addEventListener('click', handleCopy);
  if(document.getElementById('sendContact')) document.getElementById('sendContact').addEventListener('click', sendContact);
  
  // Static content arrays (RUMUS, LATIHAN with steps, TIPS)
  const RUMUS = [
    {title:'Eksponen - Aturan Umum', text:`a^m * a^n = a^{m+n}\na^m / a^n = a^{m-n}\n(a^m)^n = a^{mn}\na^{-n} = 1/a^n\na^{m/n} = \\sqrt[n]{a^m}`},
    {title:'Logaritma - Aturan', text:`log_a b = c ⇔ a^c = b\nlog_a(xy) = log_a x + log_a y\nlog_a(x/y) = log_a x − log_a y\nlog_a(x^k) = k log_a x`},
    {title:'Persamaan Linear', text:`y = mx + c\nGradien m = (y2 − y1)/(x2 − x1)`},
    {title:'Sistem Persamaan Linear (2 variabel)', text:`Metode substitusi, eliminasi.\nContoh: 2x+3y=13, x-y=1 → substitusi`},
    {title:'Fungsi Kuadrat', text:`y = ax^2 + bx + c\nDiskriminan D = b^2 − 4ac\nVertex x_v = −b/(2a)`},
    {title:'Trigonometri Dasar', text:`sin θ = opposite/hypotenuse\ncos θ = adjacent/hypotenuse\ntan θ = sin θ / cos θ\nsin^2 θ + cos^2 θ = 1`},
    {title:'Bangun Datar', text:`Keliling Persegi = 4s\nLuas Persegi = s^2\nLuas Segitiga = 1/2 × alas × tinggi\nLuas Lingkaran = π r^2`},
    {title:'Statistika & Peluang', text:`Mean = Σx / n\nMedian = nilai tengah\nModus = frekuensi terbanyak\nPeluang = favorable / total`}
  ];
  
  const LATIHAN = [
    {q:'Volume kubus dengan panjang rusuk 12', a:`Langkah 1: Rumus volume kubus V = s^3\nLangkah 2: Masukkan s = 12 → V = 12^3\nLangkah 3: 12^3 = 12 × 12 × 12 = 1728\nJadi, V = 1728 satuan^3`},
    {q:'Hitung keliling persegi dengan sisi 5 cm', a:`Langkah 1: Rumus keliling K = 4 × sisi\nLangkah 2: Masukkan sisi = 5 → K = 4 × 5\nLangkah 3: K = 20 cm\nJadi, keliling = 20 cm`},
    {q:'Hitung luas segitiga alas 10 tinggi 12', a:`Langkah 1: Rumus luas L = 1/2 × alas × tinggi\nLangkah 2: Masukkan angka → L = 1/2 × 10 × 12\nLangkah 3: L = 0.5 × 120 = 60\nJadi, luas = 60 cm²`},
    {q:'Selesaikan sistem: 2x + 3y = 13 ; x - y = 1', a:`Langkah 1: Dari x - y = 1 → x = y + 1\nLangkah 2: Substitusi ke persamaan pertama → 2(y+1) + 3y =13\nLangkah 3: 2y + 2 + 3y = 13 → 5y + 2 = 13 → 5y = 11 → y = 11/5\nLangkah 4: x = y + 1 = 11/5 + 1 = 16/5\nJadi, x = 16/5, y = 11/5`},
    {q:'Jika 2^3 × 2^{-1} × (2^2)^3, hitung hasilnya', a:`Langkah 1: 2^3 × 2^{-1} = 2^{3-1} = 2^2\nLangkah 2: (2^2)^3 = 2^{2×3} = 2^6\nLangkah 3: 2^2 × 2^6 = 2^{2+6} = 2^8\nLangkah 4: 2^8 = 256\nJadi hasil = 256`},
  ];
  
  const TIPS = [
    {rule:'Eksponen - Kali basis sama', example:'Jika basis sama pada perkalian: tambahkan pangkat. Contoh: a^m × a^n = a^{m+n}. Maka 2^3 × 2^4 = 2^{7}.'},
    {rule:'Eksponen - Bagi basis sama', example:'Jika basis sama pada pembagian: kurangi pangkat. Contoh: a^5 / a^2 = a^{3}.'},
    {rule:'Eksponen - Pangkat pangkat', example:'(a^m)^n = a^{m×n}. Contoh: (2^2)^3 = 2^6.'},
    {rule:'Logaritma - Perkalian', example:'log_a(xy) = log_a x + log_a y. Jadi log(2×8) = log2 + log8.'},
    {rule:'Fungsi kuadrat - Diskriminan', example:'D = b^2 − 4ac. Jika D>0 → 2 akar real; D=0 → 1 akar; D<0 → tidak ada akar real.'},
    {rule:'Trigonometri - Hubungan dasar', example:'tan θ = sin θ / cos θ. Jadi jika sin=1/2 dan cos=√3/2, tan = (1/2)/(√3/2)=1/√3.'}
  ];
  
  // render static content
  function renderStatic(){
    const rumusList = document.getElementById('rumusList');
    RUMUS.forEach(r=> {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${escapeHtml(r.title)}</strong><div style="margin-top:6px;white-space:pre-wrap">${escapeHtml(r.text)}</div>`;
      rumusList.appendChild(li);
    });
  
    const latihanList = document.getElementById('latihanList');
    LATIHAN.forEach((l, i) => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${escapeHtml(l.q)}</strong>
        <div style="margin-top:8px"><button class="btn ghost" onclick="toggleAnswer(${i}, this)">Tampilkan Jawaban</button></div>
        <div id="ans-${i}" class="ans" style="margin-top:10px;display:none;white-space:pre-wrap">${escapeHtml(l.a)}</div>`;
      latihanList.appendChild(li);
    });
  
    const tipsGrid = document.getElementById('tipsGrid');
    TIPS.forEach(t=> {
      const d = document.createElement('div');
      d.className='tipCard';
      d.innerHTML = `<strong>${escapeHtml(t.rule)}</strong><div style="margin-top:8px">${escapeHtml(t.example)}</div>`;
      tipsGrid.appendChild(d);
    });
  }
  renderStatic();
  
  function toggleAnswer(i, btn){
    const el = document.getElementById(`ans-${i}`);
    if(el.style.display === 'none' || !el.style.display) el.style.display = 'block';
    else el.style.display = 'none';
  }
  
  // HISTORY: localStorage
  const HISTORY_KEY = 'math_assistant_history_v1';
  function loadHistory(){
    const arr = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    historyList.innerHTML = '';
    arr.slice().reverse().forEach(item=>{
      const d = document.createElement('div');
      d.className='historyItem';
      d.innerHTML = `<div class="q">${escapeHtml(item.q)}</div><div class="a">${escapeHtml(item.a)}</div>`;
      historyList.appendChild(d);
    });
  }
  function saveHistory(q,a){
    const arr = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    arr.push({q,a,ts:Date.now()});
    localStorage.setItem(HISTORY_KEY, JSON.stringify(arr.slice(-200)));
    loadHistory();
  }
  loadHistory();
  
  // Ask AI: uses /api/ask with timeout and clear errors
  async function handleAsk(){
    const q = questionInput.value.trim();
    if(!q){ alert('Tulis pertanyaan dulu'); return; }
    answerBox.textContent = 'Sedang memproses...';
    status.textContent = 'Menghubungi AI...';
  
    try{
      const controller = new AbortController();
      const timeout = setTimeout(()=> controller.abort(), 20000); // 20s timeout
  
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ question: q }),
        signal: controller.signal
      });
  
      clearTimeout(timeout);
  
      if(!res.ok){
        // try parse json body for error
        let text = await res.text().catch(()=>res.statusText);
        try {
          const j = JSON.parse(text);
          text = j.error ? (j.error + (j.details ? (' — ' + JSON.stringify(j.details)) : '') ) : text;
        }catch(e){}
        throw new Error(text || ('Server error: ' + res.status));
      }
      const json = await res.json();
      const text = json.answer || '(AI tidak mengembalikan jawaban)';
      answerBox.textContent = text;
      saveHistory(q, text);
    }catch(err){
      if(err.name === 'AbortError'){
        answerBox.textContent = 'Permintaan melebihi waktu tunggu (20s). Coba lagi atau cek koneksi/API key.';
      } else {
        answerBox.textContent = 'Error: ' + (err.message || err);
      }
    }finally{
      status.textContent = '';
    }
  }
  
  // Copy answer
  function handleCopy(){
    const txt = answerBox.textContent || '';
    if(!txt) return alert('Tidak ada jawaban untuk disalin');
    navigator.clipboard.writeText(txt).then(()=>alert('Jawaban disalin!'));
  }
  
  // Contact send (local save)
  function sendContact(){
    const txt = document.getElementById('contactInput').value.trim();
    const s = document.getElementById('contactStatus');
    if(!txt){ s.textContent='Isi dulu ya'; return; }
    const key = 'math_assistant_contacts_v1';
    const arr = JSON.parse(localStorage.getItem(key) || '[]');
    arr.push({text:txt,ts:Date.now()});
    localStorage.setItem(key, JSON.stringify(arr));
    s.textContent = 'Terima kasih! Saran disimpan secara lokal.';
    document.getElementById('contactInput').value='';
  }
  
  // helpers
  function escapeHtml(s){
    return (s+'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  