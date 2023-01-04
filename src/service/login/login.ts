import type { IAccount } from '@/types'
import hyRequest from '..'

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: 'login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`

    // headers: {
    //   Authorization:'Bearer ' + 'token' // 在拦截器中携带
    // }
  })
}

export function getUserMenuByRoleId(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
