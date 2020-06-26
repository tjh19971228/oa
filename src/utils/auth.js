import Cookies from 'js-cookie'

const STOKEN = 'stoken'

export function getToken() {
  return Cookies.get(STOKEN)
}

export function setToken(token) {
  return Cookies.set(STOKEN, token)
}

export function removeToken() {
  return Cookies.remove(STOKEN)
}
