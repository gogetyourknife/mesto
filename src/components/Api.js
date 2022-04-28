class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

// Так как проверка, прошел запрос или нет, постоянно повторяется, вынесу в отдельную функцию

  _handleResponse(res) {
    if (res.ok) {
      return res.json(); // если запрос ок, возвращаем json
    }
      return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем promise
    }

// 1. Загрузка информации о пользователе с сервера

// fetch забирает json, затем через data выводит его

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
    method: 'GET',
    headers: this._headers
    })
    .then(this._handleResponse)
    .catch((err) => {
      console.log(err);
    });
  }

  // 2. Загрузка карточек с сервера

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._handleResponse)
    .catch((err) => {
      console.log(err);
    });
  }

  // 3. Редактирование профиля

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(this._handleResponse)
    .catch((err) => {
      console.log(err);
    })
  }

  // 4. Добавление новой карточки

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(this._handleResponse)
    .catch((err) => {
      console.log(err);
    })
  }

  // 7. Удаление карточки

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._handleResponse)
    .catch((err) => {
      console.log(err);
    });
  }

   // 8. Постановка и снятие лайка

  // добавление лайка

  addLikes(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT', // не post, потому что идет перезапись того, что уже создано: удаляется старая запись, по тому же url делается новая запись
      headers: this._headers,
    })
    .then(this._handleResponse)
    .catch((err) => {
      console.log(err);
    });
  }

  // удаление лайка

  deleteLikes(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._handleResponse)
    .catch((err) => {
      console.log(err);
    });
  }

  // 9. Обновление аватара пользователя

  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then(this._handleResponse)
    .catch((err) => {
      console.log(err);
    })
  };

}

export const api = new Api (
  {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '4ec700da-cf93-43bb-9955-8aee7ad192a5',
    'Content-Type': 'application/json'
  }
});
