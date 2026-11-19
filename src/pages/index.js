import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import logoImage from "../images/logo.svg";
import avatarImage from "../images/Avatar.png";
import { initialCards, validationSettings } from "../utils/constants.js";

// Webpack asset setup
const headerLogo = document.querySelector(".header__image");
const profileAvatar = document.querySelector(".profile__image");
headerLogo.src = logoImage;
profileAvatar.src = avatarImage;

// DOM buttons & form inputs for pre-filling/validation
const profileEditBtn = document.querySelector(".profile__edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");
const profileEditForm = document.querySelector(".modal__form_type_edit");
const addCardForm = document.querySelector("#add-card-modal .modal__form");

// 1. UserInfo instance
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

// 2. Image preview popup
const imagePopup = new PopupWithImage("#preview-image-modal");
imagePopup.setEventListeners();

// 3. Helper function to create a Card element
function createCard(item) {
  const card = new Card(item, "#card-template", (name, link) => {
    imagePopup.open({ name, link});
  });
  return card.generateCard();
}

// 4. Section instance for rendering cards
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);
cardSection.renderItems();

// 5. Edit Profile popup
const editProfilePopup = new PopupWithForm("#profile-edit-modal", (formData) => {
  userInfo.setUserInfo({
    name: formData.title,
    job: formData.description,
  });
  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

// 6. Add Card popup
const addCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
  const newCardElement = createCard({
    name: formData.title || formData.name,
    link: formData.description || fformData.description,
  });
  cardSection.addItem(newCardElement);
  addCardPopup.close();
});
addCardPopup.setEventListeners();

// 7. Form Validators
const editFormValidator = new FormValidator(validationSettings, profileEditForm);
const addFormValidator = new FormValidator(validationSettings, addCardForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// 8. Button Click Listeners
profileEditBtn.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.job;
  editFormValidator.resetValidation();
  editProfilePopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addCardPopup.open();
});