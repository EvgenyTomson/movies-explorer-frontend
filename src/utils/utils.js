import {
  emailTester,
  mobileScreenWidth,
  desktopScreenWidth,
  desktopCardsAmount,
  tabletCardsAmount,
  mobileCardsAmount,
 } from '../constants/constants';

export const convertDuration = (duration) => {
  const hours = Math.trunc(duration / 60);
  const munutes = duration % 60;
  const resultTime = [];

  if (hours) resultTime.push(`${hours}ч`);
  if (munutes) resultTime.push(`${munutes}м`);

  return resultTime.join(' ');
}

export const getCardsAmount = () => {
  const screenWidth = window.innerWidth;

  if (screenWidth <= mobileScreenWidth) {
    return mobileCardsAmount;
  } else if (screenWidth <= desktopScreenWidth) {
    return tabletCardsAmount;
  }

  return desktopCardsAmount;
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

// Валидация электронной почты
export const emailValidator = (email) => {
	if (!email)	return false;
	if (email.length>254) return false;
	if (!emailTester.test(email)) return false;
	const parts = email.split("@");
  if (parts.length > 2) return false;
	if (parts[0].length>64)return false;
	const domainParts = parts[1].split(".");
	if (domainParts.some((part) => part.length>63))	return false;

	return true;
}
