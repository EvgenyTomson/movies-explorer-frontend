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
  _checkResponseStatus(response) {
    return response.ok ? response.json() : response.json().then(err => Promise.reject(err.message));
  }

  signup(userData) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(userData)
    })
      .then(res => {
        return this._checkResponseStatus(res)
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
        return this._checkResponseStatus(res)
      })
  }

  reEnter() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
      .then(res => {
        return this._checkResponseStatus(res)
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
          return this._checkResponseStatus(res)
        })
  }

  logoutUser() {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => {
        return this._checkResponseStatus(res)
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
          return this._checkResponseStatus(res)
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
          return this._checkResponseStatus(res)
        })
  }

  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this._headers
      })
        .then(res => {
          return this._checkResponseStatus(res)
        })
  }
}

export const mainApi = new MainApi(mainApiOptions);