/**
 * Created by yangzhanpeng on 2017/12/10.
 */
const userKey = 'userInfo'

export function getUser () {
  try {
    return JSON.parse(localStorage.getItem(userKey))
  } catch (e) {
    return ''
  }
}

export function setUser (userInfo) {
  localStorage.setItem(userKey, JSON.stringify(userInfo))
}

export function removeUser () {
  localStorage.removeItem(userKey)
}
