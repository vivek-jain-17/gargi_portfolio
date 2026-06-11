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


// ========== CREATIVE WRITING FILTER ==========
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const writingCards = document.querySelectorAll('#writing .card');

  if (filterButtons.length === 0) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      // update active button styling
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');

      writingCards.forEach(card => {
        if (filterValue === 'all') {
          card.classList.remove('hide-card');
        } else {
          const cardCategory = card.getAttribute('data-category');
          if (cardCategory === filterValue) {
            card.classList.remove('hide-card');
          } else {
            card.classList.add('hide-card');
          }
        }
      });
    });
  });
});

// ========== PROJECTS: CAROUSEL + GRID TOGGLE ==========
document.addEventListener('DOMContentLoaded', () => {
  // Project data (you can edit)
  const projectsData = [
    { category: "miniproject", icon: "📁", title: "AI Content Classifier", meta: "Mini Project • 2024", desc: "BERT-based classifier with 89% accuracy.", tags: ["Python", "Transformers", "Flask"], link: "#" },
    { category: "miniproject", icon: "🧠", title: "Emotion Detection API", meta: "Mini Project • 2023", desc: "DistilBERT fine-tuned, deployed with FastAPI.", tags: ["NLP", "FastAPI", "Docker"], link: "#" },
    { category: "product", icon: "🚀", title: "LevelUp Platform", meta: "Product Contributor • 2024", desc: "Gamified skill-building web app.", tags: ["Product Design", "User Testing"], link: "#" },
    { category: "product", icon: "📖", title: "Visionary Projects", meta: "Co-Founder • 2024", desc: "Client communication & content strategy.", tags: ["Project Mgt", "Client Relations"], link: "https://visionaryprojects.onrender.com" },
    { category: "personal", icon: "✍️", title: "Creative Writing Log", meta: "Personal • 2023–now", desc: "40+ poems, stories, essays.", tags: ["Storytelling", "Poetry"], link: "#" },
    { category: "personal", icon: "🎪", title: "College Fest '24", meta: "Lead Organizer • 2024", desc: "50+ volunteers, 2000+ attendees.", tags: ["Leadership", "Event Mgt"], link: "#" },
    { category: "casestudy", icon: "📊", title: "SEO Content Overhaul", meta: "Case Study • Safe Movers", desc: "47% increase in organic clicks.", tags: ["SEO", "Conversion Copy"], link: "#" },
    { category: "casestudy", icon: "🔍", title: "Brand Voice Refresh", meta: "Case Study • Cycle Agarbati", desc: "Tagline system for packaging & ads.", tags: ["Brand Strategy", "Copywriting"], link: "#" }
  ];

  let currentFilter = "all";
  let currentView = "carousel";
  let currentIndex = 0;

  const carouselContainer = document.getElementById('projectCarousel');
  const gridContainer = document.getElementById('projectGrid');
  const track = document.getElementById('projectTrack');
  const dotsContainer = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  function renderCards() {
    const filtered = projectsData.filter(p => currentFilter === "all" || p.category === currentFilter);
    // render carousel track
    if (track) {
      track.innerHTML = filtered.map((p, idx) => `
        <div class="carousel-card" data-index="${idx}">
          <div class="polaroid-icon">${p.icon}</div>
          <h3>${p.title}</h3>
          <div class="polaroid-meta">${p.meta}</div>
          <p>${p.desc}</p>
          <div class="polaroid-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
          <a href="${p.link}" class="read-more">Explore →</a>
        </div>
      `).join('');
      // reset carousel position
      currentIndex = 0;
      updateCarousel();
    }
    // render grid
    if (gridContainer) {
      gridContainer.innerHTML = filtered.map(p => `
        <div class="grid-card" data-category="${p.category}">
          <div class="polaroid-icon">${p.icon}</div>
          <h3>${p.title}</h3>
          <div class="polaroid-meta">${p.meta}</div>
          <p>${p.desc}</p>
          <div class="polaroid-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
          <a href="${p.link}" class="read-more">Explore →</a>
        </div>
      `).join('');
    }
    // update dots
    updateDots(filtered.length);
  }

  function updateCarousel() {
    const cards = document.querySelectorAll('.carousel-card');
    if (cards.length === 0) return;
    const cardWidth = cards[0].offsetWidth + 16; // including margin
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    // update active dot
    document.querySelectorAll('.dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function updateDots(total) {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === currentIndex) dot.classList.add('active');
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
      });
      dotsContainer.appendChild(dot);
    }
  }

  // next/prev
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const total = document.querySelectorAll('.carousel-card').length;
      if (currentIndex < total - 1) {
        currentIndex++;
        updateCarousel();
      }
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });
  }

  // filter buttons
  document.querySelectorAll('.project-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.project-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-project-filter');
      currentIndex = 0;
      renderCards();
      if (currentView === 'carousel') updateCarousel();
    });
  });

  // view toggle
  const viewBtns = document.querySelectorAll('.view-btn');
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentView = btn.getAttribute('data-view');
      if (currentView === 'carousel') {
        carouselContainer.style.display = 'flex';
        gridContainer.style.display = 'none';
        renderCards();
        updateCarousel();
      } else {
        carouselContainer.style.display = 'none';
        gridContainer.style.display = 'grid';
        renderCards();
      }
    });
  });

  // initial render
  renderCards();
  if (carouselContainer) carouselContainer.style.display = 'flex';
  if (gridContainer) gridContainer.style.display = 'none';
  window.addEventListener('resize', () => {
    if (currentView === 'carousel') updateCarousel();
  });
});

// ========== LEADERSHIP: EXPAND/CONTRACT CARDS ==========
document.querySelectorAll('.credential-toggle').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = btn.closest('.credential-card');
    card.classList.toggle('expanded');
    btn.textContent = card.classList.contains('expanded') ? 'Read less ↑' : 'Read more ↓';
  });
});