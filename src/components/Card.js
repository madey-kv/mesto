export default class Card {
  constructor(item, template, userData, { handleCardClick, handleDeleteClick, handleLikeCard, handleDislikeCard }) {
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
    this._handleDislikeCard = handleDislikeCard;
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
    this._numOfLikes.textContent = this._likeList.length

    this._checkLikes()

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

  _likeCard(evt) {
    const isLiked = evt.target.classList.contains('button_type_like-active')
    if (!isLiked) {
      this._handleLikeCard(this._cardId)
        .then(res => {
          evt.target.classList.add('button_type_like-active')
          this._numOfLikes.textContent = res.likes.length
        })
        .catch(err => console.log("Не удалось поставить лайк:", err))
    } else {
      this._handleDislikeCard(this._cardId)
        .then(res => {
          evt.target.classList.remove('button_type_like-active')
          this._numOfLikes.textContent = res.likes.length
        })
        .catch(err => console.log(err))
    }
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => this._handleDeleteClick(this._cardId))

    this._likeButton.addEventListener('click', (evt) => this._likeCard(evt))

    this._openButton.addEventListener('click', () => {
      this._handleCardClick({ name: this._name, link: this._link })
    })
  }

  _checkLikes() {
    this._userData.then(res => {
      this._likeList.forEach(item => {
        if (item._id === res._id) {
          this._likeButton.classList.add('button_type_like-active')
        } else {
          this._likeButton.classList.remove('button_type_like-active')
        }
      })
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
