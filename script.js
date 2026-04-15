// ===== Wedding Invitation App =====

document.addEventListener('DOMContentLoaded', () => {

  // ===== Music Player Setup =====
  const bgMusic = document.getElementById('bgMusic');
  const musicBtn = document.getElementById('musicBtn');
  const musicIcon = document.getElementById('musicIcon');
  let isPlaying = false;

  function startMusic() {
    if (isPlaying) return;
    bgMusic.volume = 0.4;
    bgMusic.play().then(() => {
      musicIcon.textContent = '🔊';
      musicBtn.classList.add('playing');
      isPlaying = true;
    }).catch(() => {});
  }

  function toggleMusic() {
    if (isPlaying) {
      bgMusic.pause();
      musicIcon.textContent = '🎵';
      musicBtn.classList.remove('playing');
      isPlaying = false;
    } else {
      startMusic();
    }
  }

  musicBtn.addEventListener('click', toggleMusic);

  // ===== Loading Screen → Envelope Welcome =====
  const loadingScreen = document.getElementById('loadingScreen');

  // Inject envelope CSS
  const envStyle = document.createElement('style');
  envStyle.textContent = `
    .env-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 36px;
      user-select: none;
      width: 100vw;
      height: 100vh;
      background: radial-gradient(
        ellipse at 50% 30%,
        #e8d5f8 0%,
        #c9a8e8 25%,
        #9b6fd4 55%,
        #6a3fa0 80%,
        #3d1f6e 100%
      );
      position: relative;
      overflow: hidden;
    }
    /* Soft white glow orbs on background */
    .env-wrap::before {
      content: '';
      position: absolute;
      width: 500px; height: 500px;
      background: radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%);
      top: -100px; left: -100px;
      border-radius: 50%;
      pointer-events: none;
    }
    .env-wrap::after {
      content: '';
      position: absolute;
      width: 400px; height: 400px;
      background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%);
      bottom: -80px; right: -80px;
      border-radius: 50%;
      pointer-events: none;
    }
    .env-hint {
      font-family: 'Outfit', sans-serif;
      font-size: 0.72rem;
      letter-spacing: 6px;
      text-transform: uppercase;
      color: rgba(255,255,255,0.85);
      animation: env-blink 1.8s ease-in-out infinite;
      position: relative;
      z-index: 2;
      text-shadow: 0 1px 8px rgba(100,40,180,0.4);
    }
    @keyframes env-blink {
      0%,100% { opacity:0.35; transform:scale(1); }
      50% { opacity:1; transform:scale(1.04); }
    }

    /* ---- ENVELOPE ---- */
    .envelope {
      position: relative;
      width: 420px;
      height: 290px;
      cursor: pointer;
      perspective: 900px;
      transition: transform 0.3s ease;
      filter: drop-shadow(0 20px 44px rgba(50,10,120,0.4));
      z-index: 2;
      transform: scale(0.65);
      transform-origin: center center;
    }
    .envelope:hover:not(.opened) {
      transform: scale(0.65) translateY(-8px);
    }
    /* Scale down on small screens */
    @media (max-width: 520px) {
      .envelope {
        transform: scale(0.5);
      }
      .envelope:hover:not(.opened) {
        transform: scale(0.5) translateY(-6px);
      }
    }
    @media (max-width: 380px) {
      .envelope {
        transform: scale(0.42);
      }
      .envelope:hover:not(.opened) {
        transform: scale(0.42) translateY(-6px);
      }
    }

    /* Body */
    .env-body {
      position: absolute;
      inset: 0;
      background: linear-gradient(145deg, #f3eafc 0%, #ddd0ef 60%, #cebde8 100%);
      border-radius: 12px 12px 20px 20px;
      border: 1.5px solid rgba(184,159,212,0.5);
      overflow: hidden;
    }

    /* Inner lining shimmer */
    .env-lining {
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        135deg,
        rgba(255,255,255,0.07) 0px,
        rgba(255,255,255,0.07) 1px,
        transparent 1px,
        transparent 12px
      );
      border-radius: inherit;
    }

    /* Bottom V-fold */
    .env-bottom {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 0;
      border-left: 210px solid transparent;
      border-right: 210px solid transparent;
      border-bottom: 145px solid #c4aee2;
    }
    /* Side folds */
    .env-side-left {
      position: absolute;
      left: 0; top: 0; bottom: 0;
      width: 0;
      border-top: 145px solid transparent;
      border-bottom: 145px solid transparent;
      border-left: 175px solid #b8a0d8;
    }
    .env-side-right {
      position: absolute;
      right: 0; top: 0; bottom: 0;
      width: 0;
      border-top: 145px solid transparent;
      border-bottom: 145px solid transparent;
      border-right: 175px solid #b8a0d8;
    }

    /* Top flap */
    .env-flap {
      position: absolute;
      top: -1px; left: -1px; right: -1px;
      height: 0;
      border-left: 211px solid transparent;
      border-right: 211px solid transparent;
      border-top: 155px solid #b89fd4;
      transform-origin: top center;
      transform: rotateX(0deg);
      transition: transform 0.7s cubic-bezier(0.4,0,0.2,1);
      z-index: 10;
      filter: drop-shadow(0 6px 10px rgba(100,60,180,0.25));
    }
    .envelope:hover:not(.opened) .env-flap {
      transform: rotateX(-40deg);
    }
    .envelope.opened .env-flap {
      transform: rotateX(-180deg);
    }

    /* Flap inner crease line */
    .env-flap-line {
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      z-index: 11;
    }

    /* Wax seal */
    .env-seal {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -30%);
      width: 64px; height: 64px;
      background: radial-gradient(circle at 35% 30%, #e0b8f8, #8b6ab5 70%);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.6rem;
      box-shadow: 0 4px 20px rgba(100,60,180,0.4), inset 0 1px 2px rgba(255,255,255,0.3);
      z-index: 6;
      transition: transform 0.35s ease, opacity 0.35s ease;
      border: 2px solid rgba(255,255,255,0.25);
    }
    .envelope.opened .env-seal {
      transform: translate(-50%, -30%) scale(0) rotate(30deg);
      opacity: 0;
    }

    /* Invitation card inside */
    .env-card {
      position: absolute;
      left: 24px; right: 24px;
      bottom: 14px;
      height: 230px;
      background: linear-gradient(160deg, #fdf9ff 0%, #f5eeff 100%);
      border-radius: 10px;
      border: 1px solid rgba(184,159,212,0.5);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      z-index: 4;
      transform: translateY(0px);
      transition: transform 0.9s cubic-bezier(0.34,1.56,0.64,1);
      box-shadow: 0 -6px 30px rgba(100,60,180,0.12);
    }
    .envelope.opened .env-card {
      transform: translateY(-240px);
    }
    .env-card-ornament {
      font-size: 1rem;
      letter-spacing: 8px;
      color: #b89fd4;
      margin-bottom: 6px;
      opacity: 0.7;
    }
    .env-card-title {
      font-family: 'Great Vibes', cursive;
      font-size: 2rem;
      color: #8b6ab5;
      line-height: 1.2;
      margin-bottom: 4px;
    }
    .env-card-sub {
      font-family: 'Outfit', sans-serif;
      font-size: 0.58rem;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: #7a6e96;
      margin-bottom: 8px;
    }
    .env-card-divider {
      width: 60px; height: 1px;
      background: linear-gradient(90deg, transparent, #b89fd4, transparent);
      margin: 4px auto 8px;
    }
    .env-card-date {
      font-family: 'Cormorant Garamond', serif;
      font-size: 0.9rem;
      color: #b89fd4;
      letter-spacing: 3px;
    }

    /* Floating petals around envelope */
    .env-petal {
      position: absolute;
      font-size: 1rem;
      animation: petal-fall 4s ease-in-out infinite;
      opacity: 0;
      pointer-events: none;
    }
    @keyframes petal-fall {
      0%   { opacity:0; transform: translateY(-10px) rotate(0deg) scale(0.8); }
      20%  { opacity:0.9; }
      80%  { opacity:0.4; }
      100% { opacity:0; transform: translateY(80px) rotate(200deg) scale(0.5); }
    }

    /* ---- HEART BURST ---- */
    .heart-burst {
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      font-size: 1.2rem;
      animation: heart-fly var(--dur, 0.9s) ease-out forwards;
      top: var(--y);
      left: var(--x);
    }
    @keyframes heart-fly {
      0%   { transform: translate(0,0) scale(0.3) rotate(0deg); opacity:1; }
      60%  { opacity:1; }
      100% { transform: translate(var(--tx), var(--ty)) scale(1.2) rotate(var(--rot)); opacity:0; }
    }
  `;
  document.head.appendChild(envStyle);

  setTimeout(() => {
    loadingScreen.style.background = 'transparent';
    loadingScreen.innerHTML = `
      <div class="env-wrap">
        <div class="env-hint">✦ &nbsp; Tap to open your invitation &nbsp; ✦</div>
        <div class="envelope" id="theEnvelope">
          <div class="env-body">
            <div class="env-lining"></div>
            <div class="env-bottom"></div>
            <div class="env-side-left"></div>
            <div class="env-side-right"></div>
            <div class="env-card">
              <div class="env-card-ornament">❧ ✿ ❧</div>
              <div class="env-card-title">Tharaka &amp; Imasha</div>
              <div class="env-card-sub">Wedding Invitation</div>
              <div class="env-card-divider"></div>
              <div class="env-card-date">25 · May · 2026</div>
            </div>
          </div>
          <div class="env-flap"></div>
          <div class="env-flap-line"></div>
          <div class="env-seal">💜</div>
          <span class="env-petal" style="left:8%;top:12%;animation-delay:0s">🌸</span>
          <span class="env-petal" style="left:85%;top:8%;animation-delay:1.1s">✿</span>
          <span class="env-petal" style="left:48%;top:2%;animation-delay:2.3s">🌸</span>
          <span class="env-petal" style="left:25%;top:6%;animation-delay:0.7s">✦</span>
          <span class="env-petal" style="left:68%;top:4%;animation-delay:1.7s">🌷</span>
        </div>
      </div>
    `;

    const envelope = document.getElementById('theEnvelope');
    let opened = false;

    // Heart burst function — fires many small hearts from the click point
    function burstHearts(cx, cy) {
      const hearts = ['💜','💜','🪻','💜','✦','🌸','💜','🩷','💗','🫧'];
      const count = 18;
      for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.classList.add('heart-burst');
        const angle = (360 / count) * i;
        const rad = angle * Math.PI / 180;
        const dist = 80 + Math.random() * 100;
        const tx = Math.cos(rad) * dist;
        const ty = Math.sin(rad) * dist - 40;
        const dur = 0.7 + Math.random() * 0.5;
        const rot = (Math.random() - 0.5) * 360;
        el.style.setProperty('--x', cx + 'px');
        el.style.setProperty('--y', cy + 'px');
        el.style.setProperty('--tx', tx + 'px');
        el.style.setProperty('--ty', ty + 'px');
        el.style.setProperty('--dur', dur + 's');
        el.style.setProperty('--rot', rot + 'deg');
        el.style.fontSize = (0.8 + Math.random() * 0.9) + 'rem';
        el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        document.body.appendChild(el);
        setTimeout(() => el.remove(), (dur + 0.1) * 1000);
      }
    }

    envelope.addEventListener('click', (e) => {
      if (opened) return;
      opened = true;
      // Heart burst at click position
      burstHearts(e.clientX, e.clientY);
      envelope.classList.add('opened');
      startMusic();
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
      }, 1400);
    });

  }, 2000);

  // Fallback: hide after 60s
  setTimeout(() => {
    if (!loadingScreen.classList.contains('hidden')) {
      loadingScreen.classList.add('hidden');
    }
  }, 60000);

  // ===== Floating Particles =====
  const particlesContainer = document.getElementById('particles');
  function createParticles() {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.animationDuration = (6 + Math.random() * 6) + 's';
      particle.style.width = (3 + Math.random() * 5) + 'px';
      particle.style.height = particle.style.width;
      particlesContainer.appendChild(particle);
    }
  }
  createParticles();

  // ===== Sticky Nav on Scroll =====
  const nav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 150;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // ===== Smooth Scroll for Nav Links =====
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== Countdown Timer =====
  const weddingDate = new Date('2026-05-25T09:30:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (diff <= 0) {
      document.getElementById('countDays').textContent = '🎉';
      document.getElementById('countHours').textContent = '🎉';
      document.getElementById('countMinutes').textContent = '🎉';
      document.getElementById('countSeconds').textContent = '🎉';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('countDays').textContent = String(days).padStart(2, '0');
    document.getElementById('countHours').textContent = String(hours).padStart(2, '0');
    document.getElementById('countMinutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('countSeconds').textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ===== Scroll Reveal Animations =====
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== Console Easter Egg =====
  console.log('%c💍 Tharaka & Imasha - Wedding Invitation 💍', 'font-size: 20px; color: #c9a96e; font-family: serif;');
});
