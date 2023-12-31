import { MESSAGE_MOVIESAPI_GETFILMS_FAIL } from "../constants/constants";

const apiOptions = {
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  }
};

class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Проверяем статус ответа сервера:
  _checkResponseStatus(response, message) {
    return response.ok ? response.json() : Promise.reject(`${response.status}: ${message}`)
  }

  // загрузка карточек с сервера:
  getAllMovies() {
    return fetch(this._baseUrl, {
        method: 'GET',
        headers: this._headers,
      })
        .then(res => {
          return this._checkResponseStatus(res, MESSAGE_MOVIESAPI_GETFILMS_FAIL)
        })
  }
}

export const moviesApi = new MoviesApi(apiOptions);
