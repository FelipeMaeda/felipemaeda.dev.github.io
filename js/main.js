const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const sections = document.querySelectorAll('main section[id]');

function closeMenu() {
  menu.classList.remove('open');
  menuButton.classList.remove('active');
  menuButton.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
  const opened = menu.classList.toggle('open');
  menuButton.classList.toggle('active', opened);
  menuButton.setAttribute('aria-expanded', String(opened));
  document.body.classList.toggle('menu-open', opened);
});

navLinks.forEach(link => link.addEventListener('click', closeMenu));

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 20);
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 150) current = section.id;
  });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
document.getElementById('current-year').textContent = new Date().getFullYear();
