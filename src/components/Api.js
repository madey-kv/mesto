export default class Api {
  constructor(item) {
    this._baseUrl = item.baseUrl
    this._headers = item.headers
  }

  _fetch(partUrl, method, body) {
    const fullUrl = `${this._baseUrl}${partUrl}`
    return fetch(fullUrl, {
      method,
      headers: this._headers,
      body: body ? body() : null
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  getUserInfo() {
    return this._fetch('users/me', 'GET')
  }

  getInitialCards() {
    return this._fetch('cards', 'GET')
  }

  editUserInfo(user) {
    const body = () => {
      return JSON.stringify({
        name: user.name,
        about: user.about
      })
    }
    return this._fetch('users/me', 'PATCH', body)
  }

  addNewCard(card) {
    const body = () => {
      return JSON.stringify({
        name: card.name,
        link: card.link
      })
    }
    return this._fetch('cards', 'POST', body)
  }


  deleteCard(cardId) {
    return this._fetch(`cards/${cardId}`, 'DELETE')
  }

  addLike(cardId) {
    return this._fetch(`cards/${cardId}/likes`, 'PUT')
  }

  deleteLike(cardId) {
    return this._fetch(`cards/${cardId}/likes`, 'DELETE')
  }

  editUserAvatar({ avatar }) {
    const body = () => {
      return JSON.stringify({
        avatar: avatar
      })
    }
    return this._fetch('users/me/avatar', 'PATCH', body)
  }
}
