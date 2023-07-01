export const convertDuration = (duration) => {
  const hours = Math.trunc(duration / 60);
  const munutes = duration % 60;
  const resultTime = [];

  if (hours) resultTime.push(`${hours}ч`);
  if (munutes) resultTime.push(`${munutes}м`);

  return resultTime.join(' ');
}

export const apiRequestEmulation = (isFail = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isFail) reject(new Error('ошибка api.'));
      resolve("успех");
    }, 500)
  })
}

export const getCardsAmount = () => {
  const screenWidth = window.innerWidth;

  if (screenWidth <= 600) {
    return {totalCards: 5, extraCards: 2};
  } else if (screenWidth <= 900) {
    return {totalCards: 8, extraCards: 2};
  }

  return {totalCards: 12, extraCards: 3};
}

// Фильтрация фильмов
const checkMovieDuration = (movieDuration, isShortsIncluded, shortsDurationCriteria = 40) => {
  return isShortsIncluded || (movieDuration > shortsDurationCriteria);
}

const filterMovieByQuerry = (movie, searchQuerry) => {
  const lowerQuerry = searchQuerry.toLowerCase();

  const isNameRuMatches = movie.nameRU.toLowerCase().includes(lowerQuerry);
  const isNameEnMatches = movie.nameEN.toLowerCase().includes(lowerQuerry);
  const isDescriptionMatches = movie.description.toLowerCase().includes(lowerQuerry);

  return isNameRuMatches || isNameEnMatches || isDescriptionMatches;
}

export const movieFilter = (movie, { querry, includeShorts }) => {
  return checkMovieDuration(movie.duration, includeShorts) && filterMovieByQuerry(movie, querry);
}