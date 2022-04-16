let page = document.querySelector('.page');

let openButton = page.querySelector('.button_type_edit');
let closeButton = page.querySelector('.button_type_close');

let popup = page.querySelector('.popup');
let formElement = page.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__item_type_name');
let jobInput = formElement.querySelector('.popup__item_type_job');

let name = page.querySelector('.profile__name');
let job = page.querySelector('.profile__description');

function popupOpened () {
  popup.classList.add('popup_opened');
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}

function popupClosed () {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (event) {
  event.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  popupClosed();
}

openButton.addEventListener('click', popupOpened); 
closeButton.addEventListener('click', popupClosed); 
formElement.addEventListener('submit', formSubmitHandler);