// -------------------- POPUP --------------------
const POPUP = document.querySelector('.popup');

function openPopup() {
  addPadding();
  POPUP.setAttribute('data-state', 'opened');
}

function closePopup() {
  removePadding();
  POPUP.setAttribute('data-state', 'closing');

  POPUP.addEventListener(
    'animationend',
    (event) => {
      const animationName = event.animationName;
      if (animationName === 'popup-close' || animationName === 'popup-bg-fade-out') {
        POPUP.setAttribute('data-state', 'closed');
      }
    },
    { once: true }
  );
}

function createPopup(e) {
  const currentPetCard = e.target.closest('.card-pagination');

  if (currentPetCard) {
    const id = +currentPetCard.id;
    const currentPetObject = findObjInArrayById(petsArray, id);

    POPUP.innerHTML = '';
    POPUP.innerHTML = `
    <div class="popup__wrapper">
      <button type="button" class="small-btn popup__btn-close"></button>
      <div class="popup__pet-image">
        <img src=${currentPetObject.img} width="500" alt="">
      </div>
      <div class="popup__content">
        <div class="popup__titles">
          <h3>${currentPetObject.name}</h3>
          <h4>${currentPetObject.breed}</h4>
        </div>
        <h5>
        ${currentPetObject.description}
        </h5>
        <ul class="popup__list">
          <li><span>Age: </span>${currentPetObject.age}</li>
          <li><span>Inoculations: </span>${currentPetObject.inoculations.join(', ')}</li>
          <li><span>Diseases: </span>${currentPetObject.diseases.join(', ')}</li>
          <li><span>Parasites: </span>${currentPetObject.parasites.join(', ')}</li>
        </ul>
    </div>
  </div>`;
    openPopup();

    document.querySelector('.popup__btn-close').addEventListener('click', closePopup),
      { once: true };
  }
}

PAGINATION.addEventListener('click', createPopup);

POPUP.addEventListener('click', (e) => {
  if (!e.target.closest('.popup__wrapper')) {
    closePopup();
  }
});
