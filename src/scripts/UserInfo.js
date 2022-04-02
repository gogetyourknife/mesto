export class UserInfo {
  constructor({ userNameSelector, userDescrSelector}) {
    this._nameSelector = document.querySelector(userNameSelector);
    this._descriptionSelector = document.querySelector(userDescrSelector);
  };

  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      description: this._descriptionSelector.textContent
    };
  };

  setUserInfo(name, description) {
    this._nameSelector.textContent = name;
    this._descriptionSelector.textContent = description;
  };
}
