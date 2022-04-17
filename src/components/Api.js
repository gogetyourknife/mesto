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

// 1. Загрузка информации о пользователе с сервера. Делаем GET запрос: GET https://nomoreparties.co/v1/cohortId/users/me

// fetch забирает json, затем через data выводит его

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
    method: 'GET',
    headers: this._headers
    })
    .then(this._handleResponse)
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль, если она есть
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
      console.log(err); // выводим ошибку в консоль, если она есть
    });
  }

  // 3. Редактирование профиля

  // экран загрузки

  // _renderLoading(isLoading) {
  //   if(isLoading) {
  //     this._buttonElement.innerText = 'Сохранение...'
  //   }
  // }

  // радактируем профиль

  editProfile(name, about) {
    // this._renderLoading(true); // начинаем грузить данные - показываем загрузку
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
      console.log(err); // выведем ошибку в консоль
    })
    // .finally(() => {
    //   this._renderLoading(false); //при завершении передачи данных, прекращаем отображать загрузку
    // })
  }

  // 4. Добавление новой карточки

  addCard(data) {
    // this._renderLoading(true);
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._handleResponse)
    .catch((err) => {
      console.log(err);
    })
    // .finally(() => {
    //   this._renderLoading(false);
    // })
  }

  // 7. Удаление карточки

  deleteConfirmCard(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}`, {
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

  addLikes(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}/likes`, {
      method: 'PUT', // не post, потому что идет перезапись того, что уже создано: удаляется старая запись, по тому же url делается новая запись
      headers: this._headers,
    })
    .then(this._handleResponse)
    .catch((err) => {
      console.log(err);
    });
  }

  // удаление лайка

  deleteLikes(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}/likes`, {
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
    // this._renderLoading(true);
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
    // .finally(() => {
    //   this._renderLoading(false);
    // })
  };

  returnAllInformation() {
    return Promise.all([this.getInitialCards(), this.getProfileInfo()])
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
