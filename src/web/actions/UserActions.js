import fetch from 'isomorphic-fetch'
import {MOBILE_USER_AGENT_REGEX_WHOLE, MOBILE_USER_AGENT_REGEX_SUBSTRING}
  from '../constants/constants'

export const IS_USER_MOBILE = "IS_USER_MOBILE"

// this whole paradigm is shitty af but I don't have time for a
// mobile site
export const isUserMobile = () => {
  let isUserMobile = checkUserAgentForMobile()
  return {
    type: IS_USER_MOBILE,
    data: {
      isUserMobile: isUserMobile
    }
  }
}

const checkUserAgentForMobile = () => {
  let check = false;
  (function(a) {
    if(MOBILE_USER_AGENT_REGEX_WHOLE.test(a) ||
      MOBILE_USER_AGENT_REGEX_SUBSTRING.test(a.substr(0,4)))
      check = true;
  })(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}