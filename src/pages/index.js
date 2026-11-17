import Card from "../components/Card.js";
import "./index.css";
import logoImage from "../images/logo.svg";
import avatarImage from "../images/Avatar.png";
import { initialCards } from "../utils/constants.js";

console.log(initialCards);

const profileEditBtn = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileExitBtn = document.querySelector("#profile-exit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const addNewCardbutton = document.querySelector(".profile__add-button");
const addCardExitBtn = document.querySelector("#add-card-exit-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector(".modal__form");
const previewModal = document.querySelector("#preview-image-modal");
const addCardNameInput = document.querySelector("#add-card-name-input")
const addCardDescriptionInput = document.querySelector("#add-card-description-input");
const profileEditForm = document.querySelector(".modal__form");
const cardListElement = document.querySelector(".cards__list");
const previewImage = document.querySelector(".modal__image");
const previewCaption = document.querySelector(".modal__caption");
const previewExitBtn = document.querySelector("#preview-image-close-button");
const headerLogo = document.querySelector(".header__image");
const profileAvatar = document.querySelector(".profile__image");
headerLogo.src = logoImage;
profileAvatar.src = avatarImage;


const cardTemplate =
document.querySelector("#card-template").content.firstElementChild;

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
}

function setOverlayCloseListeners() {
  const popups = document.querySelectorAll(".modal");
  popups.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
      if (evt.target === popup) {
         closePopup(popup);
      }
    });
  });
}

function handleEscClose(evt) {
  console.log("key pressed:", evt.key);
if (evt.key === "Escape") {
  console.log("key pressed:", evt.key);
  const openedPopup = document.querySelector(".modal_opened");
  if (openedPopup) {
    closePopup(openedPopup);
  }
 }
}

function openPopup(popup) {
 popup.classList.add("modal_opened");
 document.addEventListener("keydown", handleEscClose);
}

function renderCard(cardData) {
  const cardElement = generateCard(cardData);
  cardListElement.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");

  cardImageElement.src = cardData.link;

  cardTitleElement.alt = cardData.name;

  cardTitleElement.textContent = cardData.name;

  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  cardLikeBtn.addEventListener("click", () => {
    console.log("we are attempting to like it")
    cardLikeBtn.classList.toggle("card__like-button_active");
  })

  const cardDeleteBtn  = cardElement.querySelector(".card__delete-button");
  cardDeleteBtn.addEventListener("click", ()=>{
    cardElement.remove()
  })

  cardImageElement.addEventListener("click", ()=>{
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    previewCaption.textContent = cardData.name;
    //set the src for the image element inside the preview modal to be the link of the card
    //set the textContent for the p element inside the preview modal to be the name of the card
    openPopup(previewModal)
  })
  previewExitBtn.addEventListener("click",() =>{
    closePopup(previewModal)
  })


  return cardElement;

  // function handleCardDeleteBtnSubmit(e) {
  //   //cardListElement.append(cardElement);
  //   //delete cardElement
  //   cardElement.remove()
  // }
}



function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  //redo
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const cardData = {
     name: addCardDescriptionInput.value,
     link: addCardDescriptionInput.value
    };
    const card = new Card(cardData, "#card-template", (name, link) => {
      previewImage.src = link;
      previewImage.alt = name;
      previewCaption.textContent = name;

      openPopup(previewModal);
    });
    const cardElement = card.generateCard();

    cardListElement.prepend(cardElement);

    closePopup(addCardModal);
    addCardForm.reset();
}



profileEditBtn.addEventListener("click",  () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  //use the openModal function instead
  openPopup(profileEditModal);
});
profileExitBtn.addEventListener("click", () => {
  closePopup(profileEditModal);
});
profileEditForm.addEventListener("submit", handleProfileEditSubmit)
  closePopup(profileEditModal);



//for loop for the cards

addNewCardbutton.addEventListener("click", () => { openPopup(addCardModal);

});
//addCardModalCloseButton.addEventListener("click", () => closeModal(addCardModal)
//);
addCardExitBtn.addEventListener("click", () => {
  closePopup(addCardModal);
});
addCardForm.addEventListener("submit", handleAddCardFormSubmit)


initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template", (name, link) => {
     previewImage.src = link;
      previewImage.alt = name;
      previewCaption.textContent = name;

      openPopup(previewModal);
  });
   console.log("This the card instance:", card);
  const cardElement = card.generateCard();
  cardListElement.append(cardElement);
});

setOverlayCloseListeners();
previewExitBtn.addEventListener("click", () => {
  closePopup(previewModal);
});
class FormValidator {

  constructor(settings, formElement ) {
    this._inputSelector = settings.inputSelector;
   this._submitButtonSelector = settings.submitButtonSelector;
   this._inactiveButtonClass = settings.inactiveButtonClass;
   this._inputErrorClass = settings.inputErrorClass;
   this._errorClass = settings.errorClass;

   this._form = formElement;
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }
  _setEventListeners() {
     const { inputSelector } = options;
  const inputElement = Array.this.form.querySelectorAll(this._inputSelector);
  formEl.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
  toggleButtonState(inputElement, submitButton, options);

  inputElement.forEach ((inputEl) => {
    inputEl.addEventListener("input", () => {
       console.log(inputEl.validity);
       checkInputValidity(this.formEl,inputEl,options);
       // no errors handling, is input valid or not? no handling
       toggleButtonState(inputElement, submitButton, options);
    });
  });
}

  config() {
this._addEventListener("submit", (e) => {
  e.preventDefault();
});
setEventListeners(formElement, options, submitButton);
};
}
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: ".modal__button_disabled",
  inputErrorClass: ".modal__input_type_error",
  errorClass: ".modal__error_visible",

}
const editFormValidator = new FormValidator(config, profileEditForm);
editFormValidator.enableValidation();
const addFormValidator = new FormValidator(config, addCardForm);
addFormValidator.enableValidation();