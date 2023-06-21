export const convertDuration = (duration) => {
  const hours = Math.trunc(duration / 60);
  const munutes = duration % 60;
  const resultTime = [];

  if (hours) resultTime.push(`${hours}ч`);
  if (munutes) resultTime.push(`${munutes}м`);

  return resultTime.join(' ');
}