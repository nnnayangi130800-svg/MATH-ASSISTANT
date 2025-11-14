// Simple SPA navigation
document.querySelectorAll('.tile').forEach(btn=>{
    btn.addEventListener('click', ()=> openPage(btn.dataset.target));
  });
  document.getElementById('backFromTanya').addEventListener('click', ()=> openPage('home'));
  document.getElementById('backFromRumus').addEventListener('click', ()=> openPage('home'));
  document.getElementById('backFromLatihan').addEventListener('click', ()=> openPage('home'));
  document.getElementById('backFromTips').addEventListener('click', ()=> openPage('home'));
  document.getElementById('backFromAbout').addEventListener('click', ()=> openPage('home'));
  document.getElementById('backFromContact').addEventListener('click', ()=> openPage('home'));
  
  function openPage(id){
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
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
  
  sendBtn.addEventListener('click', handleAsk);
  copyBtn.addEventListener('click', handleCopy);
  document.getElementById('sendContact').addEventListener('click', sendContact);
  
  // Local data: rumus, latihan, tips (simple static)
  const RUMUS = [
    {title:'Keliling Persegi', text:'K = 4 × sisi'},
    {title:'Luas Segitiga', text:'L = 1/2 × alas × tinggi'},
    {title:'Luas Lingkaran', text:'L = π × r²'}
  ];
  const LATIHAN = [
    {q:'Hitung keliling persegi dengan sisi 5 cm', a:'20 cm'},
    {q:'Hitung luas segitiga alas 10 tinggi 12', a:'60 cm²'}
  ];
  const TIPS = [
    'Untuk membagi pecahan, kalikan dengan inversnya.',
    'Untuk diskon: harga × (1 − persen/100).',
    'Gunakan π = 3.14 jika butuh cepat.'
  ];
  
  function renderStatic(){
    const rumusList = document.getElementById('rumusList');
    RUMUS.forEach(r => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${r.title}</strong><div>${r.text}</div>`;
      rumusList.appendChild(li);
    });
    const latihanList = document.getElementById('latihanList');
    LATIHAN.forEach(l => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${l.q}</strong><div style="margin-top:6px"><button class="btn ghost" onclick="showLatihanAnswer('${escapeHtml(l.a)}', this)">Tampilkan Jawaban</button></div>`;
      latihanList.appendChild(li);
    });
    const tipsGrid = document.getElementById('tipsGrid');
    TIPS.forEach(t => {
      const d = document.createElement('div');
      d.className='tipCard';
      d.textContent = t;
      tipsGrid.appendChild(d);
    });
  }
  renderStatic();
  
  function showLatihanAnswer(ans, btn){
    const parent = btn.parentElement;
    if(parent.querySelector('.ans')) return;
    const div = document.createElement('div');
    div.className='ans';
    div.style.marginTop='8px';
    div.textContent = ans;
    parent.appendChild(div);
  }
  
  // HISTORY: simple localStorage queue
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
  
  // Ask AI with timeout + error handling
  async function handleAsk(){
    const q = questionInput.value.trim();
    if(!q){ alert('Tulis pertanyaan dulu'); return; }
    answerBox.textContent = 'Sedang memproses...';
    status.textContent = 'Menghubungi AI...';
  
    try{
      // timeout 20s
      const controller = new AbortController();
      const timeout = setTimeout(()=> controller.abort(), 20000);
  
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ question: q }),
        signal: controller.signal
      });
  
      clearTimeout(timeout);
  
      if(!res.ok){
        const txt = await res.text().catch(()=>res.statusText);
        throw new Error('Server error: '+txt);
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
  
  // Contact send (local only)
  function sendContact(){
    const txt = document.getElementById('contactInput').value.trim();
    const s = document.getElementById('contactStatus');
    if(!txt){ s.textContent='Isi dulu ya'; return; }
    // just save to localStorage as demo
    const key = 'math_assistant_contacts_v1';
    const arr = JSON.parse(localStorage.getItem(key) || '[]');
    arr.push({text:txt,ts:Date.now()});
    localStorage.setItem(key, JSON.stringify(arr));
    s.textContent = 'Terima kasih! Saran disimpan secara lokal.';
    document.getElementById('contactInput').value='';
  }
  
  // small helper
  function escapeHtml(s){
    return (s+'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  