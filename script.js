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

  // ===== Loading Screen → Welcome Overlay =====
  const loadingScreen = document.getElementById('loadingScreen');

  // After 2 seconds, transform loading screen into "Tap to Enter" overlay
  setTimeout(() => {
    loadingScreen.innerHTML = `
      <div style="text-align:center; cursor:pointer;">
        <div style="font-size:3rem; margin-bottom:16px;">💍</div>
        <div style="font-family:'Great Vibes',cursive; font-size:2.5rem; color:#9a7b4f; margin-bottom:12px;">Tharaka & Imasha</div>
        <div style="font-family:'Outfit',sans-serif; font-size:0.8rem; letter-spacing:4px; text-transform:uppercase; color:#6b6b6b; margin-bottom:32px;">Wedding Invitation</div>
        <div class="enter-btn-glow" style="
          display:inline-block;
          padding:14px 40px;
          background:linear-gradient(135deg,#c9a96e,#9a7b4f);
          color:#fff;
          border-radius:50px;
          font-family:'Outfit',sans-serif;
          font-size:0.85rem;
          font-weight:500;
          letter-spacing:3px;
          text-transform:uppercase;
          cursor:pointer;
          animation: pulse-glow 2s ease-in-out infinite;
        ">🎵 Tap to Enter</div>
      </div>
    `;

    // Click anywhere on overlay → start music + hide overlay
    loadingScreen.style.cursor = 'pointer';
    loadingScreen.addEventListener('click', () => {
      startMusic();
      loadingScreen.classList.add('hidden');
    });
  }, 2000);

  // Fallback: if nobody clicks after 30s, hide overlay
  setTimeout(() => {
    if (!loadingScreen.classList.contains('hidden')) {
      loadingScreen.classList.add('hidden');
    }
  }, 30000);

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
  const weddingDate = new Date('2026-05-25T16:00:00').getTime();

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
