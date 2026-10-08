/* =========================================
   PLAYLIST PAGE — playlist.js
   Spotify-style player with LRC sync
   ========================================= */

/* ──────────────────────────────────────────
   SUPABASE INIT
   ────────────────────────────────────────── */
const SUPABASE_URL = 'https://sytcbztlwbvfkdfeakct.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5dGNienRsd2J2ZmtkZmVha2N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzODYxMDQsImV4cCI6MjEwNjk2MjEwNH0.SmY24xoVlUV4GuWtK00hNciy4WNUyC-4DtqNJvn8FEQ';
const _sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* ──────────────────────────────────────────
   STATE
   ────────────────────────────────────────── */
let songs        = [];          // array of song objects from DB
let currentIdx   = -1;          // index in songs[]
let isShuffle    = false;
let isPlaying    = false;
let lrcLines     = [];          // parsed: [{time: sec, text: '...'}]
let lyricsVisible = true;
let isRepeat      = false;
let isExpanding   = false;

const audio = document.getElementById('audio-pl');

/* ──────────────────────────────────────────
   FETCH SONGS FROM SUPABASE
   ────────────────────────────────────────── */
async function loadPlaylist() {
  try {
    const { data, error } = await _sb
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
    document.getElementById('pl-main').classList.add('active'); // for mobile default
    document.getElementById('pl-count').textContent =
      `${songs.length} lagu`;

    renderList();
  } catch (err) {
    document.getElementById('pl-loading').style.display = 'none';
    document.getElementById('pl-empty').style.display = 'flex';
    document.getElementById('pl-empty').querySelector('p').textContent =
      'Gagal memuat playlist. Periksa koneksi & konfigurasi Supabase.';
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
    li.onclick = () => playSong(actualIdx);

    const coverSrc = song.cover_url ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(song.title)}&background=1c2333&color=1db954&size=200`;

    li.innerHTML = `
      <span class="pl-num">${actualIdx + 1}</span>
      <img class="pl-thumb" src="${esc(coverSrc)}" alt="${esc(song.title)}"
           onerror="this.src='https://ui-avatars.com/api/?name=♪&background=1c2333&color=1db954&size=200'" />
      <div class="pl-info">
        <p class="pl-song-title">${esc(song.title)}</p>
        <p class="pl-song-artist">${esc(song.artist)}</p>
      </div>
      <span class="pl-duration" id="dur-${actualIdx}">—</span>
    `;

    list.appendChild(li);

    // pre-fetch duration for display
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

/* fetch audio duration without fully loading the file */
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

  // update list highlight
  document.querySelectorAll('.pl-item').forEach((li) => {
    const numEl = li.querySelector('.pl-num');
    const isPlayingItem = numEl && parseInt(numEl.textContent) === (idx + 1);
    li.classList.toggle('playing', isPlayingItem);
  });

  // update player UI
  document.getElementById('player-title').textContent  = song.title || '—';
  document.getElementById('player-artist').textContent = song.artist || '—';

  const coverEl = document.getElementById('player-cover');
  const bigCoverEl = document.getElementById('big-cover');
  
  const coverSrc = song.cover_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(song.title)}&background=1c2333&color=1db954&size=200`;
  
  coverEl.src = coverSrc;
  bigCoverEl.src = coverSrc.replace('size=200', 'size=500');
  
  const handleErr = (el) => {
    el.src = `https://ui-avatars.com/api/?name=♪&background=1c2333&color=1db954&size=500`;
  };
  coverEl.onerror = () => handleErr(coverEl);
  bigCoverEl.onerror = () => handleErr(bigCoverEl);

  // load audio
  audio.src = song.audio_url || '';
  audio.load();
  audio.play().catch(err => console.warn('Autoplay blocked:', err));

  // parse lyrics
  lrcLines = parseLRC(song.lyrics || '');
  renderLyrics();

  // scroll the song into view in list
  const listItems = document.querySelectorAll('.pl-item');
  const activeLi = Array.from(listItems).find(li => {
     const numEl = li.querySelector('.pl-num');
     return numEl && parseInt(numEl.textContent) === (idx + 1);
  });
  if (activeLi) activeLi.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ──────────────────────────────────────────
   PLAYER CONTROLS
   ────────────────────────────────────────── */
function togglePlay() {
  if (!audio.src || audio.src === window.location.href) return;
  if (audio.paused) {
    audio.play().catch(() => {});
  } else {
    audio.pause();
  }
}

function seekRelative(sec) {
  if (!audio.src) return;
  audio.currentTime = Math.max(0, Math.min(audio.duration || 0, audio.currentTime + sec));
}

function nextTrack() {
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

function prevTrack() {
  if (songs.length === 0) return;
  // if >3s in, restart; else go previous
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
  } else {
    const prev = (currentIdx - 1 + songs.length) % songs.length;
    playSong(prev);
  }
}

function toggleShuffle() {
  isShuffle = !isShuffle;
  document.getElementById('btn-shuffle').classList.toggle('on', isShuffle);
}

function toggleRepeat() {
  isRepeat = !isRepeat;
  document.getElementById('btn-repeat').classList.toggle('on', isRepeat);
}

function toggleExpand() {
  const panel = document.getElementById('right-panel');
  const iconExpand = document.getElementById('icon-expand');
  const iconMinimize = document.getElementById('icon-minimize');
  
  isExpanding = !isExpanding;
  panel.classList.toggle('expanded', isExpanding);
  
  if (isExpanding) {
    iconExpand.style.display = 'none';
    iconMinimize.style.display = 'block';
  } else {
    iconExpand.style.display = 'block';
    iconMinimize.style.display = 'none';
  }
}

function switchTab(tab) {
  const plMain = document.getElementById('pl-main');
  const rightPanel = document.getElementById('right-panel');
  const btnPl = document.getElementById('tab-playlist');
  const btnPlayer = document.getElementById('tab-player');
  
  if (tab === 'playlist') {
    plMain.classList.add('active');
    plMain.style.display = 'block';
    rightPanel.classList.remove('active');
    btnPl.classList.add('active');
    btnPlayer.classList.remove('active');
  } else {
    plMain.classList.remove('active');
    plMain.style.display = 'none';
    rightPanel.classList.add('active');
    btnPl.classList.remove('active');
    btnPlayer.classList.add('active');
  }
}

/* ──────────────────────────────────────────
   AUDIO EVENTS
   ────────────────────────────────────────── */
audio.addEventListener('play', () => {
  isPlaying = true;
  document.getElementById('icon-play-pl').style.display  = 'none';
  document.getElementById('icon-pause-pl').style.display = 'block';
  document.getElementById('player-cover').classList.add('spinning');
});

audio.addEventListener('pause', () => {
  isPlaying = false;
  document.getElementById('icon-play-pl').style.display  = 'block';
  document.getElementById('icon-pause-pl').style.display = 'none';
  document.getElementById('player-cover').classList.remove('spinning');
});

audio.addEventListener('ended', () => { nextTrack(); });

audio.addEventListener('loadedmetadata', () => {
  document.getElementById('player-duration').textContent =
    formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;

  const pct = (audio.currentTime / audio.duration) * 100;
  document.getElementById('player-fill').style.width  = pct + '%';
  document.getElementById('player-thumb').style.left  = pct + '%';
  document.getElementById('player-current').textContent =
    formatTime(audio.currentTime);

  syncLyrics(audio.currentTime);
});

/* ──────────────────────────────────────────
   PROGRESS BAR CLICK / DRAG
   ────────────────────────────────────────── */
const progressBar = document.getElementById('player-progress');

function seekFromEvent(e) {
  const rect = progressBar.getBoundingClientRect();
  const x    = (e.touches ? e.touches[0].clientX : e.clientX);
  const pct  = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
  if (audio.duration) audio.currentTime = pct * audio.duration;
}

progressBar.addEventListener('click', seekFromEvent);

let isDragging = false;
progressBar.addEventListener('mousedown', () => { isDragging = true; });
document.addEventListener('mousemove', e => { if (isDragging) seekFromEvent(e); });
document.addEventListener('mouseup',   () => { isDragging = false; });

progressBar.addEventListener('touchstart', () => { isDragging = true; }, { passive: true });
document.addEventListener('touchmove',  e => { if (isDragging) seekFromEvent(e); }, { passive: true });
document.addEventListener('touchend',   () => { isDragging = false; });

/* ──────────────────────────────────────────
   LRC PARSER
   ────────────────────────────────────────── */
/**
 * Parse LRC format string into array of {time, text}.
 * Supports: [mm:ss.xx] Text
 */
function parseLRC(raw) {
  if (!raw || !raw.trim()) return [];

  const lines  = [];
  const regex  = /\[(\d{1,2}):(\d{2})(?:[.:](\d{1,3}))?\](.*)/;

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

  // sort ascending by time
  lines.sort((a, b) => a.time - b.time);
  return lines;
}

/* ──────────────────────────────────────────
   RENDER LYRIC LINES
   ────────────────────────────────────────── */
function renderLyrics() {
  const inner = document.getElementById('lyrics-inner');
  
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

/* ──────────────────────────────────────────
   SYNC LYRICS (timeupdate callback)
   ────────────────────────────────────────── */
let lastActiveLyricIdx = -1;

function syncLyrics(currentTime) {
  if (lrcLines.length === 0) return;

  // find the last line whose time <= currentTime
  let activeIdx = -1;
  for (let i = lrcLines.length - 1; i >= 0; i--) {
    if (lrcLines[i].time <= currentTime) {
      activeIdx = i;
      break;
    }
  }

  if (activeIdx === lastActiveLyricIdx) return; // nothing changed
  lastActiveLyricIdx = activeIdx;

  const inner = document.getElementById('lyrics-inner');
  const allLines = inner.querySelectorAll('.lyric-line');

  allLines.forEach((el, i) => {
    el.classList.remove('active', 'near');
    if (i === activeIdx) {
      el.classList.add('active');
    } else if (Math.abs(i - activeIdx) <= 2) {
      el.classList.add('near');
    }
  });

  // auto-scroll the active lyric to center of panel
  if (activeIdx >= 0 && allLines[activeIdx]) {
    const panelHeight = inner.clientHeight;
    const lineTop     = allLines[activeIdx].offsetTop;
    const lineHeight  = allLines[activeIdx].offsetHeight;
    inner.scrollTop   = lineTop - panelHeight / 2 + lineHeight / 2;
  }
}

/* ──────────────────────────────────────────
   LYRICS PANEL TOGGLE
   ────────────────────────────────────────── */
function toggleLyricsPanel() {
  lyricsVisible = !lyricsVisible;
  const lyricsPanel = document.getElementById('lyrics-panel');
  const coverWrapper = document.getElementById('cover-wrapper');
  const btnLyrics = document.getElementById('btn-lyrics');

  if (lyricsVisible) {
    lyricsPanel.style.display = 'block';
    coverWrapper.style.display = 'none';
    btnLyrics.classList.add('on');
  } else {
    lyricsPanel.style.display = 'none';
    coverWrapper.style.display = 'flex';
    btnLyrics.classList.remove('on');
  }
}

/* ──────────────────────────────────────────
   DIVIDER DRAGGING
   ────────────────────────────────────────── */
function initDivider() {
  const container = document.getElementById('split-container');
  const divider = document.getElementById('divider');
  let isResizing = false;

  divider.addEventListener('mousedown', (e) => {
    isResizing = true;
    document.body.style.cursor = 'col-resize';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;
    const offsetLeft = container.offsetLeft;
    const containerWidth = container.offsetWidth;
    const pointerX = e.clientX - offsetLeft;
    
    // clamp between 20% and 80%
    let pct = (pointerX / containerWidth) * 100;
    if (pct < 20) pct = 20;
    if (pct > 80) pct = 80;
    
    container.style.gridTemplateColumns = `${pct}% 4px 1fr`;
  });

  document.addEventListener('mouseup', () => {
    isResizing = false;
    document.body.style.cursor = '';
  });
  
  // touch support
  divider.addEventListener('touchstart', (e) => {
    isResizing = true;
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (!isResizing) return;
    const offsetLeft = container.offsetLeft;
    const containerWidth = container.offsetWidth;
    const pointerX = e.touches[0].clientX - offsetLeft;
    
    let pct = (pointerX / containerWidth) * 100;
    if (pct < 20) pct = 20;
    if (pct > 80) pct = 80;
    
    container.style.gridTemplateColumns = `${pct}% 4px 1fr`;
  }, { passive: true });

  document.addEventListener('touchend', () => {
    isResizing = false;
  });
}

/* ──────────────────────────────────────────
   UTILS
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

/* ──────────────────────────────────────────
   KEYBOARD SHORTCUTS
   ────────────────────────────────────────── */
document.addEventListener('keydown', e => {
  // skip if in search box
  if (document.activeElement.id === 'pl-search') return;

  switch (e.code) {
    case 'Space':
      // prevent page scroll on spacebar
      if (e.target.tagName.toLowerCase() === 'body') {
        e.preventDefault();
        togglePlay();
      }
      break;
    case 'ArrowRight': seekRelative(10);  break;
    case 'ArrowLeft':  seekRelative(-10); break;
    case 'KeyN':       nextTrack();       break;
    case 'KeyP':       prevTrack();       break;
    case 'KeyL':       toggleLyricsPanel(); break;
    case 'KeyS':       toggleShuffle();     break;
    case 'KeyR':       toggleRepeat();      break;
  }
});

/* ──────────────────────────────────────────
   INIT
   ────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadPlaylist();
  initDivider();
  // show lyrics panel by default
  document.getElementById('btn-lyrics').classList.add('on');
});
