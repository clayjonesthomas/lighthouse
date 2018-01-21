export const SIGNUP_EMAIL_CHANGE = 'SIGNUP_EMAIL_CHANGE'
export const SIGNUP_PASSWORD_CHANGE = 'SIGNUP_PASSWORD_CHANGE'


export const emailChange = (value) => {
  return {
    type: SIGNUP_EMAIL_CHANGE,
    value: value
  }
}

export const passwordChange = (value) => {
  return {
    type: SIGNUP_PASSWORD_CHANGE,
    value: value
  }
}
