// ===========================
// SCROLL PROGRESS BAR
// ===========================
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById('progress-bar').style.width = progress + '%';
});

// ===========================
// SCROLL REVEAL ON SCROLL
// ===========================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===========================
// SMOOTH ACTIVE NAV HIGHLIGHT
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = '#f5a623';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));

// ===========================
// STAT COUNTER ANIMATION
// ===========================
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 1500;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const raw = el.dataset.value;
      const suffix = el.dataset.suffix || '';
      if (raw) {
        animateCounter(el, parseFloat(raw), suffix);
        statObserver.unobserve(el);
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.big-num').forEach(el => {
  const text = el.textContent.trim();

  // Parse and tag elements that are pure numbers
  if (text === '72%')  { el.dataset.value = 72;  el.dataset.suffix = '%'; el.textContent = '0%'; }
  if (text === '24%')  { el.dataset.value = 24;  el.dataset.suffix = '%'; el.textContent = '0%'; }
  if (text === '43%')  { el.dataset.value = 43;  el.dataset.suffix = '%'; el.textContent = '0%'; }
  if (text === '6%')   { el.dataset.value = 6;   el.dataset.suffix = '%'; el.textContent = '0%'; }

  if (el.dataset.value) statObserver.observe(el);
});

// ===========================
// MOBILE NAV TOGGLE (optional)
// ===========================
// Uncomment below if you want a hamburger menu on mobile

/*
const menuBtn = document.createElement('button');
menuBtn.textContent = '☰';
menuBtn.style.cssText = `
  display:none;
  background:none;
  border:none;
  color:#f5a623;
  font-size:1.5rem;
  cursor:pointer;
`;
document.querySelector('nav').appendChild(menuBtn);

const navLinksEl = document.querySelector('.nav-links');
menuBtn.addEventListener('click', () => {
  const isOpen = navLinksEl.style.display === 'flex';
  navLinksEl.style.display = isOpen ? 'none' : 'flex';
  navLinksEl.style.flexDirection = 'column';
  navLinksEl.style.position = 'absolute';
  navLinksEl.style.top = '70px';
  navLinksEl.style.left = '0';
  navLinksEl.style.right = '0';
  navLinksEl.style.background = '#080b10';
  navLinksEl.style.padding = '1.5rem 3rem';
  navLinksEl.style.borderBottom = '1px solid #1e2530';
});

if (window.innerWidth <= 768) menuBtn.style.display = 'block';
window.addEventListener('resize', () => {
  menuBtn.style.display = window.innerWidth <= 768 ? 'block' : 'none';
});
*/

