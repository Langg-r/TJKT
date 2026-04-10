/* =========================================
   TKJ SKANSA BINUT — script.js
   ========================================= */

/* ==========================================
   DATA SISWA
   Isi data di bawah ini untuk semua 39 siswa.
   Template sudah disediakan 4 siswa pertama.
   Salin & edit untuk sisanya.

   Untuk foto: simpan di folder img/
   Format nama file bebas, misal: "siswa1.jpg"
   Jika foto tidak ada, avatar otomatis tampil.
   ========================================== */

const DATA_SISWA = [
  {
    nama:  "Muhammad Gilang Romadhon",
    foto:  "Foto/gilang.jpg",
    hobi:  "Gaming & Coding",
    quote: "Code today, lead tomorrow.",
    ig:    "--"
  },
  {
    nama:  "Dwi Ananta Susila Yudha",
    foto:  "Foto/yudha.jpg",
    hobi:  "Push Rank & Nonton Marapthon",
    quote: "Perjalanan jauh dimulai dari satu langkah.",
    ig:    "--"
  },
  {
    nama:  "Gilang Rezki Oktavian",
    foto:  "Foto/gilangg.jpg",
    hobi:  "Gooning & Gaming",
    quote: "Jangan Melihat Orang Hanya Dari Mani nya.",
    ig:    "--"
  },
  {
    nama:  "Rizky Trian Purba",
    foto:  "Foto/rizky.jpg",
    hobi:  "ngoprek samsung & Elektronik",
    quote: "Gagal adalah awal dari Keputus asaan",
    ig:    "--"
  },
  {
    nama:  "Wan Dizzy Zulfahri",
    foto:  "Foto/wan.jpg",
    hobi:  "Volly & Selfie",
    quote: "Ada Waktunya untuk Tinggi.",
    ig:    "--"
  },
  {
    nama:  "Muhardi",
    foto:  "Foto/muhardi.jpg",
    hobi:  "Olahraga & Balap",
    quote: "Aku bisa berhentiin hujan.",
    ig:    "--"
  },
  {
    nama:  "Muhammad Wahyu Pratama",
    foto:  "Foto/wahyu.jpg",
    hobi:  "Sepak Bola & interval 5 km",
    quote: "Wahyu Agak Malas Woi.",
    ig:    "--"
  },
  {
    nama:  "Naysila Putri Sarifudin",
    foto:  "Foto/nay.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Kusmanisya Tarania Malik",
    foto:  "Foto/ninis.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Nurul Arbani Safira",
    foto:  "Foto/arbani.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Nur Adawiyah",
    foto:  "Foto/nur.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Seni",
    foto:  "Foto/seni.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Valene",
    foto:  "Foto/valene.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Khasa Nova Turnip",
    foto:  "Foto/nova.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Rafasya Dewi Aurora",
    foto:  "Foto/rora.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Mutiara Oktaini",
    foto:  "Foto/mutiara.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Aline Chrissi Situmorang",
    foto:  "Foto/alin.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Vanitha Ramadhanie",
    foto:  "Foto/vanitha.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Jesty Novianty",
    foto:  "Foto/jesty.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Nazwa Khairunnisa",
    foto:  "Foto/wawa.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Intan Fira Nur Khafifah",
    foto:  "Foto/intan.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Jessica A Yuwan",
    foto:  "Foto/jessica.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Siti Halfira Syaqieb",
    foto:  "Foto/echa.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Five Aiman Deswati",
    foto:  "Foto/five.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Mutia Salsabila Hadis",
    foto:  "Foto/muti.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Syafira Navadila",
    foto:  "Foto/syafira.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Silfy Safputri",
    foto:  "Foto/silfy.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Nasywa Sherly N",
    foto:  "Foto/sherly.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Cut Ayuni Asri",
    foto:  "Foto/cut.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Lussy Aguspriana Putri",
    foto:  "Foto/lusi.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Azira Three Najwa Sitompul",
    foto:  "Foto/azira.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Novianti",
    foto:  "Foto/novi.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Sabrina Annisa Purwati Pangestu",
    foto:  "Foto/sabrina.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Ashya Maya Gustina",
    foto:  "Foto/maya.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Shifa Nuha Alviana",
    foto:  "Foto/nuha.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Lira Novriyanti",
    foto:  "Foto/lira.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Nur Septiani Putri",
    foto:  "Foto/nursep.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Devana Puspita",
    foto:  "Foto/deva.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  },
  {
    nama:  "Nabilla Fitriyani",
    foto:  "Foto/nabila.jpg",
    hobi:  "--",
    quote: "--",
    ig:    "--"
  }
];

/* ==========================================
   RENDER KARTU SISWA
   ========================================== */
function renderSiswa(data) {
  const grid = document.getElementById("siswa-grid");
  const countEl = document.getElementById("search-count");
  const noResult = document.getElementById("no-result");

  grid.innerHTML = "";

  if (data.length === 0) {
    noResult.style.display = "block";
    countEl.textContent = "Tidak ada siswa ditemukan";
    return;
  }

  noResult.style.display = "none";
  countEl.textContent = `Menampilkan ${data.length} siswa`;

  data.forEach((siswa, i) => {
    // Fallback avatar jika foto tidak ada
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(siswa.nama)}&background=C5D9F0&color=2D5D96&size=400&font-size=0.35&bold=true`;

    const card = document.createElement("div");
    card.className = "siswa-card";
    card.style.animationDelay = `${Math.min(i * 0.04, 0.6)}s`;

    card.innerHTML = `
      <div class="siswa-photo-wrap" onclick="openLightbox('${siswa.foto}', '${escHtml(siswa.nama)}')">
        <img
          class="siswa-photo"
          src="${siswa.foto}"
          alt="${escHtml(siswa.nama)}"
          onerror="this.src='${avatarUrl}'"
        />
        <div class="photo-overlay"><span>🔍</span></div>
      </div>
      <div class="siswa-body">
        <div class="siswa-name">${escHtml(siswa.nama)}</div>
        <div class="siswa-hobi">${escHtml(siswa.hobi)}</div>
        <div class="siswa-quote">"${escHtml(siswa.quote)}"</div>
        <a
          class="siswa-ig"
          href="https://instagram.com/${escHtml(siswa.ig)}"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
          @${escHtml(siswa.ig)}
        </a>
      </div>
    `;

    grid.appendChild(card);
  });
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ==========================================
   SEARCH / FILTER
   ========================================== */
function filterSiswa() {
  const q = document.getElementById("search-input").value.toLowerCase().trim();
  const filtered = q
    ? DATA_SISWA.filter(s => s.nama.toLowerCase().includes(q))
    : DATA_SISWA;
  renderSiswa(filtered);
}

/* ==========================================
   MUSIC PLAYER
   ========================================== */
let isPlaying = false;

function toggleMusic() {
  const audio     = document.getElementById("bg-music");
  const iconPlay  = document.getElementById("icon-play");
  const iconPause = document.getElementById("icon-pause");
  const label     = document.getElementById("music-label");

  if (isPlaying) {
    audio.pause();
    iconPlay.style.display  = "block";
    iconPause.style.display = "none";
    label.textContent = "Putar Musik";
    isPlaying = false;
  } else {
    audio.play().catch(() => {
      // Browser block autoplay — sudah OK, user yang klik
    });
    iconPlay.style.display  = "none";
    iconPause.style.display = "block";
    label.textContent = "Jeda Musik";
    isPlaying = true;
  }
}

/* ==========================================
   LIGHTBOX
   ========================================== */
function openLightbox(src, caption) {
  const box      = document.getElementById("lightbox");
  const img      = document.getElementById("lightbox-img");
  const capEl    = document.getElementById("lightbox-caption");
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(caption)}&background=C5D9F0&color=2D5D96&size=600`;

  img.src        = src;
  img.alt        = caption;
  img.onerror    = () => { img.src = avatarFallback; };
  capEl.textContent = caption;

  box.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("active");
  document.body.style.overflow = "";
}

// Tutup lightbox dengan tombol Escape
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeLightbox();
});

/* ==========================================
   INIT
   ========================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderSiswa(DATA_SISWA);
});
