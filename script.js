/* =========================================
   TKJ SKANSA BINUT — script.js
   ========================================= */

/* ==========================================
   SUPABASE INIT — safe, tidak blokir loading
   ========================================== */
const SUPABASE_URL = 'https://sytcbztlwbvfkdfeakct.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5dGNienRsd2J2ZmtkZmVha2N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzODYxMDQsImV4cCI6MjEwNjk2MjEwNH0.SmY24xoVlUV4GuWtK00hNciy4WNUyC-4DtqNJvn8FEQ';

let _supabase = null;
function getSupabase() {
  if (_supabase) return _supabase;
  try {
    _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  } catch (e) {
    console.error('Supabase gagal diinisialisasi:', e);
  }
  return _supabase;
}

/* ==========================================
   DATA SISWA
   ========================================== */
const DATA_SISWA = [
  { nama: "Muhammad Gilang Romadhon",        foto: "Foto/muhammad-gilang.jpeg",  hobi: "Ngulik Komputer",          quote: "apa aja",                                                        ig: "glngrmdhn619",      gender: "laki" },
  { nama: "Dwi Ananta Susila Yudha",         foto: "Foto/dwi-ananta.jpeg",       hobi: "Volly",                    quote: "If it's meant to be, it'll be.",                                 ig: "hexos_02",          gender: "laki" },
  { nama: "Gilang Rezki Oktavian",           foto: "Foto/gilang-rezki.jpeg",     hobi: "Masukkan Teks...",         quote: "lorem ipsum dolor sit amet",                                ig: "lngrzvn_",                gender: "laki" },
  { nama: "Rizky Trian Purba",               foto: "Foto/rizky.jpeg",            hobi: "CODan di Batam",           quote: "Jangan fanatik didunia yang munafik",                            ig: "Xiaozsi67",         gender: "laki" },
  { nama: "Wan Dizzy Zulfahri",              foto: "Foto/wan.jpeg",              hobi: "Volly",                    quote: "Ongok lah kau ni",                                               ig: "wandizzy05",        gender: "laki" },
  { nama: "Muhardi",                         foto: "Foto/muhardi.jpeg",          hobi: "Bola",                     quote: "Aku bisa berhentiin hujan",                                      ig: "bujee_03",          gender: "laki" },
  { nama: "Muhammad Wahyu Pratama",          foto: "Foto/muhammad-wahyu.jpeg",   hobi: "Lari",                     quote: "Trust the process",                                              ig: "mhmdwhyprtm_",      gender: "laki" },
  { nama: "Naysila Putri Sarifudin",         foto: "Foto/naysila.jpeg",          hobi: "Baca novel",               quote: "You never know until you try, and don't forget to eat mie ayam.", ig: "naysilaaptrii",     gender: "perempuan" },
  { nama: "Kusmanisya Tarania Malik",        foto: "Foto/kusmanisya.jpeg",       hobi: "Bobok, makan, nonton",     quote: "Kalau ga makan ya tidur",                                        ig: "ninissya.a",        gender: "perempuan" },
  { nama: "Nurul Arbani Safira",             foto: "Foto/nurul-arbani.jpeg",     hobi: "Tidur",                    quote: "Selalu sabar",                                                   ig: "nurularbanisafira16", gender: "perempuan" },
  { nama: "Nur Adawiyah",                    foto: "Foto/nur-adawiyah.jpeg",     hobi: "Nyetrika baju",            quote: "Duit di atas segalanya, segalanya adalah duit",                  ig: "nradwyhhhhh",       gender: "perempuan" },
  { nama: "Seni",                            foto: "Foto/seni.jpeg",             hobi: "Memasak",                  quote: "Life is a journey, not a race",                                  ig: "___sensennn",       gender: "perempuan" },
  { nama: "Valene",                          foto: "Foto/valene.jpeg",           hobi: "Menggambar",               quote: "Imo>all prestasi",                                               ig: "vlennne_",          gender: "perempuan" },
  { nama: "Khasa Nova Turnip",               foto: "Foto/khasa.jpeg",            hobi: "--",                       quote: "--",                                                             ig: "--",                gender: "perempuan" },
  { nama: "Rafasya Dewi Aurora",             foto: "Foto/rafasya.jpeg",          hobi: "Tidur",                    quote: "Hidup untuk hidup",                                              ig: "auroraa0511",       gender: "perempuan" },
  { nama: "Mutiara Oktaini",                 foto: "Foto/mutiara.jpeg",          hobi: "Traveling & hal baru",     quote: "After all this time? Always",                                    ig: "imrtl.muez",        gender: "perempuan" },
  { nama: "Aline Chrissi Situmorang",        foto: "Foto/aline.jpeg",            hobi: "Cooking",                  quote: "Tetap jalan terus",                                              ig: "alinn_linn01",      gender: "perempuan" },
  { nama: "Vanitha Ramadhanie",              foto: "Foto/vanitha.jpeg",          hobi: "Habisin uang",             quote: "Mimpi indah kenyataan mahal",                                    ig: "vtharmni",          gender: "perempuan" },
  { nama: "Jesty Novianty",                  foto: "Foto/jesty.jpeg",            hobi: "Voli",                     quote: "Your actions answered everything",                               ig: "jestyy.n",          gender: "perempuan" },
  { nama: "Nazwa Khairunnisa",               foto: "Foto/nazwa.jpeg",            hobi: "Kalau seru, jadi hobi",    quote: "Jangan nikah sebelum sukses, nanti jualan pop es",               ig: "frlynzw",           gender: "perempuan" },
  { nama: "Intan Fira Nur Khafifah",         foto: "Foto/intan.jpeg",            hobi: "Memasak",                  quote: "Be yourself",                                                    ig: "firra_51",          gender: "perempuan" },
  { nama: "Jessica A Yuwan",                 foto: "Foto/jessica.jpeg",          hobi: "Begadang",                 quote: "Jaga diri",                                                      ig: "wnnywnn",           gender: "perempuan" },
  { nama: "Siti Halfira Syaqieb",            foto: "Foto/siti-halfira.jpeg",     hobi: "Whatever",                 quote: "Remember to carpe diem because memento mori",                    ig: "echha_202",         gender: "perempuan" },
  { nama: "Five Aiman Deswati",              foto: "Foto/five.jpeg",             hobi: "Baca novel",               quote: "Di antara aksara, kutemukan diri.",                              ig: "_fivedeee__",       gender: "perempuan" },
  { nama: "Mutia Salsabila Hadis",           foto: "Foto/mutia-salsabila.jpeg",  hobi: "Mencintai nya..",          quote: "Be a kind person even if nothing comes back in return",          ig: "mutyslsbilaa",      gender: "perempuan" },
  { nama: "Syafira Navadila",                foto: "Foto/syafira.jpeg",          hobi: "Mabar",                    quote: "Kejar lah impianmu",                                             ig: "syafira_navadila18", gender: "perempuan" },
  { nama: "Silfy Safputri",                  foto: "Foto/silfy.jpeg",            hobi: "Jalan, makan, karaoke",    quote: "Ayok makan",                                                     ig: "slfysfptri",        gender: "perempuan" },
  { nama: "Nasywa Sherly N",                 foto: "Foto/nasywa-sherly.jpeg",    hobi: "Olahraga",                 quote: "Bebas berekspresi",                                              ig: "rlyy_saa",          gender: "perempuan" },
  { nama: "Cut Ayuni Asri",                  foto: "Foto/cut-ayuni.jpeg",        hobi: "Nonton",                   quote: "Diam, tumbuh, bersinar",                                         ig: "ilyyy_asriii",      gender: "perempuan" },
  { nama: "Lussy Aguspriana Putri",          foto: "Foto/lussy.jpeg",            hobi: "Jalan-jalan, Nari",        quote: "jalanin aja",                                                             ig: "--",                gender: "perempuan" },
  { nama: "Azira Three Najwa Sitompul",      foto: "Foto/azira.jpeg",            hobi: "Makan, tidur",             quote: "Jangan lupa bobo teman-teman!",                                  ig: "azirathreenw_",     gender: "perempuan" },
  { nama: "Novianti",                        foto: "Foto/novianti.jpeg",         hobi: "Jajan",                    quote: "Ya gitu la",                                                     ig: "nvyan.tii",         gender: "perempuan" },
  { nama: "Sabrina Annisa Purwati Pangestu", foto: "Foto/sabrina.jpeg",          hobi: "Menggambar, jurnaling",    quote: "Life is a blank canvas, n I'm just sketching my way.",           ig: "sabrinnssaa",       gender: "perempuan" },
  { nama: "Ashya Maya Gustina",              foto: "Foto/ashya.jpeg",            hobi: "Jalan-jalan, jajan",       quote: "Life isn't about finding yourself, it's about creating yourself", ig: "ashyagstn_",        gender: "perempuan" },
  { nama: "Shifa Nuha Alviana",              foto: "Foto/shifa.jpeg",            hobi: "Tidur, jajan, healing",    quote: "Selalu ngalah",                                                  ig: "shifanuhaalviana_", gender: "perempuan" },
  { nama: "Lira Novriyanti",                 foto: "Foto/lira.jpeg",             hobi: "Menggambar",               quote: "Kemajuan kecil tetaplah kemajuan",                               ig: "liliyystrawbery18", gender: "perempuan" },
  { nama: "Nur Septiani Putri",              foto: "Foto/nur-septiani.jpeg",     hobi: "Tidur",                    quote: "Go to Mekkah with family",                                       ig: "xxyzsep29",         gender: "perempuan" },
  { nama: "Devana Puspita",                  foto: "Foto/devana.jpeg",           hobi: "Badminton & lari",         quote: "Success and make parents happy",                                 ig: "devanapuspita",     gender: "perempuan" },
  { nama: "Nabilla Fitriyani",               foto: "Foto/nabilla.jpeg",          hobi: "Jalan, kulineran, renang", quote: "Jangan peduliin kata orang, lampaui batasmu",                    ig: "na.fityaa",         gender: "perempuan" },
];

/* ==========================================
   STATE
   ========================================== */
let activeFilter = 'semua';

/* ==========================================
   LOADING SCREEN
   ========================================== */
window.addEventListener('load', () => {
  const bar    = document.getElementById('loading-bar');
  const screen = document.getElementById('loading-screen');
  requestAnimationFrame(() => { bar.style.width = '100%'; });
  setTimeout(() => { screen.classList.add('hide'); }, 2300);
});

/* ==========================================
   RENDER KARTU SISWA
   ========================================== */
function renderSiswa(data) {
  const grid     = document.getElementById('siswa-grid');
  const countEl  = document.getElementById('search-count');
  const noResult = document.getElementById('no-result');

  grid.innerHTML = '';

  if (data.length === 0) {
    noResult.style.display = 'block';
    countEl.textContent = 'Tidak ada siswa ditemukan';
    return;
  }

  noResult.style.display = 'none';
  countEl.textContent = `Menampilkan ${data.length} siswa`;

  data.forEach((siswa, i) => {
    const bgColor  = siswa.gender === 'laki' ? 'C5D9F0' : 'F5C6D8';
    const txtColor = siswa.gender === 'laki' ? '2D5D96' : '8B3A5A';
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(siswa.nama)}&background=${bgColor}&color=${txtColor}&size=400&font-size=0.35&bold=true`;

    const card = document.createElement('div');
    card.className = `siswa-card ${siswa.gender}`;
    card.style.animationDelay = `${Math.min(i * 0.04, 0.6)}s`;

    // Sembunyikan baris ig kalau isinya "--"
    const igHtml = siswa.ig === '--' ? '' : `
      <a class="siswa-ig" href="https://instagram.com/${escHtml(siswa.ig)}" target="_blank" rel="noopener noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
        @${escHtml(siswa.ig)}
      </a>`;

    // Sembunyikan hobi & quote kalau "--"
    const hobiHtml  = siswa.hobi  !== '--' ? `<div class="siswa-hobi">${escHtml(siswa.hobi)}</div>`   : '';
    const quoteHtml = siswa.quote !== '--' ? `<div class="siswa-quote">"${escHtml(siswa.quote)}"</div>` : '';

    card.innerHTML = `
      <div class="siswa-photo-wrap" onclick="openLightbox('${siswa.foto}', '${escHtml(siswa.nama)}')">
        <img class="siswa-photo" src="${siswa.foto}" alt="${escHtml(siswa.nama)}"
          onerror="this.src='${avatarUrl}'" />
        <div class="photo-overlay"><span></span></div>
      </div>
      <div class="siswa-body">
        <div class="siswa-name">${escHtml(siswa.nama)}</div>
        ${hobiHtml}
        ${quoteHtml}
        ${igHtml}
      </div>
    `;

    grid.appendChild(card);
  });
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ==========================================
   FILTER (search + gender)
   ========================================== */
function applyFilters() {
  const q = document.getElementById('search-input').value.toLowerCase().trim();
  let filtered = DATA_SISWA;
  if (activeFilter !== 'semua') {
    filtered = filtered.filter(s => s.gender === activeFilter);
  }
  if (q) {
    filtered = filtered.filter(s => s.nama.toLowerCase().includes(q));
  }
  renderSiswa(filtered);
}

function filterSiswa() { applyFilters(); }

function setFilter(type, btn) {
  activeFilter = type;
  document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  applyFilters();
}

/* ==========================================
   MUSIC PLAYER
   ========================================== */
let isPlaying = false;

function toggleMusic() {
  const audio     = document.getElementById('bg-music');
  const iconPlay  = document.getElementById('icon-play');
  const iconPause = document.getElementById('icon-pause');
  const label     = document.getElementById('music-label');

  if (isPlaying) {
    audio.pause();
    iconPlay.style.display  = 'block';
    iconPause.style.display = 'none';
    label.textContent = 'Putar Musik';
    isPlaying = false;
  } else {
    audio.play().catch(() => {});
    iconPlay.style.display  = 'none';
    iconPause.style.display = 'block';
    label.textContent = 'Jeda Musik';
    isPlaying = true;
  }
}

/* ==========================================
   DARK MODE
   ========================================== */
function toggleDarkMode() {
  const html      = document.documentElement;
  const iconDark  = document.getElementById('icon-dark');
  const iconLight = document.getElementById('icon-light');
  const isDark    = html.getAttribute('data-theme') === 'dark';

  if (isDark) {
    html.setAttribute('data-theme', 'light');
    iconDark.style.display  = 'inline';
    iconLight.style.display = 'none';
    localStorage.setItem('theme', 'light');
  } else {
    html.setAttribute('data-theme', 'dark');
    iconDark.style.display  = 'none';
    iconLight.style.display = 'inline';
    localStorage.setItem('theme', 'dark');
  }
}

// Terapkan tema tersimpan saat load
(function () {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.addEventListener('DOMContentLoaded', () => {
      document.getElementById('icon-dark').style.display  = 'none';
      document.getElementById('icon-light').style.display = 'inline';
    });
  }
})();

/* ==========================================
   LIGHTBOX
   ========================================== */
function openLightbox(src, caption) {
  const box      = document.getElementById('lightbox');
  const img      = document.getElementById('lightbox-img');
  const capEl    = document.getElementById('lightbox-caption');
  const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(caption)}&background=C5D9F0&color=2D5D96&size=600`;

  img.src = src;
  img.alt = caption;
  img.onerror = () => { img.src = fallback; };
  capEl.textContent = caption;

  box.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

/* ==========================================
   BACK TO TOP
   ========================================== */
window.addEventListener('scroll', () => {
  const btn = document.getElementById('btn-backtotop');
  if (window.scrollY > 400) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================
   INIT
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
  renderSiswa(DATA_SISWA);
  initEditorTrigger();
  fetchGalleryPhotos();
});

/* ==========================================
   BOTTOM NAVIGATION — smooth scroll
   ========================================== */
function bnav(target) {
  const map = {
    search: 'section-search',
    siswa:  'section-siswa',
    foto:   'section-foto',
  };
  const el = document.getElementById(map[target]);
  if (el) {
    // offset: 60px navbar + 10px breathing room
    const y = el.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
  // highlight active nav button
  document.querySelectorAll('.bnav-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('bnav-' + target);
  if (btn) btn.classList.add('active');
}

/* ==========================================
   MODAL EDITOR — Trigger: ketik "langskuy"
   ========================================== */
let typedBuffer = '';
const TRIGGER_WORD = 'langskuy';

function initEditorTrigger() {
  // Keydown untuk desktop (non-input areas)
  document.addEventListener('keydown', (e) => {
    const tag = e.target.tagName.toLowerCase();
    const isSearchBar = e.target.id === 'search-input';

    // Skip jika di input lain (form editor, dll), tapi proses dari search bar tetap
    if (['input', 'textarea', 'select'].includes(tag) && !isSearchBar) return;

    // hanya karakter huruf
    if (e.key.length === 1) {
      typedBuffer += e.key.toLowerCase();
      if (typedBuffer.length > TRIGGER_WORD.length) {
        typedBuffer = typedBuffer.slice(-TRIGGER_WORD.length);
      }
      if (typedBuffer === TRIGGER_WORD) {
        typedBuffer = '';
        if (isSearchBar) {
          e.target.value = '';
          filterSiswa();
        }
        openLoginModal();
      }
    }
  });

  // Input event untuk search bar (mobile-friendly)
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value.toLowerCase();
      // Check apakah value mengandung trigger word
      if (val.includes(TRIGGER_WORD)) {
        e.target.value = '';
        filterSiswa();
        openLoginModal();
      }
    });
  }
}

function openLoginModal() {
  document.getElementById('login-overlay').classList.add('active');
  document.getElementById('login-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
  document.getElementById('login-overlay').classList.remove('active');
  document.getElementById('login-modal').classList.remove('active');
  document.body.style.overflow = '';
}

function openEditorModal() {
  closeLoginModal();
  document.getElementById('editor-overlay').classList.add('active');
  document.getElementById('editor-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeEditorModal() {
  document.getElementById('editor-overlay').classList.remove('active');
  document.getElementById('editor-modal').classList.remove('active');
  document.body.style.overflow = '';
}

/* ==========================================
   LOGIN & LOGOUT — Supabase Auth
   ========================================== */
async function handleLogin(e) {
  e.preventDefault();
  const btn = document.getElementById('login-btn');
  const msg = document.getElementById('login-msg');
  const btnText = document.getElementById('login-btn-text');
  const btnLoad = document.getElementById('login-btn-load');

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();

  btn.disabled = true;
  btnText.style.display = 'none';
  btnLoad.style.display = 'inline';
  msg.textContent = '';
  msg.className = 'login-msg';

  try {
    const { data, error } = await getSupabase().auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) throw error;

    msg.textContent = '✓ Login berhasil!';
    msg.classList.add('ok');
    
    setTimeout(() => {
      document.getElementById('form-login').reset();
      openEditorModal();
    }, 800);

  } catch (err) {
    msg.textContent = '✕ Login gagal: ' + (err.message || 'Email atau password salah');
    msg.classList.add('err');
    btn.disabled = false;
    btnText.style.display = 'inline';
    btnLoad.style.display = 'none';
  }
}

async function handleLogout() {
  if (!confirm('Yakin ingin logout?')) return;

  try {
    const { error } = await getSupabase().auth.signOut();
    if (error) throw error;

    alert('Logout berhasil!');
    closeEditorModal();
    location.reload();
  } catch (err) {
    alert('Logout gagal: ' + (err.message || err));
  }
}

function switchEditorTab(tab) {
  const tabs = ['siswa', 'lagu', 'edit', 'hapus'];
  tabs.forEach(t => {
    document.getElementById('etab-' + t).classList.toggle('active', t === tab);
    document.getElementById('epane-' + t).style.display = t === tab ? 'block' : 'none';
  });
  // Reset edit panel ke level 1 setiap kali tab dibuka
  if (tab === 'hapus') {
    document.getElementById('edit-level-1').style.display = 'block';
    document.getElementById('edit-level-2').style.display = 'none';
    document.getElementById('edit-level-3').style.display = 'none';
  }
}

/* ==========================================
   FORM TAMBAH SISWA (Supabase)
   ========================================== */
async function submitSiswa(e) {
  e.preventDefault();
  const btn  = document.getElementById('ebtn-siswa');
  const msg  = document.getElementById('emsg-siswa');
  const btnText = document.getElementById('ebtn-siswa-text');
  const btnLoad = document.getElementById('ebtn-siswa-load');

  const name     = document.getElementById('es-nama').value.trim();
  const hobbies  = document.getElementById('es-hobi').value.trim() || '--';
  const quote    = document.getElementById('es-quote').value.trim() || '--';
  const ig       = document.getElementById('es-ig').value.trim()   || '--';
  const gender   = document.getElementById('es-gender').value;
  const fotoFile = document.getElementById('es-foto').files[0];

  btn.disabled = true;
  btnText.style.display = 'none';
  btnLoad.style.display = 'inline';
  msg.textContent = '';
  msg.className = 'editor-msg';

  try {
    let fotoUrl = null;

    if (fotoFile) {
      const ext  = fotoFile.name.split('.').pop();
      const path = `students/${Date.now()}_${name.replace(/\s+/g, '_')}.${ext}`;
      const { error: upErr } = await getSupabase().storage
        .from('media')
        .upload(path, fotoFile, { upsert: true });

      if (upErr) throw upErr;

      const { data: urlData } = getSupabase().storage.from('media').getPublicUrl(path);
      fotoUrl = urlData.publicUrl;
    }

    const { error: dbErr } = await getSupabase().from('students').insert({
      name:      name,
      gender:    gender,
      hobbies:   hobbies,
      quote:     quote,
      image_url: fotoUrl
    });
    if (dbErr) throw dbErr;

    msg.textContent = '✓ Siswa berhasil disimpan!';
    msg.classList.add('ok');
    document.getElementById('form-siswa').reset();

  } catch (err) {
    msg.textContent = '✕ Gagal: ' + (err.message || err);
    msg.classList.add('err');
  } finally {
    btn.disabled = false;
    btnText.style.display = 'inline';
    btnLoad.style.display = 'none';
  }
}

/* ==========================================
   FORM TAMBAH LAGU (Supabase Storage + DB)
   ========================================== */
async function submitLagu(e) {
  e.preventDefault();
  const btn     = document.getElementById('ebtn-lagu');
  const msg     = document.getElementById('emsg-lagu');
  const btnText = document.getElementById('ebtn-lagu-text');
  const btnLoad = document.getElementById('ebtn-lagu-load');

  const title    = document.getElementById('el-judul').value.trim();
  const artist   = document.getElementById('el-artis').value.trim();
  const lyrics   = document.getElementById('el-lirik').value.trim();
  const coverFile = document.getElementById('el-cover').files[0];
  const audioFile = document.getElementById('el-audio').files[0];

  if (!coverFile || !audioFile) {
    showMsg(msg, 'err', '✕ Pilih file cover dan audio terlebih dulu.');
    return;
  }

  btn.disabled = true;
  btnText.style.display = 'none';
  btnLoad.style.display = 'inline';
  msg.textContent = '';
  msg.className = 'editor-msg';

  try {
    // Upload Cover
    const coverExt  = coverFile.name.split('.').pop();
    const coverPath = `covers/${Date.now()}_${title.replace(/\s+/g, '_')}.${coverExt}`;
    const { error: covErr } = await getSupabase().storage.from('media').upload(coverPath, coverFile, { upsert: true });
    if (covErr) throw covErr;
    const { data: covUrl } = getSupabase().storage.from('media').getPublicUrl(coverPath);

    // Upload Audio
    const audioExt  = audioFile.name.split('.').pop();
    const audioPath = `audio/${Date.now()}_${title.replace(/\s+/g, '_')}.${audioExt}`;
    const { error: audErr } = await getSupabase().storage.from('media').upload(audioPath, audioFile, { upsert: true });
    if (audErr) throw audErr;
    const { data: audUrl } = getSupabase().storage.from('media').getPublicUrl(audioPath);

    // Insert ke tabel playlists
    const { error: dbErr } = await getSupabase().from('playlists').insert({
      title:     title,
      artist:    artist,
      cover_url: covUrl.publicUrl,
      audio_url: audUrl.publicUrl,
      lyrics:    lyrics
    });
    if (dbErr) throw dbErr;

    showMsg(msg, 'ok', '✓ Lagu berhasil diupload & disimpan!');
    document.getElementById('form-lagu').reset();

  } catch (err) {
    showMsg(msg, 'err', '✕ Gagal: ' + (err.message || err));
  } finally {
    btn.disabled = false;
    btnText.style.display = 'inline';
    btnLoad.style.display = 'none';
  }
}

function showMsg(el, type, text) {
  el.textContent = text;
  el.className = 'editor-msg ' + type;
}

/* ==========================================
   HAPUS DATA — Muat & Hapus Lagu
   ========================================== */
async function loadLaguList() {
  const list = document.getElementById('hapus-lagu-list');
  const msg  = document.getElementById('emsg-hapus-lagu');
  list.innerHTML = '<li style="font-size:.78rem;color:var(--text-soft);padding:.4rem">Memuat…</li>';
  msg.textContent = '';

  const { data, error } = await getSupabase()
    .from('playlists')
    .select('id, title, artist')
    .order('created_at', { ascending: false });

  if (error) {
    list.innerHTML = '';
    showMsg(msg, 'err', '✕ Gagal memuat: ' + error.message);
    return;
  }

  list.innerHTML = '';
  if (!data || data.length === 0) {
    list.innerHTML = '<li style="font-size:.78rem;color:var(--text-soft);padding:.4rem">Belum ada lagu.</li>';
    return;
  }

  data.forEach(song => {
    const li = document.createElement('li');
    li.className = 'hapus-item';
    li.id = 'lagu-item-' + song.id;
    li.innerHTML = `
      <div class="hapus-item-info">
        <div class="hapus-item-name">${escHtml(song.title)}</div>
        <div class="hapus-item-sub">${escHtml(song.artist || '—')}</div>
      </div>
      <button class="ebtn-hapus" onclick="hapusLagu('${song.id}')">Hapus</button>
    `;
    list.appendChild(li);
  });
}

async function hapusLagu(id) {
  const msg = document.getElementById('emsg-hapus-lagu');
  if (!confirm('Yakin hapus lagu ini?')) return;

  const { error } = await getSupabase().from('playlists').delete().eq('id', id);
  if (error) {
    showMsg(msg, 'err', '✕ Gagal: ' + error.message);
    return;
  }

  // hapus dari UI
  const el = document.getElementById('lagu-item-' + id);
  if (el) el.remove();
  showMsg(msg, 'ok', '✓ Lagu berhasil dihapus.');
}

/* ==========================================
   HAPUS DATA — Muat & Hapus Siswa
   ========================================== */
async function loadSiswaList() {
  const list = document.getElementById('hapus-siswa-list');
  const msg  = document.getElementById('emsg-hapus-siswa');
  list.innerHTML = '<li style="font-size:.78rem;color:var(--text-soft);padding:.4rem">Memuat…</li>';
  msg.textContent = '';

  const { data, error } = await getSupabase()
    .from('students')
    .select('id, name, gender')
    .order('created_at', { ascending: false });

  if (error) {
    list.innerHTML = '';
    showMsg(msg, 'err', '✕ Gagal memuat: ' + error.message);
    return;
  }

  list.innerHTML = '';
  if (!data || data.length === 0) {
    list.innerHTML = '<li style="font-size:.78rem;color:var(--text-soft);padding:.4rem">Belum ada data siswa di database.</li>';
    return;
  }

  data.forEach(siswa => {
    const li = document.createElement('li');
    li.className = 'hapus-item';
    li.id = 'siswa-item-' + siswa.id;
    li.innerHTML = `
      <div class="hapus-item-info">
        <div class="hapus-item-name">${escHtml(siswa.name)}</div>
        <div class="hapus-item-sub">${siswa.gender === 'laki' ? '♂ Laki-laki' : '♀ Perempuan'}</div>
      </div>
      <button class="ebtn-hapus" onclick="hapusSiswa('${siswa.id}')">Hapus</button>
    `;
    list.appendChild(li);
  });
}

async function hapusSiswa(id) {
  const msg = document.getElementById('emsg-hapus-siswa');
  if (!confirm('Yakin hapus siswa ini?')) return;

  const { error } = await getSupabase().from('students').delete().eq('id', id);
  if (error) {
    showMsg(msg, 'err', '✕ Gagal: ' + error.message);
    return;
  }

  const el = document.getElementById('siswa-item-' + id);
  if (el) el.remove();
  showMsg(msg, 'ok', '✓ Siswa berhasil dihapus.');
}

/* ==========================================
   MOBILE TRIGGER — Tap logo navbar 5x
   ========================================== */
(function initMobileTapTrigger() {
  const brand = document.getElementById('nav-brand-trigger');
  if (!brand) return;

  const REQUIRED_TAPS = 5;
  const TAP_TIMEOUT   = 2500; // reset setelah 2.5 detik idle
  let tapCount  = 0;
  let tapTimer  = null;

  // Buat indikator titik-titik
  const dotWrap = document.createElement('span');
  dotWrap.className = 'tap-dot';
  dotWrap.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < REQUIRED_TAPS; i++) {
    const dot = document.createElement('span');
    dotWrap.appendChild(dot);
  }
  brand.appendChild(dotWrap);

  function updateDots() {
    const dots = dotWrap.querySelectorAll('span');
    dots.forEach((d, i) => d.classList.toggle('lit', i < tapCount));
    dotWrap.classList.toggle('visible', tapCount > 0);
  }

  function resetTap() {
    tapCount = 0;
    clearTimeout(tapTimer);
    updateDots();
  }

  brand.addEventListener('click', (e) => {
    tapCount++;
    updateDots();

    clearTimeout(tapTimer);

    if (tapCount >= REQUIRED_TAPS) {
      resetTap();
      openEditorModal();
      return;
    }

    tapTimer = setTimeout(resetTap, TAP_TIMEOUT);
  });
})();

/* ==========================================
   EDIT DATA — Load & Edit Siswa
   ========================================== */
async function loadSiswaEditList() {
  const list = document.getElementById('edit-siswa-list');
  const msg  = document.getElementById('emsg-edit-siswa');
  list.innerHTML = '<li style="font-size:.78rem;color:var(--text-soft);padding:.4rem">Memuat…</li>';
  msg.textContent = '';

  const { data, error } = await getSupabase()
    .from('students')
    .select('id, name, hobbies, quote, gender')
    .order('created_at', { ascending: true });

  if (error) {
    list.innerHTML = '';
    showMsg(msg, 'err', '✕ Gagal: ' + error.message);
    return;
  }

  list.innerHTML = '';
  if (!data || data.length === 0) {
    list.innerHTML = '<li style="font-size:.78rem;color:var(--text-soft);padding:.4rem">Belum ada data.</li>';
    return;
  }

  data.forEach(siswa => {
    const li = document.createElement('li');
    li.className = 'hapus-item edit-item';
    li.id = 'edit-siswa-' + siswa.id;
    li.innerHTML = `
      <div class="hapus-item-info">
        <div class="hapus-item-name">${escHtml(siswa.name)}</div>
        <div class="hapus-item-sub">${siswa.gender === 'laki' ? '♂' : '♀'} · ${escHtml(siswa.hobbies || '—')}</div>
      </div>
      <button class="ebtn-edit" onclick="toggleEditSiswaForm('${siswa.id}')">Edit</button>
    `;

    // inline edit form (hidden by default)
    const form = document.createElement('div');
    form.className = 'inline-edit-form';
    form.id = 'ief-siswa-' + siswa.id;
    form.style.display = 'none';
    form.innerHTML = `
      <label class="elabel">Nama</label>
      <input class="einput" id="ief-nama-${siswa.id}" value="${escHtml(siswa.name)}" />
      <label class="elabel">Hobi</label>
      <input class="einput" id="ief-hobi-${siswa.id}" value="${escHtml(siswa.hobbies || '')}" />
      <label class="elabel">Quote</label>
      <input class="einput" id="ief-quote-${siswa.id}" value="${escHtml(siswa.quote || '')}" />
      <label class="elabel">Instagram (tanpa @)</label>
      <input class="einput" id="ief-ig-${siswa.id}" value="" />
      <label class="elabel">Gender</label>
      <select class="einput" id="ief-gender-${siswa.id}">
        <option value="perempuan" ${siswa.gender === 'perempuan' ? 'selected' : ''}>Perempuan</option>
        <option value="laki" ${siswa.gender === 'laki' ? 'selected' : ''}>Laki-laki</option>
      </select>
      <div class="ief-actions">
        <button class="ebtn-submit ief-save" onclick="saveSiswa('${siswa.id}')">
          <span id="ief-siswa-save-${siswa.id}">Simpan</span>
        </button>
        <button class="ebtn-cancel" onclick="toggleEditSiswaForm('${siswa.id}')">Batal</button>
      </div>
      <p class="editor-msg" id="ief-msg-siswa-${siswa.id}"></p>
    `;

    const wrapper = document.createElement('li');
    wrapper.style.cssText = 'list-style:none;padding:0;';
    wrapper.appendChild(li);
    wrapper.appendChild(form);
    list.appendChild(wrapper);
  });
}

function toggleEditSiswaForm(id) {
  const form = document.getElementById('ief-siswa-' + id);
  const isOpen = form.style.display !== 'none';
  form.style.display = isOpen ? 'none' : 'block';
  // update tombol teks
  const btn = document.querySelector(`#edit-siswa-${id} .ebtn-edit`);
  if (btn) btn.textContent = isOpen ? 'Edit' : 'Tutup';
}

async function saveSiswa(id) {
  const msg     = document.getElementById('ief-msg-siswa-' + id);
  const saveBtn = document.getElementById('ief-siswa-save-' + id);

  const name     = document.getElementById('ief-nama-'   + id).value.trim();
  const hobbies  = document.getElementById('ief-hobi-'   + id).value.trim();
  const quote    = document.getElementById('ief-quote-'  + id).value.trim();
  const gender   = document.getElementById('ief-gender-' + id).value;

  if (!name) { showMsg(msg, 'err', '✕ Nama tidak boleh kosong.'); return; }

  saveBtn.textContent = 'Menyimpan…';

  const { error } = await getSupabase()
    .from('students')
    .update({ name: name, hobbies: hobbies, quote: quote, gender: gender })
    .eq('id', id);

  saveBtn.textContent = 'Simpan';

  if (error) {
    showMsg(msg, 'err', '✕ Gagal: ' + error.message);
    return;
  }

  showMsg(msg, 'ok', '✓ Data berhasil diperbarui!');

  // update tampilan nama di item
  const nameEl = document.querySelector(`#edit-siswa-${id} .hapus-item-name`);
  if (nameEl) nameEl.textContent = name;
  const subEl = document.querySelector(`#edit-siswa-${id} .hapus-item-sub`);
  if (subEl) subEl.textContent = `${gender === 'laki' ? '♂' : '♀'} · ${hobbies || '—'}`;
}

/* ==========================================
   EDIT DATA — Load & Edit Lagu
   ========================================== */
async function loadLaguEditList() {
  const list = document.getElementById('edit-lagu-list');
  const msg  = document.getElementById('emsg-edit-lagu');
  list.innerHTML = '<li style="font-size:.78rem;color:var(--text-soft);padding:.4rem">Memuat…</li>';
  msg.textContent = '';

  const { data, error } = await getSupabase()
    .from('playlists')
    .select('id, title, artist, lyrics')
    .order('created_at', { ascending: true });

  if (error) {
    list.innerHTML = '';
    showMsg(msg, 'err', '✕ Gagal: ' + error.message);
    return;
  }

  list.innerHTML = '';
  if (!data || data.length === 0) {
    list.innerHTML = '<li style="font-size:.78rem;color:var(--text-soft);padding:.4rem">Belum ada lagu.</li>';
    return;
  }

  data.forEach(song => {
    const li = document.createElement('li');
    li.className = 'hapus-item edit-item';
    li.id = 'edit-lagu-' + song.id;
    li.innerHTML = `
      <div class="hapus-item-info">
        <div class="hapus-item-name">${escHtml(song.title)}</div>
        <div class="hapus-item-sub">${escHtml(song.artist || '—')}</div>
      </div>
      <button class="ebtn-edit" onclick="toggleEditLaguForm('${song.id}')">Edit</button>
    `;

    const form = document.createElement('div');
    form.className = 'inline-edit-form';
    form.id = 'ief-lagu-' + song.id;
    form.style.display = 'none';

    // escape lirik untuk value textarea (ganti " dengan &quot;)
    const lyricsEsc = (song.lyrics || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    form.innerHTML = `
      <label class="elabel">Judul</label>
      <input class="einput" id="ief-title-${song.id}" value="${escHtml(song.title)}" />
      <label class="elabel">Artis</label>
      <input class="einput" id="ief-artist-${song.id}" value="${escHtml(song.artist || '')}" />
      <label class="elabel">Lirik (LRC)</label>
      <textarea class="einput etextarea" id="ief-lyrics-${song.id}" rows="6">${lyricsEsc}</textarea>
      <p class="elabel-hint">Format: <code>[mm:ss.xx] Teks lirik</code></p>
      <div class="ief-actions">
        <button class="ebtn-submit ief-save" onclick="saveLagu('${song.id}')">
          <span id="ief-lagu-save-${song.id}">Simpan</span>
        </button>
        <button class="ebtn-cancel" onclick="toggleEditLaguForm('${song.id}')">Batal</button>
      </div>
      <p class="editor-msg" id="ief-msg-lagu-${song.id}"></p>
    `;

    const wrapper = document.createElement('li');
    wrapper.style.cssText = 'list-style:none;padding:0;';
    wrapper.appendChild(li);
    wrapper.appendChild(form);
    list.appendChild(wrapper);
  });
}

function toggleEditLaguForm(id) {
  const form = document.getElementById('ief-lagu-' + id);
  const isOpen = form.style.display !== 'none';
  form.style.display = isOpen ? 'none' : 'block';
  const btn = document.querySelector(`#edit-lagu-${id} .ebtn-edit`);
  if (btn) btn.textContent = isOpen ? 'Edit' : 'Tutup';
}

async function saveLagu(id) {
  const msg     = document.getElementById('ief-msg-lagu-' + id);
  const saveBtn = document.getElementById('ief-lagu-save-' + id);

  const title  = document.getElementById('ief-title-'  + id).value.trim();
  const artist = document.getElementById('ief-artist-' + id).value.trim();
  const lyrics = document.getElementById('ief-lyrics-' + id).value.trim();

  if (!title) { showMsg(msg, 'err', '✕ Judul tidak boleh kosong.'); return; }

  saveBtn.textContent = 'Menyimpan…';

  const { error } = await getSupabase()
    .from('playlists')
    .update({ title, artist, lyrics })
    .eq('id', id);

  saveBtn.textContent = 'Simpan';

  if (error) {
    showMsg(msg, 'err', '✕ Gagal: ' + error.message);
    return;
  }

  showMsg(msg, 'ok', '✓ Lagu berhasil diperbarui!');

  // update tampilan di list
  const nameEl = document.querySelector(`#edit-lagu-${id} .hapus-item-name`);
  if (nameEl) nameEl.textContent = title;
  const subEl = document.querySelector(`#edit-lagu-${id} .hapus-item-sub`);
  if (subEl) subEl.textContent = artist || '—';
}

/* ==========================================
   COMPACT FILE PICKER — drag & drop helpers
   ========================================== */
function dzDragOver(e, el) {
  e.preventDefault();
  el.classList.add('drag-over');
}

function dzDragLeave(el) {
  el.classList.remove('drag-over');
}

function dzDrop(e, inputId, el) {
  e.preventDefault();
  el.classList.remove('drag-over');
  const input = document.getElementById(inputId);
  const files = e.dataTransfer.files;
  if (!files.length) return;

  // assign file ke input element via DataTransfer
  const dt = new DataTransfer();
  dt.items.add(files[0]);
  input.files = dt.files;

  // update label
  const labelId = 'fp-label-' + inputId.replace('es-', '').replace('el-', '');
  dzFileChosen(input, labelId);
}

function dzFileChosen(input, labelId) {
  const label = document.getElementById(labelId);
  const wrap  = input.closest('.file-pick');
  if (!label || !wrap) return;

  if (input.files && input.files[0]) {
    label.textContent = input.files[0].name;
    wrap.classList.add('has-file');
  } else {
    // reset
    const defaults = { 'fp-label-foto': 'Upload foto', 'fp-label-cover': 'Upload cover', 'fp-label-audio': 'Upload audio' };
    label.textContent = defaults[labelId] || 'Upload file';
    wrap.classList.remove('has-file');
  }
}

/* ==========================================
   FOTO BERSAMA — Upload & Kelola
   ========================================== */
async function submitFotbar(e) {
  e.preventDefault();
  const btn     = document.getElementById('ebtn-fotbar');
  const msg     = document.getElementById('emsg-fotbar');
  const btnText = document.getElementById('ebtn-fotbar-text');
  const btnLoad = document.getElementById('ebtn-fotbar-load');
  const file    = document.getElementById('fp-fotbar').files[0];

  if (!file) { showMsg(msg, 'err', '✕ Pilih foto terlebih dulu.'); return; }

  btn.disabled = true;
  btnText.style.display = 'none';
  btnLoad.style.display = 'inline';
  msg.textContent = '';
  msg.className = 'editor-msg';

  try {
    const ext  = file.name.split('.').pop();
    const path = `fotbar/${Date.now()}.${ext}`;

    const { error: upErr } = await getSupabase().storage
      .from('media')
      .upload(path, file, { upsert: true });
    if (upErr) throw upErr;

    const { data: urlData } = getSupabase().storage.from('media').getPublicUrl(path);

    const { error: dbErr } = await getSupabase().from('gallery').insert({
      image_url: urlData.publicUrl
    });
    if (dbErr) throw dbErr;

    // Tambah foto baru ke galeri di halaman langsung
    addFotbarToGaleri(urlData.publicUrl);

    showMsg(msg, 'ok', '✓ Foto berhasil diupload!');
    document.getElementById('form-fotbar').reset();
    document.getElementById('fp-label-fotbar').textContent = 'Upload foto bersama';
    document.getElementById('dz-fotbar').classList.remove('has-file');

  } catch (err) {
    showMsg(msg, 'err', '✕ Gagal: ' + (err.message || err));
  } finally {
    btn.disabled = false;
    btnText.style.display = 'inline';
    btnLoad.style.display = 'none';
  }
}

function addFotbarToGaleri(url) {
  const container = document.getElementById('gallery-container');
  if (!container) return;

  const div = document.createElement('div');
  div.className = 'gallery-item';

  const img = document.createElement('img');
  img.src = url;
  img.alt = 'Foto Bersama';
  img.loading = 'lazy';
  img.onerror = () => { div.style.display = 'none'; };

  const overlay = document.createElement('div');
  overlay.className = 'galeri-overlay';

  div.appendChild(img);
  div.appendChild(overlay);
  div.onclick = () => openLightbox(url, 'Foto Bersama');

  // Sisipkan di awal (foto terbaru di atas)
  container.insertBefore(div, container.firstChild);
}

async function loadFotbarList() {
  const list = document.getElementById('hapus-fotbar-list');
  const msg  = document.getElementById('emsg-hapus-fotbar');
  list.innerHTML = '<li style="font-size:.78rem;color:var(--text-soft);padding:.4rem">Memuat…</li>';
  msg.textContent = '';

  const { data, error } = await getSupabase()
    .from('gallery')
    .select('id, image_url')
    .order('created_at', { ascending: false });

  if (error) {
    list.innerHTML = '';
    showMsg(msg, 'err', '✕ Gagal: ' + error.message);
    return;
  }

  list.innerHTML = '';
  if (!data || data.length === 0) {
    list.innerHTML = '<li style="font-size:.78rem;color:var(--text-soft);padding:.4rem">Belum ada foto.</li>';
    return;
  }

  data.forEach(item => {
    const li = document.createElement('li');
    li.className = 'hapus-item';
    li.id = 'fotbar-item-' + item.id;
    li.innerHTML = `
      <div class="hapus-item-info" style="display:flex;align-items:center;gap:.6rem">
        <img src="${escHtml(item.image_url)}" style="width:44px;height:44px;object-fit:cover;border-radius:6px;flex-shrink:0" />
        <div class="hapus-item-name" style="font-size:.75rem">Foto Bersama</div>
      </div>
      <button class="ebtn-hapus" onclick="hapusFotbar('${item.id}')">Hapus</button>
    `;
    list.appendChild(li);
  });
}

async function hapusFotbar(id) {
  const msg = document.getElementById('emsg-hapus-fotbar');
  if (!confirm('Yakin hapus foto ini?')) return;

  const { error } = await getSupabase().from('gallery').delete().eq('id', id);
  if (error) { showMsg(msg, 'err', '✕ Gagal: ' + error.message); return; }

  const el = document.getElementById('fotbar-item-' + id);
  if (el) el.remove();
  showMsg(msg, 'ok', '✓ Foto berhasil dihapus.');
}

/* ==========================================
   INDEX MINI PLAYER — lanjutkan audio dari playlist
   ========================================== */
let idxAudio   = null;
let idxPlaying = false;

async function initIndexMiniPlayer() {
  const idx     = parseInt(sessionStorage.getItem('pl_idx'), 10);
  const time    = parseFloat(sessionStorage.getItem('pl_time') || '0');
  const playing = sessionStorage.getItem('pl_playing') === '1';

  if (isNaN(idx) || idx < 0) return; // tidak ada state tersimpan

  // Ambil data lagu dari Supabase
  const sb = getSupabase();
  if (!sb) return;

  const { data, error } = await sb
    .from('playlists')
    .select('title, artist, cover_url, audio_url')
    .order('created_at', { ascending: true });

  if (error || !data || !data[idx]) return;

  const song = data[idx];

  // Tampilkan mini player
  const player = document.getElementById('idx-mini-player');
  if (!player) return;
  player.style.display = 'flex';

  // Isi info
  document.getElementById('idx-mini-title').textContent  = song.title  || '—';
  document.getElementById('idx-mini-artist').textContent = song.artist || '—';

  const cover = document.getElementById('idx-mini-cover');
  cover.src = song.cover_url || '';
  cover.onerror = () => { cover.src = ''; };

  // Setup audio
  idxAudio = new Audio(song.audio_url);
  idxAudio.currentTime = time;

  idxAudio.addEventListener('timeupdate', () => {
    if (!idxAudio.duration) return;
    const pct = (idxAudio.currentTime / idxAudio.duration) * 100;
    const fill = document.getElementById('idx-mini-fill');
    if (fill) fill.style.width = pct + '%';
    // update sessionStorage terus biar state tetap sinkron
    sessionStorage.setItem('pl_time', idxAudio.currentTime);
  });

  idxAudio.addEventListener('play', () => {
    idxPlaying = true;
    sessionStorage.setItem('pl_playing', '1');
    document.getElementById('idx-icon-play').style.display  = 'none';
    document.getElementById('idx-icon-pause').style.display = 'block';
  });

  idxAudio.addEventListener('pause', () => {
    idxPlaying = false;
    sessionStorage.setItem('pl_playing', '0');
    document.getElementById('idx-icon-play').style.display  = 'block';
    document.getElementById('idx-icon-pause').style.display = 'none';
  });

  idxAudio.addEventListener('ended', () => {
    sessionStorage.removeItem('pl_idx');
  });

  // Auto-play jika sebelumnya sedang diputar
  if (playing) {
    idxAudio.play().catch(() => {
      // Autoplay diblokir browser — tampilkan tombol play saja
    });
  }
}

function idxTogglePlay() {
  if (!idxAudio) return;
  if (idxPlaying) {
    idxAudio.pause();
  } else {
    idxAudio.play().catch(() => {});
  }
}

function idxSeek(sec) {
  if (!idxAudio) return;
  idxAudio.currentTime = Math.max(0,
    Math.min(idxAudio.duration || 0, idxAudio.currentTime + sec));
}

// Jalankan saat halaman siap
document.addEventListener('DOMContentLoaded', () => {
  initIndexMiniPlayer();
});

/* ==========================================
   EDIT PANEL — 3-level navigation
   ========================================== */
let editCurrentType = null; // 'lagu' | 'siswa'

function editBack(toLevel) {
  document.getElementById('edit-level-1').style.display = toLevel === 1 ? 'block' : 'none';
  document.getElementById('edit-level-2').style.display = toLevel === 2 ? 'block' : 'none';
  document.getElementById('edit-level-3').style.display = 'none';
}

/* ── Level 2: tampilkan daftar item ── */
async function editShowList(type) {
  editCurrentType = type;
  document.getElementById('edit-level-1').style.display = 'none';
  document.getElementById('edit-level-2').style.display = 'block';
  document.getElementById('edit-level-3').style.display = 'none';

  const title = type === 'lagu' ? 'Daftar Lagu' : 'Daftar Siswa';
  const sub   = type === 'lagu'
    ? 'Klik lagu untuk mengedit atau menghapus.'
    : 'Klik siswa untuk mengedit atau menghapus.';

  document.getElementById('edit-list-title').textContent = title;
  document.getElementById('edit-list-sub').textContent   = sub;

  const list    = document.getElementById('edit-item-list');
  const loading = document.getElementById('edit-list-loading');
  list.innerHTML = '';
  loading.style.display = 'block';

  const query = type === 'lagu'
    ? getSupabase().from('playlists').select('id, title, artist, cover_url').order('created_at', { ascending: true })
    : getSupabase().from('students').select('id, name, gender, image_url').order('created_at', { ascending: true });

  const { data, error } = await query;
  loading.style.display = 'none';

  if (error) {
    list.innerHTML = `<li style="font-size:.78rem;color:#e05252;padding:.4rem">Gagal: ${error.message}</li>`;
    return;
  }
  if (!data || data.length === 0) {
    list.innerHTML = `<li style="font-size:.78rem;color:var(--text-soft);padding:.4rem">Belum ada data.</li>`;
    return;
  }

  data.forEach((item, i) => {
    const li = document.createElement('li');
    li.className = 'edit-list-item';
    li.style.animationDelay = `${i * 0.03}s`;

    if (type === 'lagu') {
      const cover = item.cover_url || '';
      li.innerHTML = `
        <img class="edit-list-item-cover" src="${escHtml(cover)}" onerror="this.style.display='none'" />
        <div class="edit-list-item-info">
          <div class="edit-list-item-name">${escHtml(item.title)}</div>
          <div class="edit-list-item-sub">${escHtml(item.artist || '—')}</div>
        </div>
        <svg class="edit-list-item-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14"><polyline points="9 18 15 12 9 6"/></svg>
      `;
      li.onclick = () => editShowFormLagu(item);
    } else {
      const bgColor = item.gender === 'laki' ? 'C5D9F0' : 'F5C6D8';
      const txtColor = item.gender === 'laki' ? '2D5D96' : '8B3A5A';
      const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=${bgColor}&color=${txtColor}&size=80`;
      li.innerHTML = `
        <img class="edit-list-item-cover" src="${item.image_url ? escHtml(item.image_url) : avatar}" onerror="this.src='${avatar}'" />
        <div class="edit-list-item-info">
          <div class="edit-list-item-name">${escHtml(item.name)}</div>
          <div class="edit-list-item-sub">${item.gender === 'laki' ? '♂ Laki-laki' : '♀ Perempuan'}</div>
        </div>
        <svg class="edit-list-item-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14"><polyline points="9 18 15 12 9 6"/></svg>
      `;
      li.onclick = () => editShowFormSiswa(item);
    }
    list.appendChild(li);
  });
}

/* ── Level 3: form edit LAGU ── */
function editShowFormLagu(song) {
  document.getElementById('edit-level-2').style.display = 'none';
  document.getElementById('edit-level-3').style.display = 'block';

  const c = document.getElementById('edit-form-container');
  c.innerHTML = `
    <p class="hapus-heading" style="margin-bottom:.8rem">${escHtml(song.title)}</p>

    <label class="elabel">Judul</label>
    <input class="einput" id="ef-title" value="${escHtml(song.title)}" />

    <label class="elabel" style="margin-top:.5rem">Artis</label>
    <input class="einput" id="ef-artist" value="${escHtml(song.artist || '')}" />

    <label class="elabel" style="margin-top:.5rem">Cover baru (kosongkan = tidak berubah)</label>
    <div class="file-pick" onclick="document.getElementById('ef-cover').click()" ondragover="dzDragOver(event,this)" ondragleave="dzDragLeave(this)" ondrop="dzDrop(event,'ef-cover',this)">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
      <span class="fp-label" id="ef-label-cover">Upload cover baru</span>
      <input type="file" id="ef-cover" accept="image/*" style="display:none" onchange="dzFileChosen(this,'ef-label-cover')" />
    </div>

    <label class="elabel" style="margin-top:.5rem">Audio baru (kosongkan = tidak berubah)</label>
    <div class="file-pick" onclick="document.getElementById('ef-audio').click()" ondragover="dzDragOver(event,this)" ondragleave="dzDragLeave(this)" ondrop="dzDrop(event,'ef-audio',this)">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
      <span class="fp-label" id="ef-label-audio">Upload audio baru</span>
      <input type="file" id="ef-audio" accept="audio/*" style="display:none" onchange="dzFileChosen(this,'ef-label-audio')" />
    </div>

    <label class="elabel" style="margin-top:.5rem">Lirik (LRC)</label>
    <textarea class="einput etextarea" id="ef-lyrics" rows="6">${(song.lyrics || '').replace(/</g,'&lt;')}</textarea>
    <p class="elabel-hint">Format: <code>[mm:ss.xx] Teks lirik</code></p>

    <p class="editor-msg" id="ef-msg-lagu"></p>

    <div class="edit-action-row">
      <button class="ebtn-danger" onclick="editHapusLagu('${song.id}')">🗑 Hapus</button>
      <button class="ebtn-secondary" onclick="editBack(2)">Batal</button>
    </div>
    <button class="ebtn-submit" style="width:100%;margin-top:.5rem" id="ef-save-lagu" onclick="editSaveLagu('${song.id}')">
      <span id="ef-save-lagu-text">Simpan Perubahan</span>
      <span id="ef-save-lagu-load" style="display:none">Menyimpan…</span>
    </button>
  `;
}

async function editSaveLagu(id) {
  const msg     = document.getElementById('ef-msg-lagu');
  const saveBtn = document.getElementById('ef-save-lagu');
  const btnText = document.getElementById('ef-save-lagu-text');
  const btnLoad = document.getElementById('ef-save-lagu-load');

  const title   = document.getElementById('ef-title').value.trim();
  const artist  = document.getElementById('ef-artist').value.trim();
  const lyrics  = document.getElementById('ef-lyrics').value.trim();
  const coverFile = document.getElementById('ef-cover').files[0];
  const audioFile = document.getElementById('ef-audio').files[0];

  if (!title) { showMsg(msg, 'err', '✕ Judul tidak boleh kosong.'); return; }

  saveBtn.disabled = true;
  btnText.style.display = 'none';
  btnLoad.style.display = 'inline';

  try {
    const updates = { title, artist, lyrics };

    if (coverFile) {
      const ext  = coverFile.name.split('.').pop();
      const path = `covers/${Date.now()}_${title.replace(/\s+/g,'_')}.${ext}`;
      const { error: e } = await getSupabase().storage.from('media').upload(path, coverFile, { upsert: true });
      if (e) throw e;
      const { data: u } = getSupabase().storage.from('media').getPublicUrl(path);
      updates.cover_url = u.publicUrl;
    }

    if (audioFile) {
      const ext  = audioFile.name.split('.').pop();
      const path = `audio/${Date.now()}_${title.replace(/\s+/g,'_')}.${ext}`;
      const { error: e } = await getSupabase().storage.from('media').upload(path, audioFile, { upsert: true });
      if (e) throw e;
      const { data: u } = getSupabase().storage.from('media').getPublicUrl(path);
      updates.audio_url = u.publicUrl;
    }

    const { error } = await getSupabase().from('playlists').update(updates).eq('id', id);
    if (error) throw error;

    showMsg(msg, 'ok', '✓ Lagu berhasil diperbarui!');
    // Refresh daftar di level 2
    setTimeout(() => editShowList('lagu'), 1200);

  } catch (err) {
    showMsg(msg, 'err', '✕ Gagal: ' + (err.message || err));
  } finally {
    saveBtn.disabled = false;
    btnText.style.display = 'inline';
    btnLoad.style.display = 'none';
  }
}

async function editHapusLagu(id) {
  const msg = document.getElementById('ef-msg-lagu');
  if (!confirm('Yakin hapus lagu ini? Tindakan tidak bisa dibatalkan.')) return;

  const { error } = await getSupabase().from('playlists').delete().eq('id', id);
  if (error) { showMsg(msg, 'err', '✕ Gagal: ' + error.message); return; }

  showMsg(msg, 'ok', '✓ Lagu dihapus.');
  setTimeout(() => editShowList('lagu'), 900);
}

/* ── Level 3: form edit SISWA ── */
function editShowFormSiswa(siswa) {
  document.getElementById('edit-level-2').style.display = 'none';
  document.getElementById('edit-level-3').style.display = 'block';

  const c = document.getElementById('edit-form-container');
  c.innerHTML = `
    <p class="hapus-heading" style="margin-bottom:.8rem">${escHtml(siswa.name)}</p>

    <label class="elabel">Nama</label>
    <input class="einput" id="ef-name" value="${escHtml(siswa.name)}" />

    <label class="elabel" style="margin-top:.5rem">Hobi</label>
    <input class="einput" id="ef-hobbies" value="" placeholder="Hobi siswa" />

    <label class="elabel" style="margin-top:.5rem">Quote</label>
    <input class="einput" id="ef-quote" value="" placeholder="Quote favorit" />

    <label class="elabel" style="margin-top:.5rem">Gender</label>
    <select class="einput" id="ef-gender">
      <option value="perempuan" ${siswa.gender === 'perempuan' ? 'selected' : ''}>Perempuan</option>
      <option value="laki" ${siswa.gender === 'laki' ? 'selected' : ''}>Laki-laki</option>
    </select>

    <label class="elabel" style="margin-top:.5rem">Foto baru (kosongkan = tidak berubah)</label>
    <div class="file-pick" onclick="document.getElementById('ef-foto').click()" ondragover="dzDragOver(event,this)" ondragleave="dzDragLeave(this)" ondrop="dzDrop(event,'ef-foto',this)">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
      <span class="fp-label" id="ef-label-foto">Upload foto baru</span>
      <input type="file" id="ef-foto" accept="image/*" style="display:none" onchange="dzFileChosen(this,'ef-label-foto')" />
    </div>

    <p class="editor-msg" id="ef-msg-siswa"></p>

    <div class="edit-action-row">
      <button class="ebtn-danger" onclick="editHapusSiswa('${siswa.id}')">🗑 Hapus</button>
      <button class="ebtn-secondary" onclick="editBack(2)">Batal</button>
    </div>
    <button class="ebtn-submit" style="width:100%;margin-top:.5rem" id="ef-save-siswa" onclick="editSaveSiswa('${siswa.id}')">
      <span id="ef-save-siswa-text">Simpan Perubahan</span>
      <span id="ef-save-siswa-load" style="display:none">Menyimpan…</span>
    </button>
  `;

  // Ambil data hobi & quote dari DB untuk prefill
  getSupabase().from('students').select('hobbies, quote').eq('id', siswa.id).single()
    .then(({ data }) => {
      if (data) {
        document.getElementById('ef-hobbies').value = data.hobbies || '';
        document.getElementById('ef-quote').value   = data.quote   || '';
      }
    });
}

async function editSaveSiswa(id) {
  const msg     = document.getElementById('ef-msg-siswa');
  const saveBtn = document.getElementById('ef-save-siswa');
  const btnText = document.getElementById('ef-save-siswa-text');
  const btnLoad = document.getElementById('ef-save-siswa-load');

  const name     = document.getElementById('ef-name').value.trim();
  const hobbies  = document.getElementById('ef-hobbies').value.trim();
  const quote    = document.getElementById('ef-quote').value.trim();
  const gender   = document.getElementById('ef-gender').value;
  const fotoFile = document.getElementById('ef-foto').files[0];

  if (!name) { showMsg(msg, 'err', '✕ Nama tidak boleh kosong.'); return; }

  saveBtn.disabled = true;
  btnText.style.display = 'none';
  btnLoad.style.display = 'inline';

  try {
    const updates = { name, hobbies, quote, gender };

    if (fotoFile) {
      const ext  = fotoFile.name.split('.').pop();
      const path = `students/${Date.now()}_${name.replace(/\s+/g,'_')}.${ext}`;
      const { error: e } = await getSupabase().storage.from('media').upload(path, fotoFile, { upsert: true });
      if (e) throw e;
      const { data: u } = getSupabase().storage.from('media').getPublicUrl(path);
      updates.image_url = u.publicUrl;
    }

    const { error } = await getSupabase().from('students').update(updates).eq('id', id);
    if (error) throw error;

    showMsg(msg, 'ok', '✓ Data siswa diperbarui!');
    setTimeout(() => editShowList('siswa'), 1200);

  } catch (err) {
    showMsg(msg, 'err', '✕ Gagal: ' + (err.message || err));
  } finally {
    saveBtn.disabled = false;
    btnText.style.display = 'inline';
    btnLoad.style.display = 'none';
  }
}

async function editHapusSiswa(id) {
  const msg = document.getElementById('ef-msg-siswa');
  if (!confirm('Yakin hapus siswa ini? Tindakan tidak bisa dibatalkan.')) return;

  const { error } = await getSupabase().from('students').delete().eq('id', id);
  if (error) { showMsg(msg, 'err', '✕ Gagal: ' + error.message); return; }

  showMsg(msg, 'ok', '✓ Siswa dihapus.');
  setTimeout(() => editShowList('siswa'), 900);
}

/* ==========================================
   GALERI KENANGAN — fetch dari Supabase
   ========================================== */
async function fetchGalleryPhotos() {
  const container = document.getElementById('gallery-container');
  if (!container) return;

  const sb = getSupabase();
  if (!sb) return;

  const { data, error } = await sb
    .from('gallery')
    .select('id, image_url')
    .order('created_at', { ascending: true });

  if (error || !data || data.length === 0) return;

  container.innerHTML = '';

  data.forEach((item, i) => {
    if (!item.image_url) return;

    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.style.animationDelay = `${i * 0.05}s`;

    const img = document.createElement('img');
    img.src = item.image_url;
    img.alt = 'Foto Bersama';
    img.loading = 'lazy';
    img.onerror = () => { div.style.display = 'none'; };

    const overlay = document.createElement('div');
    overlay.className = 'galeri-overlay';

    div.appendChild(img);
    div.appendChild(overlay);
    div.onclick = () => openLightbox(item.image_url, 'Foto Bersama');

    container.appendChild(div);
  });
}
