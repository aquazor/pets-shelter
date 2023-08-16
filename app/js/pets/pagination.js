// -------------------- PAGINATION BLOCK --------------------
const PAGINATION = document.querySelector('.pagination__block');

const getRandomNumber = () => Math.ceil(Math.random() * 8);
const findObjInArrayById = (arr, identifier) => arr.find((item) => item.id === identifier);

const windowWidth = window.innerWidth;
let cardCount;
let pageCount;

if (windowWidth > 1200) {
  cardCount = 8;
  pageCount = 6;
} else if (windowWidth <= 1200 && windowWidth > 768) {
  cardCount = 6;
  pageCount = 8;
} else {
  cardCount = 3;
  pageCount = 16;
}

let id;
let currentSlide = 1;
let pagesArray = [];

function getCardsArray(maxCards) {
  const idArray = [];

  while (idArray.length < maxCards) {
    id = getRandomNumber();
    if (!idArray.includes(id)) {
      idArray.push(id);
    }
  }

  return idArray;
}

function createPagesArray(maxPages) {
  while (pagesArray.length < maxPages) {
    pagesArray.push(getCardsArray(cardCount));
  }
}

function createSlide(arr) {
  PAGINATION.innerHTML = '';
  arr.forEach((id) => {
    const currentPetObject = findObjInArrayById(petsArray, id);
    const card = document.createElement('div');
    card.classList.add('pagination__card', 'card-pagination');
    card.id = id;
    card.innerHTML = `
    <div class="card-pagination__pet-image">
      <img class="card-pagination__pet-img" src="${currentPetObject.img}" alt="pet">
    </div>
    <p class="card-pagination__pet-name">${currentPetObject.name}</p>
    <button type="button" class="card-pagination__btn btn">Learn more</button>`;
    PAGINATION.appendChild(card);
  });
}

createPagesArray(pageCount);
createSlide(pagesArray[0]);

// -------------------- PAGINATION NAVIGATION --------------------
const PAG_BTN_LEFT = document.querySelector('.pagination__btn-left');
const PAG_BTN_RIGHT = document.querySelector('.pagination__btn-right');
const PAG_ACTIVE = document.querySelector('.pagination__active-page');
const PAG_BTN_FIRST_PAGE = document.querySelector('.pagination__btn-first-page');
const PAG_BTN_LAST_PAGE = document.querySelector('.pagination__btn-last-page');

function goToNextPage() {
  currentSlide++;

  if (currentSlide >= pageCount) {
    PAG_BTN_LAST_PAGE.disabled = true;
    PAG_BTN_RIGHT.disabled = true;
  }

  createSlide(pagesArray[currentSlide - 1]);
  PAG_BTN_LEFT.disabled = false;
  PAG_BTN_FIRST_PAGE.disabled = false;
  PAG_ACTIVE.textContent = `${currentSlide}`;
}

function goToPrevPage() {
  currentSlide--;

  if (currentSlide <= 1) {
    PAG_BTN_FIRST_PAGE.disabled = true;
    PAG_BTN_LEFT.disabled = true;
  }

  createSlide(pagesArray[currentSlide - 1]);
  PAG_BTN_RIGHT.disabled = false;
  PAG_BTN_LAST_PAGE.disabled = false;
  PAG_ACTIVE.textContent = `${currentSlide}`;
}

function goToFirstPage() {
  currentSlide = 1;
  createSlide(pagesArray[currentSlide - 1]);

  PAG_BTN_LEFT.disabled = true;
  PAG_BTN_FIRST_PAGE.disabled = true;

  PAG_BTN_RIGHT.disabled = false;
  PAG_BTN_LAST_PAGE.disabled = false;

  PAG_ACTIVE.textContent = `${currentSlide}`;
}

function goToLastPage() {
  currentSlide = pageCount;
  createSlide(pagesArray[currentSlide - 1]);

  PAG_BTN_RIGHT.disabled = true;
  PAG_BTN_LAST_PAGE.disabled = true;

  PAG_BTN_LEFT.disabled = false;
  PAG_BTN_FIRST_PAGE.disabled = false;

  PAG_ACTIVE.textContent = `${currentSlide}`;
}

PAG_BTN_RIGHT.addEventListener('click', goToNextPage);
PAG_BTN_LEFT.addEventListener('click', goToPrevPage);
PAG_BTN_FIRST_PAGE.addEventListener('click', goToFirstPage);
PAG_BTN_LAST_PAGE.addEventListener('click', goToLastPage);
