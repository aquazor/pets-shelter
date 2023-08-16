// -------------------- BURGER --------------------
const BODY = document.body;
const BURGER_BTN = document.querySelector('.header__burger-btn');
const HEADER_NAVBAR = document.querySelector('.navbar-header__list');
const HEADER_NAVBAR_LINKS = [...document.querySelectorAll('.navbar-header__item')];
const laptopWidth = 1000;
const timeout = 500;

function addPadding() {
  const lockPadding = window.innerWidth - document.getElementById('wrapper').offsetWidth + 'px';
  BODY.style.paddingRight = lockPadding;
  BODY.setAttribute('block-scroll', '');
}

function removePadding() {
  setTimeout(() => {
    BODY.style.paddingRight = 0;
    BODY.removeAttribute('block-scroll');
  }, timeout);
}

function openMenu() {
  addPadding();
  BURGER_BTN.setAttribute('aria-expanded', 'true');
  HEADER_NAVBAR.setAttribute('data-state', 'opened');
}

function closeMenu() {
  removePadding();
  BURGER_BTN.setAttribute('aria-expanded', 'false');
  HEADER_NAVBAR.setAttribute('data-state', 'closing');

  HEADER_NAVBAR.addEventListener(
    'animationend',
    (event) => {
      if (event.animationName === 'menu-close') {
        HEADER_NAVBAR.setAttribute('data-state', 'closed');
      }
    },
    { once: true }
  );
}

function toggleMenu() {
  const isOpened = BURGER_BTN.getAttribute('aria-expanded') === 'true';

  if (isOpened) {
    closeMenu();
  } else {
    openMenu();
  }
}

BURGER_BTN.addEventListener('click', toggleMenu);

if (window.innerWidth <= laptopWidth) {
  HEADER_NAVBAR.addEventListener('click', closeMenu);

  if (HEADER_NAVBAR_LINKS.length > 0) {
    HEADER_NAVBAR_LINKS.forEach((link) => {
      if (link.classList.contains('link-active')) {
        return;
      }
      link.addEventListener('click', closeMenu);
    });
  }
}
