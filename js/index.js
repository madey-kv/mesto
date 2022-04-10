let page = document.querySelector('.page');

let popup = page.querySelector('.popup');

let openButton = page.querySelector('.button_type_edit');
let closeButton = page.querySelector('.button_type_close');
let saveButton = page.querySelector('.button_type_save');

let formElement = page.querySelector('.form');
let nameInput = formElement.querySelector('.form__item_name');
let jobInput = formElement.querySelector('.form__item_job');

let name = page.querySelector('.profile__name');
let job = page.querySelector('.profile__description');

function popupOpened () {
  popup.classList.add('popup_opened');
  page.style.overflow = "hidden";
  nameInput.value = `${name.textContent}`;
  jobInput.value = `${job.textContent}`;
}

function popupClosed () {
  popup.classList.remove('popup_opened');
  page.style.overflow = "visible";
}

function formSubmitHandler (form) {
  form.preventDefault();
  name.textContent = `${nameInput.value}`;
  job.textContent = `${jobInput.value}`;
  popupClosed();
}

openButton.addEventListener('click', popupOpened); 
closeButton.addEventListener('click', popupClosed); 
saveButton.addEventListener('click', formSubmitHandler); 