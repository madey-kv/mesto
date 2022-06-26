export default class UserInfo {
    constructor({name, job, avatar, id}) {
        this._name = document.querySelector(name);
        this._job = document.querySelector(job);
        this._avatar = document.querySelector(avatar);
        this._id = id;
    }
    getUserInfo() {
        const userInfo = {
            name: this._name.textContent,
            job: this._job.textContent,
            avatar: this._avatar,
            _id: this._id
        }
        return userInfo
    }

    setUserInfo (item) {
        this._name.textContent = item.name;
        this._job.textContent = item.about;
        this._avatar.src = item.avatar;
        this._id = item.id;
    }
}
