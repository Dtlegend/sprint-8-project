export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._handleImageClick = handleImageClick;
    this._data = data;
    this._cardSelector = cardSelector;
    this._link = data.link;
  }

  generateCard() {
    const cardElement = document.querySelector(this._cardSelector).content.firstElementChild.cloneNode(true);
    const cardImageElement = cardElement.querySelector(".card__image");
    const cardTitleElement = cardElement.querySelector(".card__title");
    cardImageElement.src = this._data.link;
    cardImageElement.alt = this._data.name;
    cardTitleElement.textContent = this._data.name;
    cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this._data.name, this._link);
    });
    const cardLikeBtn = cardElement.querySelector(".card__like-button");
    const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

    cardLikeBtn.addEventListener("click", () => {
      cardLikeBtn.classList.toggle("card__like-button_active");
    });

    cardDeleteBtn.addEventListener("click", () => {
      cardElement.remove();
    });
    return cardElement;
  }
}











