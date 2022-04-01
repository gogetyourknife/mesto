export class UserInfo {
  constructor({ userNameSelector, userDescrSelector}) {
    this._userNameSelector = userNameSelector;
    this._userDescrSelector = userDescrSelector;
    this._name = document.querySelector(this._userNameSelector);
    this._description = document.querySelector(this._userDescrSelector);
  };

  getUserInfo() {
    const data = {
      name: this._name.textContent,
      info: this._description.textContent
    };
    return data;
  };

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._description.textContent = data.info;
  };
}
