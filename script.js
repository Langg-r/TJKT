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
  { nama: "Muhammad Gilang Romadhon",        foto: "Foto/muhammad-gilang.jpeg",  hobi: "Ngulik Komputer", quote: "wong ko ngene", ig: "glngrmdhn619", gender: "laki" },
  { nama: "Dwi Ananta Susila Yudha",         foto: "Foto/dwi-ananta.jpeg",       hobi: "--", quote: "--", ig: "--", gender: "laki" },
  { nama: "Gilang Rezki Oktavian",           foto: "Foto/gilang-rezki.jpeg",     hobi: "--", quote: "--", ig: "--", gender: "laki" },
  { nama: "Rizky Trian Purba",               foto: "Foto/rizky.jpeg",            hobi: "--", quote: "--", ig: "--", gender: "laki" },
  { nama: "Wan Dizzy Zulfahri",              foto: "Foto/wan.jpeg",              hobi: "--", quote: "--", ig: "--", gender: "laki" },
  { nama: "Muhardi",                         foto: "Foto/muhardi.jpeg",          hobi: "--", quote: "--", ig: "--", gender: "laki" },
  { nama: "Muhammad Wahyu Pratama",          foto: "Foto/muhammad-wahyu.jpeg",   hobi: "--", quote: "--", ig: "--", gender: "laki" },
  { nama: "Naysila Putri Sarifudin",         foto: "Foto/naysila.jpeg",          hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Kusmanisya Tarania Malik",        foto: "Foto/kusmanisya.jpeg",       hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Nurul Arbani Safira",             foto: "Foto/nurul-arbani.jpeg",     hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Nur Adawiyah",                    foto: "Foto/nur-adawiyah.jpeg",     hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Seni",                            foto: "Foto/seni.jpeg",             hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Valene",                          foto: "Foto/valene.jpeg",           hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Khasa Nova Turnip",               foto: "Foto/khasa.jpeg",            hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Rafasya Dewi Aurora",             foto: "Foto/rafasya.jpeg",          hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Mutiara Oktaini",                 foto: "Foto/mutiara.jpeg",          hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Aline Chrissi Situmorang",        foto: "Foto/aline.jpeg",            hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Vanitha Ramadhanie",              foto: "Foto/vanitha.jpeg",          hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Jesty Novianty",                  foto: "Foto/jesty.jpeg",            hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Nazwa Khairunnisa",               foto: "Foto/nazwa.jpeg",            hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Intan Fira Nur Khafifah",         foto: "Foto/intan.jpeg",            hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Jessica A Yuwan",                 foto: "Foto/jessica.jpeg",          hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Siti Halfira Syaqieb",            foto: "Foto/siti-halfira.jpeg",     hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Five Aiman Deswati",              foto: "Foto/five.jpeg",             hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Mutia Salsabila Hadis",           foto: "Foto/mutia-salsabila.jpeg",  hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Syafira Navadila",                foto: "Foto/syafira.jpeg",          hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Silfy Safputri",                  foto: "Foto/silfy.jpeg",            hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Nasywa Sherly N",                 foto: "Foto/nasywa-sherly.jpeg",    hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Cut Ayuni Asri",                  foto: "Foto/cut-ayuni.jpeg",        hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Lussy Aguspriana Putri",          foto: "Foto/lussy.jpeg",            hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Azira Three Najwa Sitompul",      foto: "Foto/azira.jpeg",            hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Novianti",                        foto: "Foto/novianti.jpeg",         hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Sabrina Annisa Purwati Pangestu", foto: "Foto/sabrina.jpeg",          hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Ashya Maya Gustina",              foto: "Foto/ashya.jpeg",            hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Shifa Nuha Alviana",              foto: "Foto/shifa.jpeg",            hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Lira Novriyanti",                 foto: "Foto/lira.jpeg",             hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Nur Septiani Putri",              foto: "Foto/nur-septiani.jpeg",     hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Devana Puspita",                  foto: "Foto/devana.jpeg",           hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
  { nama: "Nabilla Fitriyani",               foto: "Foto/nabilla.jpeg",          hobi: "--", quote: "--", ig: "--", gender: "perempuan" },
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
  const grid = document.getElementById('galeri-grid');
  if (!grid) return;

  const div = document.createElement('div');
  div.className = 'galeri-item';
  div.innerHTML = `
    <img src="${url}" alt="Foto Bersama" onerror="this.src='https://ui-avatars.com/api/?name=Foto+Bersama&background=DDEEFF&color=5588BB&size=400'" />
    <div class="galeri-overlay"><span>Foto Bersama</span></div>
  `;
  div.onclick = () => openLightbox(url, 'Foto Bersama');
  grid.appendChild(div);
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
