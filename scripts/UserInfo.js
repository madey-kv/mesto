export default class UserInfo {
  constructor({ name, job, avatar }) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(job);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent,
    }
    return userInfo
  }

  setUserInfo(item) {
    this._name.textContent = item.name
    this._about.textContent = item.about
  }

  setAvatar(item) {
    this._avatar.src = item.avatar
  }
}
