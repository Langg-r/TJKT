/* =========================================
   PLAYLIST PAGE — playlist.js
   Spotify-style fullscreen player with LRC sync
   ========================================= */

/* ──────────────────────────────────────────
   SUPABASE INIT
   ────────────────────────────────────────── */
const SUPABASE_URL = 'https://sytcbztlwbvfkdfeakct.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5dGNienRsd2J2ZmtkZmVha2N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzODYxMDQsImV4cCI6MjEwNjk2MjEwNH0.SmY24xoVlUV4GuWtK00hNciy4WNUyC-4DtqNJvn8FEQ';

let _sb = null;
function getSb() {
  if (_sb) return _sb;
  try {
    _sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  } catch (e) {
    console.error('Supabase init error:', e);
  }
  return _sb;
}

/* ──────────────────────────────────────────
   STATE
   ────────────────────────────────────────── */
let songs         = [];          // array of song objects from DB
let currentIdx    = -1;          // index in songs[]
let isShuffle     = false;
let isPlaying     = false;
let lrcLines      = [];          // parsed: [{time: sec, text: '...'}]
let isRepeat       = false;

const DEFAULT_COVER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%231c2333'/%3E%3Ccircle cx='100' cy='100' r='75' fill='%23000'/%3E%3Ccircle cx='100' cy='100' r='22' fill='%231c2333'/%3E%3Ccircle cx='100' cy='100' r='18' stroke='%2330363d' stroke-width='2' fill='none'/%3E%3Cpath d='M70 100 h60' stroke='%2330363d' stroke-width='2'/%3E%3C/svg%3E";

const audio = document.getElementById('audio-pl');

/* ──────────────────────────────────────────
   FETCH SONGS FROM SUPABASE
   ────────────────────────────────────────── */
async function loadPlaylist() {
  try {
    const { data, error } = await getSb()
      .from('playlists')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    document.getElementById('pl-loading').style.display = 'none';

    if (!data || data.length === 0) {
      document.getElementById('pl-empty').style.display = 'flex';
      return;
    }

    songs = data;
    document.getElementById('pl-main').style.display = 'block';
    document.getElementById('pl-count').textContent = `${songs.length} lagu`;

    renderList();
  } catch (err) {
    document.getElementById('pl-loading').style.display = 'none';
    document.getElementById('pl-empty').style.display = 'flex';
    document.getElementById('pl-empty').querySelector('p').textContent =
      `Gagal memuat: ${err.message || JSON.stringify(err)}`;
    console.error('Supabase error:', err);
  }
}

/* ──────────────────────────────────────────
   RENDER SONG LIST
   ────────────────────────────────────────── */
function renderList(filteredSongs = null) {
  const list = document.getElementById('pl-list');
  list.innerHTML = '';
  
  const displaySongs = filteredSongs || songs;

  displaySongs.forEach((song, i) => {
    const actualIdx = filteredSongs ? songs.indexOf(song) : i;
    const li = document.createElement('li');
    li.className = 'pl-item' + (actualIdx === currentIdx ? ' playing' : '');
    li.setAttribute('role', 'listitem');
    li.style.animationDelay = `${Math.min(i * 0.04, 0.5)}s`;
    li.onclick = () => {
      playSong(actualIdx);
      if (window.innerWidth <= 768) {
        openFullscreen();
      }
    };

    const coverSrc = song.cover_url || DEFAULT_COVER;

    li.innerHTML = `
      <span class="pl-num">${actualIdx + 1}</span>
      <img class="pl-thumb" src="${esc(coverSrc)}" alt="${esc(song.title)}" onerror="this.src='${DEFAULT_COVER}'" />
      <div class="pl-info">
        <p class="pl-song-title">${esc(song.title)}</p>
        <p class="pl-song-artist">${esc(song.artist)}</p>
      </div>
      <span class="pl-duration" id="dur-${actualIdx}">—</span>
    `;

    list.appendChild(li);

    fetchDuration(song.audio_url, actualIdx);
  });
}

function filterSongs() {
  const query = document.getElementById('pl-search').value.toLowerCase().trim();
  if (!query) {
    renderList();
    return;
  }
  const filtered = songs.filter(s => 
    (s.title || '').toLowerCase().includes(query) || 
    (s.artist || '').toLowerCase().includes(query)
  );
  renderList(filtered);
}

function fetchDuration(url, idx) {
  if (!url) return;
  const tmp = new Audio();
  tmp.preload = 'metadata';
  tmp.src = url;
  tmp.addEventListener('loadedmetadata', () => {
    const el = document.getElementById('dur-' + idx);
    if (el) el.textContent = formatTime(tmp.duration);
  }, { once: true });
}

/* ──────────────────────────────────────────
   PLAY A SONG
   ────────────────────────────────────────── */
function playSong(idx) {
  if (idx < 0 || idx >= songs.length) return;

  currentIdx = idx;
  const song = songs[idx];

  // Update song list highlight
  document.querySelectorAll('.pl-item').forEach((li) => {
    const numEl = li.querySelector('.pl-num');
    const isPlayingItem = numEl && parseInt(numEl.textContent) === (idx + 1);
    li.classList.toggle('playing', isPlayingItem);
  });

  const coverSrc = song.cover_url || DEFAULT_COVER;

  // Mini Player UI
  document.getElementById('mini-title').textContent  = song.title || '—';
  document.getElementById('mini-artist').textContent = song.artist || '—';
  const miniCover = document.getElementById('mini-cover');
  miniCover.src = coverSrc;
  miniCover.onerror = () => { miniCover.src = DEFAULT_COVER; };

  // Fullscreen Player UI
  document.getElementById('fs-title').textContent  = song.title || '—';
  document.getElementById('fs-artist').textContent = song.artist || '—';
  const fsCover = document.getElementById('fs-cover');
  fsCover.src = coverSrc;
  fsCover.onerror = () => { fsCover.src = DEFAULT_COVER; };

  // Fullscreen Lyrics Header UI
  document.getElementById('fl-title').textContent  = song.title || '—';
  document.getElementById('fl-artist').textContent = song.artist || '—';

  // Load audio
  audio.src = song.audio_url || '';
  audio.load();
  audio.play().catch(err => console.warn('Autoplay blocked:', err));

  // Parse lyrics
  lrcLines = parseLRC(song.lyrics || '');
  renderLyrics();
  renderPreviewLyrics();

  // Show mini player if hidden
  document.getElementById('mini-player').classList.remove('hidden');

  // Scroll active list item into view
  const listItems = document.querySelectorAll('.pl-item');
  const activeLi = Array.from(listItems).find(li => {
     const numEl = li.querySelector('.pl-num');
     return numEl && parseInt(numEl.textContent) === (idx + 1);
  });
  if (activeLi) activeLi.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ──────────────────────────────────────────
   PLAYER CONTROLS & OVERLAYS
   ────────────────────────────────────────── */
function togglePlay(e) {
  if (e) e.stopPropagation();
  if (!audio.src || audio.src === window.location.href) return;
  if (audio.paused) {
    audio.play().catch(() => {});
  } else {
    audio.pause();
  }
}

function nextTrack(e) {
  if (e) e.stopPropagation();
  if (songs.length === 0) return;
  if (isRepeat) {
    audio.currentTime = 0;
    audio.play().catch(() => {});
    return;
  }
  if (isShuffle) {
    let next;
    do { next = Math.floor(Math.random() * songs.length); }
    while (songs.length > 1 && next === currentIdx);
    playSong(next);
  } else {
    playSong((currentIdx + 1) % songs.length);
  }
}

function prevTrack(e) {
  if (e) e.stopPropagation();
  if (songs.length === 0) return;
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
  } else {
    const prev = (currentIdx - 1 + songs.length) % songs.length;
    playSong(prev);
  }
}

function toggleShuffle() {
  isShuffle = !isShuffle;
  document.getElementById('fs-shuffle').classList.toggle('on', isShuffle);
}

function toggleRepeat() {
  isRepeat = !isRepeat;
  document.getElementById('fs-repeat').classList.toggle('on', isRepeat);
}

/* Overlay transitions */
function openFullscreen() {
  document.getElementById('fullscreen-player').classList.add('active');
  document.getElementById('mini-player').classList.add('hidden');
}

function closeFullscreen() {
  document.getElementById('fullscreen-player').classList.remove('active');
  if (currentIdx !== -1) {
    document.getElementById('mini-player').classList.remove('hidden');
  }
}

function openFullLyrics() {
  document.getElementById('fullscreen-lyrics').classList.add('active');
}

function closeFullLyrics() {
  document.getElementById('fullscreen-lyrics').classList.remove('active');
}

/* ──────────────────────────────────────────
   AUDIO EVENTS & SYNC
   ────────────────────────────────────────── */
audio.addEventListener('play', () => {
  isPlaying = true;
  updatePlayStateUI(true);
});

audio.addEventListener('pause', () => {
  isPlaying = false;
  updatePlayStateUI(false);
});

function updatePlayStateUI(playing) {
  // Mini player
  document.getElementById('mini-icon-play').style.display  = playing ? 'none' : 'block';
  document.getElementById('mini-icon-pause').style.display = playing ? 'block' : 'none';

  // Fullscreen player
  document.getElementById('fs-icon-play').style.display  = playing ? 'none' : 'block';
  document.getElementById('fs-icon-pause').style.display = playing ? 'block' : 'none';

  // Fullscreen lyrics
  document.getElementById('fl-icon-play').style.display  = playing ? 'none' : 'block';
  document.getElementById('fl-icon-pause').style.display = playing ? 'block' : 'none';
}

audio.addEventListener('ended', () => { nextTrack(); });

audio.addEventListener('loadedmetadata', () => {
  const durStr = formatTime(audio.duration);
  document.getElementById('fs-duration-time').textContent = durStr;
  document.getElementById('fl-duration').textContent      = durStr;
});

audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;

  const pct = (audio.currentTime / audio.duration) * 100;
  const timeStr = formatTime(audio.currentTime);

  // Progress fills
  document.getElementById('mini-progress-fill').style.width = pct + '%';
  document.getElementById('fs-fill').style.width            = pct + '%';
  document.getElementById('fs-thumb').style.left            = pct + '%';
  document.getElementById('fl-progress-fill').style.width  = pct + '%';

  // Time labels
  document.getElementById('fs-current-time').textContent = timeStr;
  document.getElementById('fl-current').textContent      = timeStr;

  syncLyrics(audio.currentTime);
});

/* ──────────────────────────────────────────
   SEEKING ON PROGRESS BARS
   ────────────────────────────────────────── */
const fsProgress = document.getElementById('fs-progress');
const flProgress = document.getElementById('fl-progress-bar');

function seekFromBar(e, barEl) {
  const rect = barEl.getBoundingClientRect();
  const x    = (e.touches ? e.touches[0].clientX : e.clientX);
  const pct  = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
  if (audio.duration) audio.currentTime = pct * audio.duration;
}

if (fsProgress) {
  fsProgress.addEventListener('click', e => seekFromBar(e, fsProgress));
}
if (flProgress) {
  flProgress.addEventListener('click', e => seekFromBar(e, flProgress));
}

/* ──────────────────────────────────────────
   LRC PARSER & LYRICS RENDER
   ────────────────────────────────────────── */
function parseLRC(raw) {
  if (!raw || !raw.trim()) return [];

  const lines = [];
  const regex = /\[(\d{1,2}):(\d{2})(?:[.:](\d{1,3}))?\](.*)/;

  raw.split('\n').forEach(line => {
    const match = line.trim().match(regex);
    if (!match) return;

    const min  = parseInt(match[1], 10);
    const sec  = parseInt(match[2], 10);
    const ms   = match[3] ? parseInt(match[3].padEnd(3, '0'), 10) : 0;
    const text = match[4].trim();

    if (text) {
      lines.push({ time: min * 60 + sec + ms / 1000, text });
    }
  });

  lines.sort((a, b) => a.time - b.time);
  return lines;
}

function renderLyrics() {
  const inner = document.getElementById('fl-lyrics-inner');
  if (!inner) return;

  if (lrcLines.length === 0) {
    inner.innerHTML = '<p class="lyrics-placeholder">♪ Tidak ada lirik tersedia</p>';
    return;
  }

  inner.innerHTML = '';

  lrcLines.forEach((line, i) => {
    const p = document.createElement('p');
    p.className = 'lyric-line';
    p.dataset.index = i;
    p.textContent = line.text;
    p.onclick = () => {
      audio.currentTime = line.time;
    };
    inner.appendChild(p);
  });
}

function renderPreviewLyrics() {
  const inner = document.getElementById('lyrics-preview-inner');
  if (!inner) return;

  if (lrcLines.length === 0) {
    inner.innerHTML = '<p class="preview-line" style="color:rgba(255,255,255,.3)">Tidak ada pratinjau lirik.</p>';
    const el = document.getElementById('fs-current-line');
    if (el) el.textContent = '—';
    return;
  }

  inner.innerHTML = '';
  lrcLines.forEach((line, i) => {
    const p = document.createElement('p');
    p.className = 'preview-line';
    p.dataset.index = i;
    p.textContent = line.text;
    inner.appendChild(p);
  });

  // reset posisi
  inner.style.transform = 'translateY(0)';

  const el = document.getElementById('fs-current-line');
  if (el) el.textContent = lrcLines[0]?.text || '—';
}

let lastActiveIdx = -1;

function syncLyrics(currentTime) {
  if (lrcLines.length === 0) return;

  let activeIdx = -1;
  for (let i = lrcLines.length - 1; i >= 0; i--) {
    if (lrcLines[i].time <= currentTime) {
      activeIdx = i;
      break;
    }
  }

  if (activeIdx !== -1) {
    document.getElementById('fs-current-line').textContent = lrcLines[activeIdx].text;
  }

  if (activeIdx === lastActiveIdx) return;
  lastActiveIdx = activeIdx;

  // Sync preview lyrics autoscroll via translateY
  const inner = document.getElementById('lyrics-preview-inner');
  if (inner) {
    const previewLines = inner.querySelectorAll('.preview-line');
    previewLines.forEach((el, i) => {
      el.classList.remove('preview-active', 'preview-past', 'preview-future');
      if (i === activeIdx) {
        el.classList.add('preview-active');
      } else if (i < activeIdx) {
        el.classList.add('preview-past');
      } else {
        el.classList.add('preview-future');
      }
    });

    // Geser inner ke atas agar baris aktif selalu muncul di baris pertama
    if (activeIdx >= 0 && previewLines[activeIdx]) {
      const lineH = previewLines[activeIdx].offsetHeight;
      const offsetY = -(previewLines[activeIdx].offsetTop - lineH * 0.3);
      inner.style.transform = `translateY(${offsetY}px)`;
    }
  }

  // Sync fullscreen lyrics
  const inner = document.getElementById('fl-lyrics-inner');
  if (!inner) return;

  const allLines = inner.querySelectorAll('.lyric-line');
  allLines.forEach((el, i) => {
    el.classList.remove('active', 'near');
    if (i === activeIdx) {
      el.classList.add('active');
    } else if (Math.abs(i - activeIdx) <= 2) {
      el.classList.add('near');
    }
  });

  if (activeIdx >= 0 && allLines[activeIdx]) {
    const container = document.getElementById('fl-lyrics-container');
    if (container) {
      const lineTop    = allLines[activeIdx].offsetTop;
      const lineH      = allLines[activeIdx].offsetHeight;
      const containerH = container.clientHeight;
      container.scrollTo({
        top: lineTop - containerH / 2 + lineH / 2,
        behavior: 'smooth'
      });
    }
  }
}

/* ──────────────────────────────────────────
   UTILS & SHORTCUTS
   ────────────────────────────────────────── */
function formatTime(sec) {
  if (!sec || isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

document.addEventListener('keydown', e => {
  if (document.activeElement.id === 'pl-search') return;

  switch (e.code) {
    case 'Space':
      if (e.target.tagName.toLowerCase() === 'body') {
        e.preventDefault();
        togglePlay();
      }
      break;
    case 'ArrowRight':
      if (audio.src) audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10);
      break;
    case 'ArrowLeft':
      if (audio.src) audio.currentTime = Math.max(0, audio.currentTime - 10);
      break;
    case 'KeyN': nextTrack(); break;
    case 'KeyP': prevTrack(); break;
  }
});

/* ──────────────────────────────────────────
   INIT
   ────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadPlaylist();
});
