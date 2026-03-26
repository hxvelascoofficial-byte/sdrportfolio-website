/* ═══════════════════════════════════════════
   EMAILJS CONFIG
   ───────────────────────────────────────────
   1. Sign up free at https://emailjs.com
   2. Add a Service (Gmail, Outlook, etc.)
   3. Create an Email Template
   4. Replace the three values below
═══════════════════════════════════════════ */
const EMAILJS_PUBLIC_KEY  = 'L8AzrEE-9KgS3c16g';
const EMAILJS_SERVICE_ID  = 'service_jlck8pf';
const EMAILJS_TEMPLATE_ID = 'template_sd26vlm';

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof emailjs !== 'undefined') emailjs.init(EMAILJS_PUBLIC_KEY);

  initCursor();
  initParticles();
  initHeroAnimations();
  initTypewriter();
  initNavbar();
  initMobileMenu();
  initStatCounters();
  initScrollAnimations();
  initAccordion();
  initTestimonials();
  initTilt();
  initContactForm();
});

/* ── CURSOR ── */
function initCursor() {
  const glow = document.getElementById('cursor-glow');
  const dot  = document.getElementById('cursor-dot');
  if (!glow || !dot) return;

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let gx = mx, gy = my;

  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function raf() {
    gx += (mx - gx) * 0.08;
    gy += (my - gy) * 0.08;
    glow.style.left = gx + 'px';
    glow.style.top  = gy + 'px';
    requestAnimationFrame(raf);
  })();

  document.querySelectorAll('a, button, .skill-chip, .project-card, .blog-card, .accordion-trigger, .stat-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.transform = 'translate(-50%,-50%) scale(2.8)';
      dot.style.background = 'rgba(0,170,255,0.4)';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.transform = 'translate(-50%,-50%) scale(1)';
      dot.style.background = '#00aaff';
    });
  });
}

/* ── PARTICLES ── */
function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() { this.reset(true); }
    reset(random) {
      this.x  = random ? Math.random() * W : Math.random() * W;
      this.y  = random ? Math.random() * H : -10;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.r  = Math.random() * 1.5 + 0.4;
      this.a  = Math.random() * 0.45 + 0.1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,170,255,${this.a})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 85; i++) particles.push(new Particle());

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 115) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,170,255,${0.07 * (1 - d / 115)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  (function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(loop);
  })();
}

/* ── TYPEWRITER ── */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'Sales Development Representative.',
    'SDR Manager.',
    'Freelancer.',
    'Pipeline Builder.',
    'Cold Outreach Expert.',
  ];

  let pi = 0, ci = 0, deleting = false;

  function tick() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.substring(0, ci + 1);
      ci++;
      if (ci === phrase.length) { deleting = true; setTimeout(tick, 1800); return; }
    } else {
      el.textContent = phrase.substring(0, ci - 1);
      ci--;
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(tick, deleting ? 38 : 65);
  }
  setTimeout(tick, 1400);
}

/* ── HERO ANIMATIONS ── */
function initHeroAnimations() {
  if (typeof gsap === 'undefined') {
    // Fallback: show everything without animation
    ['#hero-eyebrow','#hero-sub','#hero-ctas','#hero-photo','#scroll-ind'].forEach(s => {
      const el = document.querySelector(s);
      if (el) { el.style.opacity = '1'; el.style.transform = 'none'; }
    });
    document.querySelectorAll('h1 .word').forEach(w => {
      w.innerHTML = `<span class="word-inner" style="transform:none">${w.textContent}</span>`;
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Wrap each word for reveal
  document.querySelectorAll('h1 .word').forEach(word => {
    const txt = word.innerHTML;
    word.innerHTML = `<span class="word-inner">${txt}</span>`;
  });

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.to('#hero-eyebrow',   { opacity: 1, y: 0, duration: 0.7, delay: 0.2 })
    .to('h1 .word-inner',  { y: '0%', duration: 0.75, stagger: 0.12 }, '-=0.3')
    .to('#hero-sub',       { opacity: 1, y: 0, duration: 0.6 }, '-=0.25')
    .to('#hero-ctas',      { opacity: 1, y: 0, duration: 0.6 }, '-=0.35')
    .to('#hero-photo',     { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
    .to('#scroll-ind',     { opacity: 1, duration: 0.5 }, '-=0.2');
}

/* ── NAVBAR ── */
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  // Highlight active section link
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => obs.observe(s));
}

/* ── MOBILE MENU ── */
function initMobileMenu() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ── STAT COUNTERS ── */
function initStatCounters() {
  document.querySelectorAll('.stat-number[data-count]').forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    let animated = false;

    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          let current = 0;
          const step = target / 55;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { counter.textContent = target; clearInterval(timer); }
            else counter.textContent = Math.floor(current);
          }, 22);
        }
      });
    }, { threshold: 0.5 }).observe(counter);
  });
}

/* ── SCROLL ANIMATIONS ── */
function initScrollAnimations() {
  if (typeof gsap === 'undefined') return;

  const items = [
    '.section-tag', '.section-title', '.section-sub',
    '.about-text p', '.about-ctas',
    '.skill-chip', '.project-card',
    '.accordion-item', '.blog-card',
    '.contact-intro p', '.contact-link', '.contact-form-wrap',
    '.calendly-wrapper',
  ];

  items.forEach(sel => {
    gsap.utils.toArray(sel).forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 38 },
        {
          opacity: 1, y: 0, duration: 0.65, delay: i * 0.055,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 89%', toggleActions: 'play none none none' }
        }
      );
    });
  });

  // Stat cards pop in
  gsap.utils.toArray('.stat-card').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, scale: 0.88 },
      {
        opacity: 1, scale: 1, duration: 0.5, delay: i * 0.08,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' }
      }
    );
  });

  // Testimonial slider
  gsap.fromTo('.testimonial-slider',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: '.testimonial-slider', start: 'top 85%', toggleActions: 'play none none none' }
    }
  );
}

/* ── ACCORDION ── */
function initAccordion() {
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.parentElement;
      const body = item.querySelector('.accordion-body');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.accordion-body').style.maxHeight = '0';
      });

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
        const inner = body.querySelector('.accordion-body-inner');
        body.style.maxHeight = (inner ? inner.scrollHeight : body.scrollHeight) + 48 + 'px';
      }
    });
  });
}

/* ── TESTIMONIALS SLIDER ── */
function initTestimonials() {
  const track  = document.getElementById('testimonial-track');
  const dotsEl = document.getElementById('tdots');
  const prev   = document.getElementById('tprev');
  const next   = document.getElementById('tnext');
  if (!track) return;

  const cards = Array.from(track.querySelectorAll('.testimonial-card'));
  const total = cards.length;
  let current = 0;
  let autoTimer;

  // Build dots
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'tdot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  });

  function goTo(n) {
    current = ((n % total) + total) % total;
    const cardW = cards[0].getBoundingClientRect().width + 24;
    track.style.transform = `translateX(-${current * cardW}px)`;
    document.querySelectorAll('.tdot').forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function startAuto() { autoTimer = setInterval(() => goTo(current + 1), 5000); }
  function stopAuto()  { clearInterval(autoTimer); }

  prev.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
  next.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });
  window.addEventListener('resize', () => goTo(current));
  startAuto();
}

/* ── 3D TILT ── */
function initTilt() {
  const MAX = 10;
  document.querySelectorAll('.project-card, .blog-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top)  / r.height - 0.5) * -MAX * 2;
      const ry = ((e.clientX - r.left) / r.width  - 0.5) *  MAX * 2;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

/* ── CONTACT FORM (EmailJS) ── */
function initContactForm() {
  const form    = document.getElementById('contact-form');
  const btnText = document.getElementById('btn-text');
  const btnLoad = document.getElementById('btn-loading');
  const msgOk   = document.getElementById('form-success');
  const msgErr  = document.getElementById('form-error');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    btnText.style.display = 'none';
    btnLoad.style.display = 'inline';
    msgOk.style.display = msgErr.style.display = 'none';

    try {
      if (typeof emailjs === 'undefined') throw new Error('EmailJS not loaded');
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
      msgOk.style.display = 'block';
      form.reset();
      setTimeout(() => msgOk.style.display = 'none', 6000);
    } catch (err) {
      console.error('EmailJS:', err);
      msgErr.style.display = 'block';
      setTimeout(() => msgErr.style.display = 'none', 6000);
    } finally {
      btnText.style.display = 'inline';
      btnLoad.style.display = 'none';
    }
  });
}
