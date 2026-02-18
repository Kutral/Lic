const MS_IN_YEAR = 365.2425 * 24 * 60 * 60 * 1000

export const getAgeLastBirthday = (dobIso: string, onDate = new Date()) => {
  const dob = new Date(dobIso)
  let age = onDate.getFullYear() - dob.getFullYear()
  const birthdayPassed =
    onDate.getMonth() > dob.getMonth() ||
    (onDate.getMonth() === dob.getMonth() && onDate.getDate() >= dob.getDate())

  if (!birthdayPassed) age -= 1
  return Math.max(age, 0)
}

export const getAgeNearestBirthday = (dobIso: string, onDate = new Date()) => {
  const dob = new Date(dobIso)
  const exactAge = (onDate.getTime() - dob.getTime()) / MS_IN_YEAR
  return Math.max(Math.round(exactAge), 0)
}
