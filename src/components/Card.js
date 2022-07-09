export default class Card {
  constructor(item, template, userData, { handleCardClick, handleDeleteClick, handleLikeCard }) {
    this._name = item.name;
    this._link = item.link;
    this._likeList = item.likes;
    this._cardId = item._id;
    this._ownerId = item.owner._id
    this._template = template;
    this._userData = userData
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeCard = handleLikeCard;
    this._isLiked = this._likeList.some((like) => like._id === this._ownerId);
  }

  generate() {
    this._element = this._getElement()

    this._photo = this._element.querySelector('.cards__photo')
    this._photo.src = this._link;
    this._photo.alt = this._name;

    this._title = this._element.querySelector('.cards__title');
    this._title.textContent = this._name;

    this._likeButton = this._element.querySelector('.button_type_like');
    this._deleteButton = this._element.querySelector('.button_type_delete');
    this._openButton = this._element.querySelector('.button_type_card-open');

    this._numOfLikes = this._element.querySelector('.cards__like-number');
    this._numOfLikes.textContent = this._likeList.length;

    this._checkLikes();

    this._hideDeleteButton()

    this._setEventListeners()

    return this._element
  }

  _getElement() {
    const card = document
      .querySelector(this._template)
      .content.querySelector('.cards__item').cloneNode(true);

    return card;
  }

  returnId () {
    return this._cardId
  };

  isLiked() {
    return this._isLiked
  };

  like() {
    this._likeButton.classList.add('button_type_like-active');
    this._isLiked = true
  };

  dislike() {
    this._likeButton.classList.remove('button_type_like-active');
    this._isLiked = false
  };

  setNumOfLikes(item) {
    this._likes = item
    this._numOfLikes.textContent = this._likes.length;
  }

  _checkLikes() {
    if(this._isLiked) {
      this.like()
    } else {
      this.dislike()
    }
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => this._handleDeleteClick(this._cardId))

    this._likeButton.addEventListener('click', (evt) => this._handleLikeCard(evt))

    this._openButton.addEventListener('click', () => {
      this._handleCardClick({ name: this._name, link: this._link })
    })
  }

  _hideDeleteButton() {
    this._userData.then(res => {
      if (res._id !== this._ownerId) {
        this._deleteButton.remove()
      }
    })
  }

  deleteCard() {
    this._delete(this._element)
  }

  _delete(card) {
    card.remove()
    card = null
  }
}
