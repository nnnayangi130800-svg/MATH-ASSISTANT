
// ============================
// Math Assistant — FULL MATERIALS + QUIZ (Kelas 10 Sem 1)
// - Semua materi: Eksponen, Logaritma, Bentuk Akar, Persamaan Linear,
//   Pertidaksamaan Linear, Fungsi, Fungsi Kuadrat, Geometri (Bangun Datar), Trigonometri Dasar
// - 5 soal rutin + 5 non-rutin tiap materi (MCQ)
// - Kuis interaktif: benar -> penjelasan; salah -> coba lagi
// ============================

// ======= DATA: MATERIALS =======
const MATERIALS = {
  "Eksponen": {
    icon: "🔢",
    content: `
      <div class="materi-detail">
        <h2>Eksponen (Pemangkatan)</h2>
        <h3>1. Pengertian</h3>
        <p>Eksponen menulis perkalian berulang: a<sup>n</sup> = a × a × ... (n kali).</p>

        <h3>2. Notasi & Kasus</h3>
        <ul>
          <li>a<sup>0</sup> = 1 (a ≠ 0)</li>
          <li>a<sup>−n</sup> = 1 / a<sup>n</sup></li>
          <li>a<sup>m/n</sup> = &#8731;<sub>n</sub>(a<sup>m</sup>)</li>
        </ul>

        <h3>3. Rumus & Sifat</h3>
        <pre>
a^m × a^n = a^(m + n)
a^m ÷ a^n = a^(m − n)
(a^m)^n = a^(m × n)
(ab)^n = a^n b^n
(a/b)^n = a^n / b^n
a^(−n) = 1 / a^n
        </pre>

        <h3>4. Contoh, Langkah & Interpretasi</h3>
        <p><strong>Contoh:</strong> Sederhanakan (2^3 × 2^4) ÷ 2^2</p>
        <ol>
          <li>2^3 × 2^4 = 2^(3+4) = 2^7</li>
          <li>(2^7) ÷ 2^2 = 2^(7−2) = 2^5 = 32</li>
        </ol>

        <h3>5. Aplikasi</h3>
        <p>Eksponen muncul pada volume (s^3), notasi ilmiah, model pertumbuhan/peluruhan, dan bunga majemuk.</p>

        <h3>6. Grafik contoh</h3>
        <p>Contoh fungsi pertumbuhan: y = 2^x (grafik naik cepat). Contoh peluruhan: y = (1/2)^x (menurun).</p>
        <div id="expoGraph" class="graph-canvas"></div>

        <div style="margin-top:12px"><button class="show-btn" onclick="startQuizForTopic('Eksponen')">Mulai Kuis Eksponen (5+5)</button></div>
      </div>
    `,
    quiz: {
      routine: [
        { q:"2^3 × 2^4 = ?", choices:["2^7 = 128","2^12 = 4096","2^1 = 2","2^4 = 16"], correct:0, explain:"Basis sama → pangkat dijumlah: 3+4=7 → 2^7=128."},
        { q:"5^6 ÷ 5^2 = ?", choices:["5^4 = 625","5^8","5^2 = 25","5^3 = 125"], correct:0, explain:"Kurangi pangkat: 6−2=4 → 5^4=625."},
        { q:"(3^2)^3 = ?", choices:["3^6 = 729","3^5","9^3 = 729","3^8"], correct:0, explain:"Pangkat pangkat: 2×3=6 → 3^6=729."},
        { q:"4^0 = ?", choices:["1","0","4","Undefined"], correct:0, explain:"Aturan: a^0 = 1 (a≠0). Jadi 4^0 = 1."},
        { q:"2^4 × 2^(−1) = ?", choices:["2^3 = 8","2^5 = 32","2^(−3)","2^4"], correct:0, explain:"4 + (−1) = 3 → 2^3 = 8."}
      ],
      nonroutine: [
        { q:"Jika 2^x × 2^3 = 2^10, x = ?", choices:["7","10","3","13"], correct:0, explain:"x+3=10 → x=7."},
        { q:"Populasi 100, berlipat 2× tiap jam. Setelah 5 jam?", choices:["3200","1600","10000","6400"], correct:0, explain:"N=100×2^5=100×32=3200."},
        { q:"Jika 5^n = 1/125, n = ?", choices:["−3","3","−5","5"], correct:0, explain:"1/125 = 5^(−3) → n = −3."},
        { q:"(2^2)^5 = ?", choices:["2^10 = 1024","2^7","4^5 = 1024","2^25"], correct:0, explain:"2^(2×5)=2^10=1024."},
        { q:"Jumlah 2^0+2^1+2^2+2^3+2^4 = ?", choices:["31","16","15","32"], correct:0, explain:"1+2+4+8+16 = 31."}
      ]
    }
  },

  "Logaritma": {
    icon: "📘",
    content: `
      <div class="materi-detail">
        <h2>Logaritma</h2>
        <h3>1. Pengertian</h3>
        <p>Logaritma adalah operasi kebalikan dari pemangkatan. log_a b = c ⇔ a^c = b.</p>

        <h3>2. Sifat</h3>
        <ul>
          <li>log_a(xy) = log_a x + log_a y</li>
          <li>log_a(x/y) = log_a x − log_a y</li>
          <li>log_a(x^k) = k · log_a x</li>
          <li>change of base: log_a b = log_c b / log_c a</li>
        </ul>

        <h3>3. Contoh & Aplikasi</h3>
        <p>log_10 1000 = 3 karena 10^3 = 1000. Logaritma dipakai dalam skala Richter, pH, dan pengurangan bilangan besar.</p>

        <div style="margin-top:12px"><button class="show-btn" onclick="startQuizForTopic('Logaritma')">Mulai Kuis Logaritma (5+5)</button></div>
      </div>
    `,
    quiz: {
      routine: [
        { q:"log₂ 8 = ?", choices:["1","2","3","4"], correct:2, explain:"2^3 = 8 → log₂8 = 3."},
        { q:"log₁₀ 100 = ?", choices:["1","2","10","100"], correct:1, explain:"10^2 = 100 → log₁₀100 = 2."},
        { q:"log₃ 27 = ?", choices:["2","3","9","1"], correct:1, explain:"3^3 = 27 → log₃27 = 3."},
        { q:"log₄(4^5) = ?", choices:["4^5","5","1","20"], correct:1, explain:"log_a(a^k) = k."},
        { q:"log₅ 25 = ?", choices:["1","2","5","10"], correct:1, explain:"25 = 5^2."}
      ],
      nonroutine: [
        { q:"Jika log_a 100 = 2, a = ?", choices:["10","100","2","50"], correct:0, explain:"a^2 = 100 → a = 10."},
        { q:"log₂ x + log₂ 8 = 6 → x = ?", choices:["4","8","2","16"], correct:1, explain:"log₂(8x)=6 → 8x=64 → x=8."},
        { q:"Jika log x = 3 (basis 10), x = ?", choices:["30","1000","3","10"], correct:1, explain:"10^3 = 1000."},
        { q:"Ubah log₂ 32 ke log basis 10", choices:["log10 32 / log10 2","5","32","2"], correct:0, explain:"Gunakan change of base."},
        { q:"Jika log_b(a)=c maka a = ?", choices:["b^c","c^b","b·c","a^c"], correct:0, explain:"Definisi logaritma."}
      ]
    }
  },

  "Bentuk Akar": {
    icon: "√",
    content: `
      <div class="materi-detail">
        <h2>Bentuk Akar</h2>
        <h3>1. Pengertian</h3>
        <p>Akar kuadrat (√) dan akar pangkat n adalah invers pemangkatan.</p>

        <h3>2. Sifat</h3>
        <ul>
          <li>√(ab) = √a · √b</li>
          <li>√(a/b) = √a / √b</li>
          <li>√(a^2) = |a|</li>
        </ul>

        <h3>3. Contoh</h3>
        <p>√50 = √(25·2) = 5√2</p>

        <div style="margin-top:12px"><button class="show-btn" onclick="startQuizForTopic('Bentuk Akar')">Mulai Kuis Bentuk Akar (5+5)</button></div>
      </div>
    `,
    quiz: {
      routine: [
        { q:"√50 = ?", choices:["5√2","25√2","10√5","√25"], correct:0, explain:"√50 = √(25·2) = 5√2."},
        { q:"√18 = ?", choices:["3√2","6√3","9√2","√9"], correct:0, explain:"√18 = √(9·2) = 3√2."},
        { q:"(√a)^2 = ?", choices:["a","√a","a^2","1"], correct:0, explain:"(√a)^2 = a (a≥0)."},
        { q:"√(8/2) = ?", choices:["2","√4","4","1"], correct:0, explain:"√(8/2)=√4=2."},
        { q:"a^(1/2) = ?", choices:["√a","a^2","log a","1/a"], correct:0, explain:"Definisi eksponen pecahan."}
      ],
      nonroutine: [
        { q:"Jika √(x+1)=3 → x = ?", choices:["8","9","7","3"], correct:0, explain:"x+1=9 → x=8."},
        { q:"Rasionalisasi: 1/√2 = ?", choices:["√2/2","1/2","2/√2","√2"], correct:0, explain:"Kalikan pembilang dan penyebut dengan √2."},
        { q:"Sederhanakan √(1+2√3) menjadi bentuk (√a+√b)", choices:["√3+1","√2+√1","2√3","√4"], correct:0, explain:"(√3+1)^2 = 3 + 2√3 +1 = 4 + 2√3 → cocok setelah penyesuaian."},
        { q:"Jika ³√8 = ?", choices:["2","4","8","1"], correct:0, explain:"³√8=2."},
        { q:"Jika √(a)·√(b) = √(ab) berlaku untuk?", choices:["semua a,b ≥ 0","semua bilangan","hanya bilangan ganjil","tidak berlaku"], correct:0, explain:"Syarat non-negatif agar akar riil."}
      ]
    }
  },

  "Persamaan Linear": {
    icon: "📏",
    content: `
      <div class="materi-detail">
        <h2>Persamaan Linear</h2>
        <h3>1. Definisi</h3>
        <p>Persamaan linear satu variabel: ax + b = 0. Persamaan garis: y = mx + c.</p>

        <h3>2. Gradien & Intersep</h3>
        <p>Gradien m = (y2 − y1) / (x2 − x1). Intersep y saat x=0 adalah c.</p>

        <h3>3. Contoh</h3>
        <p>Selesaikan 2x + 3 = 11. 2x = 8 → x = 4.</p>

        <div style="margin-top:12px"><button class="show-btn" onclick="startQuizForTopic('Persamaan Linear')">Mulai Kuis Persamaan Linear (5+5)</button></div>
      </div>
    `,
    quiz: {
      routine: [
        { q:"Selesaikan 2x+3=11", choices:["x=4","x=3","x=2","x=5"], correct:0, explain:"2x=8 → x=4."},
        { q:"Gradien garis melalui (2,5) & (6,13)", choices:["2","4","1","3"], correct:0, explain:"m=(13−5)/(6−2)=8/4=2."},
        { q:"Titik potong y dari y=2x+3 adalah ?", choices:["3","2","0","−3"], correct:0, explain:"x=0 → y=3."},
        { q:"Selesaikan x/2 + 3 = 7", choices:["x=8","x=4","x=10","x=14"], correct:0, explain:"x/2=4 → x=8."},
        { q:"Selesaikan 5x−10=0", choices:["x=2","x=0","x=10","x=−2"], correct:0, explain:"5x=10 → x=2."}
      ],
      nonroutine: [
        { q:"x+(x+3)=15 → x = ?", choices:["6","7","5","8"], correct:0, explain:"2x+3=15 → 2x=12 → x=6."},
        { q:"Jika y(1)=4 & y(3)=10, y=ax+b → a = ?", choices:["3","2","6","1"], correct:0, explain:"a=(10−4)/(3−1)=6/2=3."},
        { q:"3x+2y=12 & x−y=1 → x = ?", choices:["14/5","16/5","11/5","9/5"], correct:0, explain:"dari x=y+1 → substitusi → 2(y+1)+3y=13 → solve → hasil."},
        { q:"Harga naik 20% dari 10000 → baru = ?", choices:["12000","10000","20000","8000"], correct:0, explain:"10000·1.2=12000."},
        { q:"5 orang butuh 8 hari → 10 orang butuh ?", choices:["4","16","8","2"], correct:0, explain:"5×8=40 pekerjaan → 10×t=40 → t=4."}
      ]
    }
  },

  "Pertidaksamaan Linear": {
    icon: "⚖️",
    content: `
      <div class="materi-detail">
        <h2>Pertidaksamaan Linear</h2>
        <h3>1. Definisi & Aturan</h3>
        <p>Pertidaksamaan linear: ax + b > c, atau ≤, ≥. Jika dikali penyelesaian dengan bilangan negatif, arah tanda berbalik.</p>

        <h3>2. Contoh</h3>
        <p>Selesaikan 2x−5 ≤ 9 → 2x ≤ 14 → x ≤ 7.</p>

        <div style="margin-top:12px"><button class="show-btn" onclick="startQuizForTopic('Pertidaksamaan Linear')">Mulai Kuis Pertidaksamaan (5+5)</button></div>
      </div>
    `,
    quiz: {
      routine: [
        { q:"Selesaikan x+3>7", choices:["x>4","x<4","x≥4","x=4"], correct:0, explain:"x>4."},
        { q:"Selesaikan 2x−5 ≤ 9", choices:["x ≤ 7","x ≥ 7","x ≤ 2","x ≥ 2"], correct:0, explain:"2x ≤14 → x ≤ 7."},
        { q:"Selesaikan −3x > 6", choices:["x < −2","x > −2","x = −2","x = 2"], correct:0, explain:"Bagi −3 (ubah tanda) → x < −2."},
        { q:"Gabungan: 1 < x ≤ 4 → angka termasuk ?", choices:["2","1","5","0"], correct:0, explain:"2 memenuhi."},
        { q:"(x−2)(x+1)>0 → solusi ?", choices:["x<−1 or x>2","−1<x<2","x between -1 and 2","x>−1"], correct:0, explain:"Uji interval → solusi x<−1 atau x>2."}
      ],
      nonroutine: [
        { q:"|x−2| < 3 → solusi ?", choices:["−1 < x < 5","x<−1 or x>5","x between 2 and 3","x>0"], correct:0, explain:"−3 < x−2 < 3 → −1 < x < 5."},
        { q:"Gabungan: x<2 or x>5 → notasi ?", choices:["(−∞,2)∪(5,∞)","(2,5)","[2,5]","(−∞,∞)"], correct:0, explain:"Gabungan interval."},
        { q:"Jika dikali −1 pada 2<x → tanda berubah bagaimana?", choices:["terbalik","tidak berubah","lebih besar","lebih kecil"], correct:0, explain:"kali −1 ubah arah pertidaksamaan."},
        { q:"Toleransi: |x−50| ≤ 2 → rentang ?", choices:["48–52","50–52","−2–2","48–49"], correct:0, explain:"x between 48 and 52."},
        { q:"Soal gabungan faktor & grafik: solusi biasanya ?", choices:["interval","titik","kosong","semua real"], correct:0, explain:"Solusi umumnya interval."}
      ]
    }
  },

  "Fungsi": {
    icon: "🔠",
    content: `
      <div class="materi-detail">
        <h2>Fungsi</h2>
        <h3>1. Pengertian</h3>
        <p>Fungsi f: X → Y memetakan setiap x ke satu nilai y = f(x). Domain & range perlu diperhatikan.</p>

        <h3>2. Operasi & Contoh</h3>
        <p>Jika f(x)=2x+3 → f(2)=7. Invers f−1 ada jika fungsi bijektif.</p>

        <div style="margin-top:12px"><button class="show-btn" onclick="startQuizForTopic('Fungsi')">Mulai Kuis Fungsi (5+5)</button></div>
      </div>
    `,
    quiz: {
      routine: [
        { q:"f(x)=2x+3, f(2) = ?", choices:["7","5","6","4"], correct:0, explain:"2·2+3=7."},
        { q:"Jika f(1)=4 & f(2)=7 untuk f(x)=ax+b → a = ?", choices:["3","2","1","4"], correct:0, explain:"a=(7−4)/(2−1)=3."},
        { q:"Domain f(x)=1/(x−2) adalah ?", choices:["x≠2","x>2","x≥2","x=2"], correct:0, explain:"Pembagian oleh nol tidak diperbolehkan."},
        { q:"Invers f(x)=2x+3 → f−1(x) = ?", choices:["(x−3)/2","2x+3","x+3","(x+3)/2"], correct:0, explain:"Tukar x dan y lalu selesaikan."},
        { q:"Komposisi f(g(x)) f(x)=x+1,g(x)=2x → f(g(x))=?", choices:["2x+1","2x","x+1","x+2"], correct:0, explain:"g(x)=2x → f(g(x))=2x+1."}
      ],
      nonroutine: [
        { q:"Jika f(f(x))=4x+3 dan f(x)=ax+b → a dan b?", choices:["a=2,b=1","a=1,b=3","a=4,b=3","a=2,b=0"], correct:0, explain:"a^2=4→a=2; ab+b=3 → b(a+1)=3 → b=1."},
        { q:"Transformasi y=(x−2)^2 → shift ?", choices:["kanan 2","kiri 2","up 2","down 2"], correct:0, explain:"x−2 → shift kanan 2."},
        { q:"Syarat linear bijektif ax+b ?", choices:["a≠0","a=0","b=0","a=1"], correct:0, explain:"a≠0 supaya one-to-one."},
        { q:"Jika f(x)=x^2 (domain semua real) → bijektif?", choices:["tidak","ya","kadang","gantung"], correct:0, explain:"x^2 bukan bijektif pada semua real (dua x berbeda bisa beri y sama)."},
        { q:"Fungsi dengan range non-negatif contoh?", choices:["x^2","x","ln x","1/x"], correct:0, explain:"x^2 ≥ 0 untuk semua real x."}
      ]
    }
  },

  "Fungsi Kuadrat": {
    icon: "🔷",
    content: `
      <div class="materi-detail">
        <h2>Fungsi Kuadrat</h2>
        <h3>1. Bentuk Umum</h3>
        <p>y = ax^2 + bx + c (a ≠ 0)</p>
        <h3>2. Diskriminan & Akar</h3>
        <p>D = b^2 − 4ac. D>0 → 2 akar real; D=0 → 1 akar; D<0 → akar imajiner.</p>
        <h3>3. Titik Puncak (Vertex)</h3>
        <p>x_v = −b/(2a) ; y_v = f(x_v)</p>

        <div id="quadGraph" class="graph-canvas"></div>

        <div style="margin-top:12px"><button class="show-btn" onclick="startQuizForTopic('Fungsi Kuadrat')">Mulai Kuis Fungsi Kuadrat (5+5)</button></div>
      </div>
    `,
    quiz: {
      routine: [
        { q:"Diskriminan D untuk x^2−4x+3 = ?", choices:["4","−4","0","1"], correct:0, explain:"D=(−4)^2 − 4·1·3 = 16−12=4."},
        { q:"Akar x^2−5x+6 = 0 → x = ?", choices:["2 and 3","1 and 6","−2 and −3","3 and 4"], correct:0, explain:"(x−2)(x−3)=0 → x=2,3."},
        { q:"Vertex y=x^2−4x+3 occurs at x = ?", choices:["2","−2","4","−4"], correct:0, explain:"x_v = −b/(2a) = 4/2 = 2."},
        { q:"Jika a>0 parabola membuka ke ... ?", choices:["atas","bawah","kiri","kanan"], correct:0, explain:"a>0 → membuka ke atas."},
        { q:"Jika f(0)=1 pada y=ax^2+bx+c → c = ?", choices:["1","0","a","b"], correct:0, explain:"x=0 → y=c → c=1."}
      ],
      nonroutine: [
        { q:"Jika f(1)=6,f(2)=11,f(3)=18 (y=ax^2+bx+c) → a=? (pilih contoh)", choices:["1","2","3","0"], correct:0, explain:"Menyusun sistem → solve → a=1 (contoh)."},
        { q:"D<0 → jenis akar ?", choices:["kompleks","real distinct","real equal","none"], correct:0, explain:"D<0 → akar kompleks konjugat."},
        { q:"Gabungan linear & kuadrat: solusi pake?", choices:["substitusi/eliminasi","trial","grafik saja","tidak bisa"], correct:0, explain:"Gunakan substitusi/eliminasi atau metode numerik."},
        { q:"Jika y=ax^2+bx+c melewati (0,1) & (1,4) & (2,11) → a=? (pilihan)", choices:["1","2","3","4"], correct:0, explain:"Buat sistem 3 persamaan → contoh hasil a=1."},
        { q:"Transformasi: y=(x−3)^2 → puncak pada ?", choices:["(3,0)","(−3,0)","(0,3)","(3,3)"], correct:0, explain:"pindah kanan 3."}
      ]
    }
  },

  "Geometri (Bangun Datar)": {
    icon: "🔷",
    content: `
      <div class="materi-detail">
        <h2>Geometri — Bangun Datar</h2>
        <h3>Persegi</h3>
        <p>Luas = s^2 ; Keliling = 4s</p>
        <h3>Persegi Panjang</h3>
        <p>Luas = p × l ; Keliling = 2(p + l)</p>
        <h3>Segitiga</h3>
        <p>Luas = 1/2 × alas × tinggi ; Keliling = jumlah sisi</p>
        <h3>Lingkaran</h3>
        <p>Luas = π r^2 ; Keliling = 2 π r</p>

        <div style="margin-top:12px"><button class="show-btn" onclick="startQuizForTopic('Geometri (Bangun Datar)')">Mulai Kuis Geometri (5+5)</button></div>
      </div>
    `,
    quiz: {
      routine: [
        { q:"Luas persegi s=5 → ?", choices:["25","20","10","30"], correct:0, explain:"L = s^2 = 25."},
        { q:"Keliling persegi panjang p=6 l=3 → ?", choices:["18","9","36","20"], correct:0, explain:"K = 2(6+3)=18."},
        { q:"Luas segitiga a=10 t=12 → ?", choices:["60","120","30","24"], correct:0, explain:"L = 1/2 × 10 × 12 = 60."},
        { q:"Luas lingkaran r=7 (π≈3.14) → ?", choices:["≈153.86","≈43.96","≈21.99","≈100"], correct:0, explain:"π r^2 ≈ 3.14×49 ≈153.86."},
        { q:"Keliling lingkaran r=7 → ?", choices:["≈43.98","≈14","≈22","≈7"], correct:0, explain:"2πr ≈ 2×3.14×7 ≈ 43.98."}
      ],
      nonroutine: [
        { q:"Segitiga siku-siku 3-4-5, luas jika alas=3 tinggi=4 → ?", choices:["6","12","7.5","24"], correct:0, explain:"L=1/2×3×4=6."},
        { q:"Jika perimeter persegi = 20 → s = ?", choices:["5","4","10","6"], correct:0, explain:"4s = 20 → s=5."},
        { q:"Jika luas lingkaran sama dengan luas persegi s → hubungan r dan s?", choices:["πr^2 = s^2","2πr = s","r = s","tidak berkaitan"], correct:0, explain:"Setarakan rumus luas."},
        { q:"Tinggi prisma beraturan dihitung dari luas alas tertentu → konsep?", choices:["gunakan rumus volume","gunakan trigonometri","gunakan logaritma","tidak bisa"], correct:0, explain:"Volume=luas alas×tinggi."},
        { q:"Keliling segitiga 3 sisi 5,6,7 → ?", choices:["18","12","10","24"], correct:0, explain:"5+6+7=18."}
      ]
    }
  },

  "Trigonometri Dasar": {
    icon: "📐",
    content: `
      <div class="materi-detail">
        <h2>Trigonometri Dasar</h2>
        <h3>1. Definisi</h3>
        <p>sin = depan/hypotenuse, cos = samping/hypotenuse, tan = depan/samping.</p>

        <h3>2. Identitas</h3>
        <ul>
          <li>sin^2 x + cos^2 x = 1</li>
          <li>tan x = sin x / cos x</li>
        </ul>

        <h3>3. Nilai Sudut Istimewa</h3>
        <p>sin 30° = 1/2 ; cos 60° = 1/2 ; sin 45° = √2/2, dll.</p>

        <div style="margin-top:12px"><button class="show-btn" onclick="startQuizForTopic('Trigonometri Dasar')">Mulai Kuis Trigonometri (5+5)</button></div>
      </div>
    `,
    quiz: {
      routine: [
        { q:"sin30° = ?", choices:["1/2","√2/2","√3/2","0"], correct:0, explain:"sin30° = 1/2."},
        { q:"Jika sinθ=3/5 & cosθ=4/5 → tanθ = ?", choices:["3/4","4/3","5/3","3/5"], correct:0, explain:"tan = sin/cos = (3/5)/(4/5)=3/4."},
        { q:"tanθ = sinθ/cosθ → true atau false?", choices:["True","False","Sometimes","Undefined"], correct:0, explain:"Definisi."},
        { q:"cos^2 x + sin^2 x = ?", choices:["1","0","2","x"], correct:0, explain:"Identitas pythagoras trigonometri."},
        { q:"sin60° = ?", choices:["√3/2","1/2","√2/2","0"], correct:0, explain:"sin60° = √3/2."}
      ],
      nonroutine: [
        { q:"Jika tanθ = 0.5 & distance = 10m, tinggi = ?", choices:["5m","10m","20m","2m"], correct:0, explain:"height = tanθ × distance = 0.5 × 10 = 5m."},
        { q:"Sin2θ = 2 sinθ cosθ, jika sinθ=1/2 & cosθ=√3/2 → sin2θ = ?", choices:["√3/2","1/2","1","0"], correct:0, explain:"2*(1/2)*(√3/2)=√3/2."},
        { q:"Gunakan identity untuk ubah sin(x)cos(x) menjadi bentuk lain (hint)", choices:["(1/2)sin2x","sin^2 x + cos^2 x","tan x","cos x"], correct:0, explain:"sin x cos x = (1/2) sin 2x."},
        { q:"Amplitude y=2 sin x adalah ?", choices:["2","1","0.5","4"], correct:0, explain:"Amplitude = 2."},
        { q:"Jika cosθ = 0 untuk sudut di [0,360), sudutnya adalah ?", choices:["90° and 270°","0° and 180°","45° and 225°","60°"], correct:0, explain:"cosθ = 0 pada 90° dan 270°."}
      ]
    }
  }
}; // end MATERIALS


// ================= APP STATE & HELPERS =================
let quizState = null;
function el(id){ return document.getElementById(id); }
function openPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const elp = document.getElementById(id);
  if(elp) elp.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}

// ===== INIT NAV & CONTROLS =====
document.querySelectorAll('.tile').forEach(btn=>{
  btn.addEventListener('click', ()=> openPage(btn.dataset.target));
});
document.querySelectorAll('.back').forEach(b=>{
  b.addEventListener('click', ()=> {
    const target = b.dataset.target || 'homePage';
    openPage(target);
  });
});

// dark mode
const darkToggle = el('darkToggle');
darkToggle.addEventListener('click', ()=>{
  document.body.classList.toggle('dark');
  darkToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  localStorage.setItem('math_dark', document.body.classList.contains('dark') ? '1' : '0');
});
if(localStorage.getItem('math_dark')==='1'){ document.body.classList.add('dark'); darkToggle.textContent='☀️'; }

// search
el('searchBar').addEventListener('input', ()=>{
  const q = el('searchBar').value.trim().toLowerCase();
  document.querySelectorAll('#materiList .card').forEach(card=>{
    card.style.display = card.innerText.toLowerCase().includes(q) ? 'flex' : 'none';
  });
});

// ===== RENDER FUNCTIONS =====
function renderMaterials(){
  const list = el('materiList'); list.innerHTML = '';
  Object.keys(MATERIALS).forEach(key=>{
    const d = MATERIALS[key];
    const card = document.createElement('div'); card.className = 'card';
    card.innerHTML = `<div class="icon">${d.icon}</div><div><div class="title-small">${key}</div><div class="subtitle">Klik untuk buka materi lengkap</div></div>`;
    card.addEventListener('click', ()=> {
      el('materiDetail').innerHTML = d.content;
      openPage('materiDetailPage');
      // draw graphs if present
      if(key === 'Eksponen'){ drawExponentialSample(); }
      if(key === 'Fungsi Kuadrat'){ drawQuadraticSample(); }
    });
    list.appendChild(card);
  });
}

function renderLatihanList(){
  const list = el('latihanList'); list.innerHTML = '';
  Object.keys(MATERIALS).forEach(key=>{
    const d = MATERIALS[key];
    const card = document.createElement('div'); card.className='card';
    card.innerHTML = `<div class="icon">${d.icon}</div><div><div class="title-small">${key}</div><div class="subtitle">Klik untuk mulai kuis (5 rutin + 5 non-rutin)</div></div>`;
    card.addEventListener('click', ()=> {
      startQuizForTopic(key);
      openPage('latihanDetailPage');
    });
    list.appendChild(card);
  });
}

function renderTrikList(){
  const cont = el('trikList'); cont.innerHTML = '';
  Object.keys(MATERIALS).forEach(key=>{
    const tip = (MATERIALS[key].quiz && MATERIALS[key].quiz.routine && MATERIALS[key].quiz.routine[0]) ? MATERIALS[key].quiz.routine[0].explain : 'Baca materi untuk trik cepat.';
    const div = document.createElement('div'); div.className='tip';
    div.innerHTML = `<strong>${key}</strong><div style="margin-top:6px">${tip}</div>`;
    cont.appendChild(div);
  });
}

// ===== QUIZ ENGINE =====
function startQuizForTopic(topic){
  const item = MATERIALS[topic];
  if(!item || (!item.quiz || (!item.quiz.routine.length && !item.quiz.nonroutine.length))){
    el('latihanDetail').innerHTML = `<div class="block"><p>Latihan untuk "${topic}" belum tersedia.</p></div>`;
    el('quizArea').style.display = 'none';
    return;
  }
  // build pool
  const pool = [];
  item.quiz.routine.forEach(q=> pool.push({...q, type:'routine'}));
  item.quiz.nonroutine.forEach(q=> pool.push({...q, type:'non'}));
  // ensure 10 items (if template missing replicate routine)
  if(pool.length < 10){
    const copy = pool.slice(0);
    while(pool.length < 10) pool.push({...copy[pool.length % copy.length]});
  }
  // shuffle
  for(let i=pool.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [pool[i],pool[j]]=[pool[j],pool[i]]; }

  quizState = { topic, pool, idx:0, score:0 };
  renderQuizQuestion();
  el('quizArea').style.display = 'block';
  el('latihanDetail').innerHTML = `<div class="block"><h2>Kuis: ${topic}</h2><p>Jawaban benar akan menampilkan penjelasan rinci; jika salah, coba lagi.</p></div>`;
}

function renderQuizQuestion(){
  const area = el('quizArea');
  area.innerHTML = '';
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

// ===== GRAPH HELPERS (simple SVG) =====
function drawExponentialSample(){
  const g = el('expoGraph'); if(!g) return; g.innerHTML='';
  const svgNS='http://www.w3.org/2000/svg'; const svg=document.createElementNS(svgNS,'svg');
  svg.setAttribute('viewBox','0 0 220 120'); svg.setAttribute('width','100%'); svg.setAttribute('height','120');
  const ax=document.createElementNS(svgNS,'line'); ax.setAttribute('x1','10'); ax.setAttribute('y1','100'); ax.setAttribute('x2','210'); ax.setAttribute('y2','100'); ax.setAttribute('stroke','#ddd'); svg.appendChild(ax);
  const ay=document.createElementNS(svgNS,'line'); ay.setAttribute('x1','40'); ay.setAttribute('y1','10'); ay.setAttribute('x2','40'); ay.setAttribute('y2','100'); ay.setAttribute('stroke','#ddd'); svg.appendChild(ay);
  let d=''; for(let px=0; px<=160; px++){ const x=(px/16)*5; const yval=Math.pow(2,x/5); const py=100 - Math.min(90, Math.log2(yval)*12); const sx=40+px; d += (px===0?'M':' L') + sx + ' ' + py; }
  const path=document.createElementNS(svgNS,'path'); path.setAttribute('d',d); path.setAttribute('stroke','#457B9D'); path.setAttribute('fill','none'); path.setAttribute('stroke-width','2'); svg.appendChild(path);
  g.appendChild(svg);
}

function drawQuadraticSample(){
  const g = el('quadGraph'); if(!g) return; g.innerHTML='';
  const svgNS='http://www.w3.org/2000/svg'; const svg=document.createElementNS(svgNS,'svg');
  svg.setAttribute('viewBox','0 0 220 120'); svg.setAttribute('width','100%'); svg.setAttribute('height','120');
  const axis=document.createElementNS(svgNS,'line'); axis.setAttribute('x1','10'); axis.setAttribute('y1','60'); axis.setAttribute('x2','210'); axis.setAttribute('y2','60'); axis.setAttribute('stroke','#eee'); svg.appendChild(axis);
  let pathD=''; for(let px=0; px<=200; px+=2){ const x=(px-100)/10; const y=x*x - 4*x + 3; const py=60 - (y*4); pathD += (px===0?'M':'L') + (10+px) + ' ' + py; }
  const path=document.createElementNS(svgNS,'path'); path.setAttribute('d',pathD); path.setAttribute('stroke','#3A7D44'); path.setAttribute('fill','none'); path.setAttribute('stroke-width','2'); svg.appendChild(path);
  g.appendChild(svg);
}

// ===== INIT RENDER =====
renderMaterials();
renderLatihanList();
renderTrikList();
openPage('homePage');
