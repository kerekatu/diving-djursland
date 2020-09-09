export const trimWords = (string, numberOfWords, maxCharacters) => {
  const expString = string.split(/\s+/, numberOfWords)
  const newString = expString.join(' ')

  if (newString.length > maxCharacters) {
    return string.substr(0, maxCharacters) + '...'
  } else if (newString.length >= string.length) {
    return string
  }

  return newString + '...'
}
