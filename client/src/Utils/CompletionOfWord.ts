export const completionOfWord = (count: number) => {
  const lastDigit = count % 10;
  const secondToLastDigit = Math.floor(count / 10) % 10;
  if (lastDigit === 1 && secondToLastDigit !== 1)
    return `${count} пользователь`;
  if ([2, 3, 4].includes(lastDigit) && secondToLastDigit !== 1)
    return `${count} пользователя`;
  return `${count} пользователей`;
};
