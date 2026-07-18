/* ==========================================================================
   Muhammad Aayan Khalid — Portfolio Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Year in footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Loading screen ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hide');
      document.body.style.overflow = '';
    }, 900);
  });

  /* ---------- AOS init ---------- */
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }

  /* ---------- Custom cursor ---------- */
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  if (cursorDot && cursorRing && matchMedia('(hover:hover)').matches) {
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    };
    animateRing();

    const hoverTargets = 'a, button, .btn, .project-card, .service-card, .tech-chip, input, textarea';
    document.querySelectorAll(hoverTargets).forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('active'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('active'));
    });
  }

  /* ---------- Particles.js network background ---------- */
  if (window.particlesJS) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 900 } },
        color: { value: ['#4f7cff', '#8b5cf6', '#22d3ee'] },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 2.6, random: true },
        line_linked: { enable: true, distance: 140, color: '#4f7cff', opacity: 0.18, width: 1 },
        move: { enable: true, speed: 0.9, direction: 'none', random: true, straight: false, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          grab: { distance: 160, line_linked: { opacity: 0.4 } },
          push: { particles_nb: 3 }
        }
      },
      retina_detect: true
    });
  }

  /* ---------- Typed.js — hero role + terminal line ---------- */
  if (window.Typed) {
    new Typed('#typed-role', {
      strings: [
        'responsive websites.',
        'secure web apps.',
        'full stack solutions.',
        'clean, scalable code.'
      ],
      typeSpeed: 45,
      backSpeed: 28,
      backDelay: 1600,
      loop: true,
      smartBackspace: true
    });

    new Typed('#typed-terminal', {
      strings: ['npm run build &amp;&amp; deploy --env=production'],
      typeSpeed: 34,
      loop: true,
      backSpeed: 10,
      backDelay: 2200,
      showCursor: false
    });
  }

  /* ---------- Sticky navbar on scroll ---------- */
  const nav = document.getElementById('mainNav');
  const scrollBar = document.getElementById('scrollBar');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 40);
    scrollTopBtn.classList.toggle('show', y > 500);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (y / docHeight) * 100 : 0;
    scrollBar.style.width = progress + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    navToggle.classList.toggle('open');
  });
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('show'));
  });

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('.stat-num');
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------- Animated skill bars ---------- */
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.width = el.dataset.width + '%';
        skillObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  skillFills.forEach(f => skillObserver.observe(f));

  /* ---------- GSAP scroll animations ---------- */
  if (window.gsap) {
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    gsap.from('.hero-title, .hero-subtitle, .hero-desc, .hero-actions, .hero-socials', {
      opacity: 0, y: 26, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.4
    });

    if (window.ScrollTrigger) {
      gsap.utils.toArray('.timeline-item').forEach((item) => {
        gsap.from(item, {
          scrollTrigger: { trigger: item, start: 'top 85%' },
          opacity: 0, x: -30, duration: 0.7, ease: 'power2.out'
        });
      });
    }
  }

  /* ---------- Contact form (front-end validation, demo submit) ---------- */
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('cfStatus');
  const submitBtn = document.getElementById('cfSubmit');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !subject || !message) {
      showStatus('Please fill in every field before sending.', 'error');
      return;
    }
    if (!emailPattern.test(email)) {
      showStatus('Please enter a valid email address.', 'error');
      return;
    }

    // Simulate sending (no back end wired up in this static build).
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-label').textContent = 'Sending...';

    setTimeout(() => {
      showStatus(`Thanks, ${name.split(' ')[0]}! Your message has been prepared — please connect a mail handler (e.g. PHP mailer or an API) to deliver it live.`, 'success');
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-label').textContent = 'Send Message';
      form.reset();
    }, 1100);
  });

  function showStatus(msg, type) {
    statusEl.textContent = msg;
    statusEl.className = 'form-status ' + type;
  }

});
