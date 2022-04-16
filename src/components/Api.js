class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._form = document.querySelector('.popup__form');
    this._buttonElement = this._form.querySelector('.popup__save-button');
  }

// 1. Загрузка информации о пользователе с сервера. Делаем GET запрос: GET https://nomoreparties.co/v1/cohortId/users/me

// fetch забирает json, затем через data выводит его

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
    headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json(); // если запрос ок, возвращаем json
      }
        return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем promise
      })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль, если она есть
    });
  }

  // 2. Загрузка карточек с сервера

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json(); // если запрос ок, возвращаем json
      }
        return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем promise
      })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль, если она есть
    });
  }

  // 3. Редактирование профиля

  // экран загрузки

  _renderLoading(isLoading) {
    if(isLoading) {
      this._buttonElement.innerText = 'Сохранение...'
    }
  }

  // радактируем профиль

  editProfile(name, description) {
    this._renderLoading(true); // начинаем грузить данные - показываем загрузку
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        description
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      this._renderLoading(false); //при завершении передачи данных, прекращаем отображать загрузку
    })
  }

  // 4. Добавление новой карточки

  addCard(name, link) {
    this._renderLoading(true);
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      this._renderLoading(false);
    })
  }

  // 7. Удаление карточки

  deleteConfirmCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    .catch((err) => {
      console.log(err);
    });
  }

   // 8. Постановка и снятие лайка

  // добавление лайка

  addLikes(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT', // не post, потому что идет перезапись того, что уже создано: удаляется старая запись, по тому же url делается новая запись
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    .catch((err) => {
      console.log(err);
    });
  }

  // удаление лайка

  deleteLikes(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    .catch((err) => {
      console.log(err);
    });
  }

  // 9. Обновление аватара пользователя

  updateAvatar(avatar) {
    this._renderLoading(true);
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      this._renderLoading(false);
    })
  }
} // конец API

export const api = new Api (
  {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '4ec700da-cf93-43bb-9955-8aee7ad192a5',
    'Content-Type': 'application/json'
  }
});
