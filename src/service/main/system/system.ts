import hyRequest from '@/service'

// 用户的网络请求
export function postUsersListData(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}

/**
 *  删除用户数据
 * @param id 用户id
 */
export function deleteUserById(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`
  })
}

// 新建用户
export function newUserData(userInfo: any) {
  return hyRequest.post({
    url: '/users',
    data: userInfo
  })
}

// 编辑用户
export function updateUserData(id: number, userInfo: any) {
  return hyRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}

/**
 * 页面的网络请求
 */

// 请求页面列表数据
export function postPageListData(pageName: string, queryInfo: any) {
  return hyRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}

// 请求页面删除数据
export function deletePageListById(pageName: string, id: number) {
  return hyRequest.delete({
    url: `/${pageName}/${id}`
  })
}

// 新建页面数据
export function newPageData(pageName: string, userInfo: any) {
  return hyRequest.post({
    url: `/${pageName}`,
    data: userInfo
  })
}

// 编辑页面数据
export function updatePageData(pageName: string, id: number, userInfo: any) {
  return hyRequest.patch({
    url: `/${pageName}/${id}`,
    data: userInfo
  })
}
