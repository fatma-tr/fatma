// ── NAVBAR: scroll shadow + mobile toggle ──
const nav = document.querySelector('nav');
const hamburger = document.querySelector('.hamburger');
const navUl = document.querySelector('nav ul');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navUl.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navUl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navUl.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// ── ACTIVE NAV LINK (scroll spy) ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul li a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--gold)'
      : '';
  });
});

// ── BACK TO TOP ──
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── CONTACT FORM → WhatsApp ──
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const inputs = this.querySelectorAll('input, textarea');
  const ad      = inputs[0].value.trim();
  const soyad   = inputs[1].value.trim();
  const telefon = inputs[2].value.trim();
  const mesaj   = inputs[3].value.trim();

  const metin = `Merhaba Berkay Oto,\n\nAd Soyad: ${ad} ${soyad}\nTelefon: ${telefon}\n\nMesaj: ${mesaj}`;
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(metin)}`;

  window.open(url, '_blank');
  this.reset();
});

// ── PRODUCT CARD: click to WhatsApp ──
const whatsappNumber = '905319354644'; // <-- numarayı buraya yaz
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => {
    const title = card.querySelector('h3').textContent;
    const msg = encodeURIComponent(`Merhaba, "${title}" hakkında bilgi almak istiyorum.`);
    window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank');
  });
});