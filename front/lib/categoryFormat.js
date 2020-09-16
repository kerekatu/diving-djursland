const categoryFormat = (category, t) => {
  const categoryEasy = t('common:category-1')
  const categoryMedium = t('common:category-2')
  const categoryHard = t('common:category-3')

  if (category === 1) {
    return categoryEasy
  } else if (category === 2) {
    return categoryMedium
  } else if (category === 3) {
    return categoryHard
  }
}

export default categoryFormat
