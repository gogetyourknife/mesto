export class UserInfo {
  constructor({ userName, userDescr, userAvatar }) {
    this._name = document.querySelector(userName);
    this._description = document.querySelector(userDescr);
    this._avatar = document.querySelector(userAvatar);
  };

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent
    };
  };

  setUserInfo(name, description, avatar) {
    this._name.textContent = name;
    this._description.textContent = description;
    this._avatar.src = avatar;
  };
}
