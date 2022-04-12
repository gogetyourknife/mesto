export class UserInfo {
  constructor({ userName, userDescr}) {
    this._name = document.querySelector(userName);
    this._description = document.querySelector(userDescr);
  };

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent
    };
  };

  setUserInfo(name, description) {
    this._name.textContent = name;
    this._description.textContent = description;
  };
}
