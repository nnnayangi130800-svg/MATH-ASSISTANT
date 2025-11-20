
/* PAGE SWITCH */
document.querySelectorAll("[data-target]").forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.dataset.target;
        showPage(target);
    });
});

function showPage(id) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    window.scrollTo(0, 0);
}

/* =====================
   DARK MODE
===================== */
document.getElementById("darkToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

/* =====================
   1. MATERI
===================== */

const materiList = [
    {name:"Eksponen", icon:"🧮", id:"eksponen",
     content:`▶ Pengertian\nBilangan berpangkat adalah…\n\n▶ Rumus\n a^m × a^n = a^(m+n)\n a^m / a^n = a^(m-n)\n …\n\n▶ Sifat\n 1. …\n 2. …\n 3. …`
    },
    {name:"Logaritma", icon:"📊", id:"logaritma",
     content:`▶ Pengertian\nLogaritma adalah…\n\n▶ Rumus\n log_a b = c ↔ a^c = b\n …\n\n▶ Sifat\n1.…\n2.…`
    },
    {name:"Bentuk Akar", icon:"📐", id:"akar",
     content:`▶ Pengertian\nAkar adalah…\n\n▶ Rumus\n√a × √b = √(ab)\n…`
    },
    {name:"Persamaan Linear", icon:"📏", id:"linear",
     content:`▶ Rumus\n y = mx + c\n m = (y2 − y1)/(x2 − x1)`
    },
    {name:"Pertidaksamaan Linear", icon:"➗", id:"ptdl",
     content:`▶ Aturan\nJika dikali bilangan negatif → arah tanda berubah`
    },
    {name:"Fungsi", icon:"🔤", id:"fungsi",
     content:`▶ Pengertian\nFungsi memetakan x → y`
    },
    {name:"Fungsi Kuadrat", icon:"🟦", id:"kuadrat",
     content:`▶ Rumus\n y = ax² + bx + c\n D = b² − 4ac`
    },
    {name:"Trigonometri Dasar", icon:"📐", id:"trigo",
     content:`sin = depan / miring\ncos = samping / miring\ntan = depan / samping`
    }
];

const materiContainer = document.getElementById("materiContainer");

materiList.forEach(mat => {
    const card = document.createElement("div");
    card.className = "block";
    card.style.cursor = "pointer";
    card.innerHTML = `<strong>${mat.icon} ${mat.name}</strong>`;
    card.onclick = () => openMateri(mat);
    materiContainer.appendChild(card);
});

function openMateri(mat) {
    document.getElementById("materiTitle").innerText = mat.icon+" "+mat.name;
    document.getElementById("materiContent").innerHTML =
        `<pre>${mat.content}</pre>`;
    showPage("materiDetail");
}

/* =====================
   2. LATIHAN SOAL
===================== */

const latihanCategories = [
    {name:"Eksponen", icon:"🧮", id:"lat_eks"},
    {name:"Logaritma", icon:"📊", id:"lat_log"},
    {name:"Bentuk Akar", icon:"📐", id:"lat_akar"},
];

const latihanData = {
    lat_eks: [
        {q:"Hitung 2³ × 2⁴", a:"3+4 = 7 → 2⁷ = 128"},
        {q:"Sederhanakan 4⁵ ÷ 4²", a:"5−2 =3 → 4³ = 64"},
        // total 5 biasa + 5 non rutin
    ]
};

const latihanContainer = document.getElementById("latihanContainer");

latihanCategories.forEach(cat=>{
    const div=document.createElement("div");
    div.className="block";
    div.style.cursor="pointer";
    div.innerHTML=`<strong>${cat.icon} ${cat.name}</strong>`;
    div.onclick=()=>openLatihan(cat);
    latihanContainer.appendChild(div);
});

function openLatihan(cat){
    document.getElementById("latihanTitle").innerText =
        `${cat.icon} ${cat.name}`;

    const list=document.getElementById("latihanList");
    list.innerHTML="";

    latihanData[cat.id].forEach((item,i)=>{
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${item.q}</strong>
            <button class="back" style="margin-top:10px"
                onclick="toggleAns(${i})">Lihat Jawaban</button>
            <div id="ans-${i}" class="ans">${item.a}</div>
        `;
        list.appendChild(li);
    });

    showPage("latihanDetail");
}

function toggleAns(i) {
    const el=document.getElementById("ans-"+i);
    el.style.display = el.style.display === "block" ? "none" : "block";
}

/* =====================
   3. TRIK CEPAT
===================== */

const tips = [
    {title:"Eksponen", txt:"Jika basis sama → pangkat tinggal dijumlah/dikurang."},
    {title:"Logaritma", txt:"log(ab)=log a + log b → pecah perkalian jadi penjumlahan."},
    {title:"Akar", txt:"Kalikan akar per-akar: √a × √b = √(ab)."},
    {title:"Kuadrat", txt:"Gunakan D=b²-4ac untuk melihat banyak akar."}
];

const tipsContainer=document.getElementById("tipsContainer");

tips.forEach(t=>{
    const div=document.createElement("div");
    div.className="tip";
    div.innerHTML=`<strong>${t.title}</strong><br>${t.txt}`;
    tipsContainer.appendChild(div);
});
