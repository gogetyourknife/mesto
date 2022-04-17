export class UserInfo {
  constructor({ userName, userDescr, userAvatar }) {
    this._name = document.querySelector(userName);
    this._about = document.querySelector(userDescr);
    this._avatar = document.querySelector(userAvatar);
  };

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
    };
  };

  setUserInfo(name, about, avatar) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
  };
}
