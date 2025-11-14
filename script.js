// --- Navigation
document.querySelectorAll('.tile, button[data-target]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const target = btn.dataset.target;
      if(target) openPage(target);
    });
  });
  
  function openPage(id){
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    const page = document.getElementById(id);
    if(page) page.classList.add('active');
    window.scrollTo({top:0,behavior:'smooth'});
  }
  
  // --- Latihan Soal
  const latihanData = [
    {
      q:'Volume kubus dengan rusuk 12?',
      a:`Langkah 1: Rumus V = s^3
  Langkah 2: V = 12^3
  Langkah 3: 1728
  Jadi, V = 1728 satuan³`
    },
    {
      q:'Keliling persegi sisi 5 cm?',
      a:`K = 4 × 5 = 20 cm`
    },
    {
      q:'Luas segitiga alas 10, tinggi 12?',
      a:`L = 1/2 × 10 × 12 = 60 cm²`
    },
    {
      q:'SPL: 2x+3y=13 & x−y=1',
      a:`x = 16/5, y = 11/5`
    },
    {
      q:'Hitung 2^3 × 2^(−1) × (2^2)^3',
      a:`Hasil = 256`
    },
    {
      q:'Jumlah akar y = x²−4x+3',
      a:`D = 4 → 2 akar real (1 dan 3)`
    },
    {
      q:'Peluang dadu keluar 3?',
      a:`1/6`
    }
  ];
  
  const latihanList = document.getElementById('latihanList');
  latihanData.forEach((item, i)=>{
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${escapeHtml(item.q)}</strong>
      <div><button class="btn ghost" onclick="toggleAns(${i})">Tampilkan Jawaban</button></div>
      <div id="ans-${i}" class="ans">${escapeHtml(item.a)}</div>
    `;
    latihanList.appendChild(li);
  });
  
  function toggleAns(i){
    const el = document.getElementById('ans-'+i);
    el.style.display = (el.style.display==='block'?'none':'block');
  }
  window.toggleAns = toggleAns;
  
  // --- Tips Cepat
  const tips = [
    {rule:'Eksponen — Perkalian', example:'a^m × a^n = a^(m+n)'},
    {rule:'Eksponen — Pembagian', example:'a^m ÷ a^n = a^(m−n)'},
    {rule:'Eksponen — Pangkat', example:'(a^m)^n = a^(mn)'},
    {rule:'Logaritma — Perkalian', example:'log(xy)=log x + log y'},
    {rule:'Fungsi Kuadrat — D', example:'D>0: 2 akar; D=0: 1 akar; D<0: tidak real'},
    {rule:'Trigonometri Dasar', example:'tan = sin / cos'},
    {rule:'Peluang', example:'P = kejadian ÷ total'}
  ];
  
  const tipsList = document.getElementById('tipsList');
  tips.forEach(t=>{
    const d = document.createElement('div');
    d.className = 'tip';
    d.innerHTML = `<strong>${escapeHtml(t.rule)}</strong><div>${escapeHtml(t.example)}</div>`;
    tipsList.appendChild(d);
  });
  
  // --- QR
  const qrImg = document.getElementById('qrImage');
  (function makeQR(){
    const url = window.location.href.split('#')[0] + '#explain';
    qrImg.src = 'https://chart.googleapis.com/chart?cht=qr&chs=220x220&chl=' + encodeURIComponent(url);
  })();
  
  // --- Saran (LocalStorage)
  document.getElementById('sendContact').addEventListener('click', ()=>{
    const txt = document.getElementById('contactInput').value.trim();
    const st = document.getElementById('contactStatus');
    if(!txt){ st.textContent='Isi dulu.'; return; }
    const key='math_assistant_contacts';
    const arr = JSON.parse(localStorage.getItem(key)||'[]');
    arr.push({text:txt,ts:Date.now()});
    localStorage.setItem(key, JSON.stringify(arr));
    st.textContent='Tersimpan!';
    document.getElementById('contactInput').value='';
  });
  
  // --- Helper
  function escapeHtml(s){
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  
  // Auto-open QR section if URL memakai #explain
  if(window.location.hash==='#explain') openPage('explainPage');
  