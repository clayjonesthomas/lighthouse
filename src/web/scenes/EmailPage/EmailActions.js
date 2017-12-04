import {SEND_EMAIL_URL} from 'constants/constants'

export const SEND_EMAIL_RETURN = "SEND_EMAIL_RETURN"

export const sendEmailReturn = () => {
  return {
    type: SEND_EMAIL_RETURN
  }
}

 export function sendEmail() {
  let args = {
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify({
      /* TODO email deets */
    })
  }

  return dispatch => {
    return fetch(SEND_EMAIL_URL, args)
      .then(response => response.json())
      .then(() => dispatch(sendEmailReturn()))
  }
 }
