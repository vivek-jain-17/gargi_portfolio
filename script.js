// ========== INTRO OVERLAY & TYPEWRITER ==========
window.addEventListener('load', () => {
  const overlay = document.getElementById('intro-overlay');
  const introLine = document.querySelector('.intro-line');
  const taglineEl = document.getElementById('typewriter');
  const tagline = "Writer · Thinker · Creative Mind";
  let i = 0;
  function type() {
    if (i < tagline.length) {
      taglineEl.textContent += tagline.charAt(i);
      i++;
      setTimeout(type, 60);
    }
  }
  setTimeout(type, 1800);
  setTimeout(() => { if(introLine) introLine.style.width = '150px'; }, 1500);
  setTimeout(() => { if(overlay) overlay.style.transform = 'translateY(-100%)'; }, 4000);
});

// ========== PROGRESS BAR & BACK TO TOP ==========
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) progressBar.style.width = scrolled + '%';
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    if (winScroll > 600) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');
  }
});
document.getElementById('back-to-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== NAVBAR SCROLL EFFECT ==========
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ========== MOBILE MENU ==========
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger?.addEventListener('click', () => navLinks?.classList.toggle('active'));
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => navLinks?.classList.remove('active')));

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId && targetId !== '#') {
      const target = document.querySelector(targetId);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ========== DARK MODE ==========
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
if (themeToggle) {
  const icon = themeToggle.querySelector('i');
  if (localStorage.getItem('theme') === 'dark') { body.classList.add('dark'); icon?.classList.replace('fa-moon','fa-sun'); }
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    if (body.classList.contains('dark')) { icon?.classList.replace('fa-moon','fa-sun'); localStorage.setItem('theme','dark'); }
    else { icon?.classList.replace('fa-sun','fa-moon'); localStorage.setItem('theme','light'); }
  });
}

// ========== SCROLL REVEAL ==========
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => { 
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }); 
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ========== STAT COUNTER ==========
const statNums = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.getAttribute('data-target');
      const duration = 2000;
      const step = target / (duration/16);
      let curr = 0;
      const update = () => { curr += step; if(curr < target) { el.textContent = Math.floor(curr); requestAnimationFrame(update); } else el.textContent = target; };
      update();
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(s => statsObserver.observe(s));

// ========== PARALLAX LEAVES ==========
document.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  document.querySelectorAll('.parallax-blob').forEach(blob => {
    const speed = parseFloat(blob.getAttribute('data-speed'));
    if (!isNaN(speed)) blob.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// ========== 3D TILT CARDS ==========
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xRot = -1 * ((y - rect.height/2)/20);
    const yRot = (x - rect.width/2)/20;
    card.style.transform = `perspective(800px) rotateX(${xRot}deg) rotateY(${yRot}deg) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)');
});

// ========== CUSTOM CURSOR ==========
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');
if (cursorDot && cursorOutline) {
  document.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    cursorOutline.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 500, fill: 'forwards' });
  });
  document.querySelectorAll('a, button, .tilt-card, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });
}

// ========== FLOATING PETALS ==========
function createPetal() {
  const container = document.getElementById('petals-container');
  if (!container) return;
  const petal = document.createElement('div'); petal.className = 'petal';
  petal.style.width = petal.style.height = (Math.random()*20+10)+'px';
  petal.style.left = Math.random()*100+'%';
  petal.style.animationDuration = (Math.random()*8+6)+'s';
  petal.style.animationDelay = Math.random()*2+'s';
  container.appendChild(petal);
  setTimeout(() => petal.remove(), 10000);
}
setInterval(createPetal, 400);
function createSparkle() {
  const container = document.getElementById('sparkles-container');
  if (!container) return;
  const sparkle = document.createElement('div'); sparkle.className = 'sparkle';
  sparkle.style.width = sparkle.style.height = (Math.random()*6+2)+'px';
  sparkle.style.left = Math.random()*100+'%';
  sparkle.style.top = '90%';
  sparkle.style.animationDelay = Math.random()*3+'s';
  container.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 5000);
}
setInterval(createSparkle, 600);

// fallback counter fix
setTimeout(() => {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = +el.getAttribute('data-target');
    if (el.textContent == '0' && target > 0) {
      let curr = 0;
      const step = target / 30;
      const timer = setInterval(() => {
        curr += step;
        if (curr >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(curr);
        }
      }, 50);
    }
  });
}, 500);