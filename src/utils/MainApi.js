const mainApiOptions = {
  // baseUrl: 'https://auth.nomoreparties.co',
  baseUrl: 'http://localhost:3000',
  // baseUrl: 'https://api.tomson.students.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json',
  }
};

class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Проверяем статус ответа сервера:
  _checkResponseStatus(response, method) {

    // return response.ok ? response.json() : Promise.reject(`Ошибка в ${method}: ${response.status}`)
    // return response.ok ? response.json() : Promise.reject(`Ошибка в ${method}: ${response.json()}`)

    return response.ok ? response.json() : response.json().then(err => Promise.reject(err.message));
  }

  signup(userData) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(userData)
    })
      .then(res => {
        return this._checkResponseStatus(res, 'signup')
      })
  }

  signin(userData) {
    console.log('signin userData: ', userData);

    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(userData)
    })
      .then(res => {
        return this._checkResponseStatus(res, 'signin')
      })
  }

  reEnter() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
      .then(res => {
        return this._checkResponseStatus(res, 'reEnter')
      })
  }

  editUserData(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify(userData)
      })
        .then(res => {
          return this._checkResponseStatus(res, 'editUserData')
        })
  }

  logoutUser() {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => {
        return this._checkResponseStatus(res, 'logoutUser')
      })
  }

  // Фильмы
  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
        method: 'GET',
        credentials: 'include',
        headers: this._headers
      })
        .then(res => {
          return this._checkResponseStatus(res, 'getSavedMovies')
        })
  }

  saveMovie(movieData) {
    return fetch(`${this._baseUrl}/movies`, {
        method: 'POST',
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify(movieData)
      })
        .then(res => {
          return this._checkResponseStatus(res, 'saveMovie')
        })
  }

  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this._headers
      })
        .then(res => {
          return this._checkResponseStatus(res, 'deleteCard')
        })
  }
}

export const mainApi = new MainApi(mainApiOptions);