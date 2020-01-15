import Cookies from 'js-cookie'

const AccessTokenExpire = 'access_token_exp'
const RefreshTokenExpire = 'refresh_token_exp'

export function getAccessTokenExp(exp) {
  return Cookies.get(AccessTokenExpire)
}

export function removeAccessTokenExp(exp) {
  return Cookies.remove(AccessTokenExpire)
}

export function getRefreshTokenExp(exp) {
  return Cookies.get(RefreshTokenExpire)
}

export function removeRefreshTokenExp(exp) {
  return Cookies.remove(RefreshTokenExpire)
}
