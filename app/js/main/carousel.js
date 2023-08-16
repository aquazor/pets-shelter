// -------------------- CAROUSEL --------------------
const BTN_LEFT = document.querySelector('.carousel__btn-left');
const BTN_RIGHT = document.querySelector('.carousel__btn-right');

const CAROUSEL = document.querySelector('.carousel__block');
const ITEM_LEFT = document.querySelector('.carousel__item-left');
const ITEM_ACTIVE = document.querySelector('.carousel__item-active');
const ITEM_RIGHT = document.querySelector('.carousel__item-right');

function moveLeft() {
  CAROUSEL.classList.add('transition-left');
  BTN_LEFT.removeEventListener('click', moveLeft);
  BTN_RIGHT.removeEventListener('click', moveRight);
}

function moveRight() {
  CAROUSEL.classList.add('transition-right');
  BTN_LEFT.removeEventListener('click', moveLeft);
  BTN_RIGHT.removeEventListener('click', moveRight);
}

BTN_LEFT.addEventListener('click', moveLeft);
BTN_RIGHT.addEventListener('click', moveRight);

const windowWidth = window.innerWidth;
let cardCount;

if (windowWidth > 1200) {
  cardCount = 3;
} else if (windowWidth <= 1200 && windowWidth > 768) {
  cardCount = 2;
} else {
  cardCount = 1;
}

let id;
let startArray = [];
let newArray = [];

const getRandomNumber = () => Math.ceil(Math.random() * 8);

function createArray(arr, multiplier = 1) {
  while (arr.length < cardCount * multiplier) {
    id = getRandomNumber();
    if (!arr.includes(id)) {
      arr.push(id);
    }
  }
}
createArray(startArray);

const findObjInArrayById = (arr, identifier) => arr.find((item) => item.id === identifier);

function createSlide(arr, slide) {
  arr.forEach((id) => {
    const currentPetObject = findObjInArrayById(petsArray, id);
    const card = document.createElement('div');
    card.classList.add('carousel__card', 'card-carousel');
    card.id = id;
    card.innerHTML = `
    <div class="card-carousel__pet-image">
      <img class="card-carousel__pet-img" src="${currentPetObject.img}" alt="pet">
    </div>
    <p class="card-carousel__pet-name">${currentPetObject.name}</p>
    <button type="button" class="card-carousel__btn btn">Learn more</button>`;
    slide.appendChild(card);
  });
}
createSlide(startArray, ITEM_ACTIVE);

function createNewArray() {
  newArray = [...startArray];
  createArray(newArray, 2);
  newArray.splice(0, cardCount);
}

createNewArray();
createSlide(newArray, ITEM_LEFT);

createNewArray();
createSlide(newArray, ITEM_RIGHT);

CAROUSEL.addEventListener('animationend', (event) => {
  let changingItem;
  const activeItemInner = ITEM_ACTIVE.innerHTML;
  const animationName = event.animationName;

  if (animationName === 'move-left') {
    CAROUSEL.classList.remove('transition-left');
    changingItem = ITEM_LEFT;
    ITEM_RIGHT.innerHTML = activeItemInner;
  } else if (animationName === 'move-right') {
    CAROUSEL.classList.remove('transition-right');
    changingItem = ITEM_RIGHT;
    ITEM_LEFT.innerHTML = activeItemInner;
  }

  ITEM_ACTIVE.innerHTML = changingItem.innerHTML;
  changingItem.innerHTML = '';
  startArray = newArray;
  createNewArray();
  createSlide(newArray, changingItem);

  BTN_LEFT.addEventListener('click', moveLeft);
  BTN_RIGHT.addEventListener('click', moveRight);
});
