import {
  deleteUserById,
  postUsersListData,
  newUserData,
  updateUserData,
  postPageListData,
  deletePageListById,
  newPageData,
  updatePageData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './types'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const usersListRes = await postUsersListData(queryInfo)
      const { totalCount, list } = usersListRes.data
      this.usersTotalCount = totalCount
      this.usersList = list
    },

    async deleteUserById(id: number) {
      // 1.删除user数据
      const deleteRes = await deleteUserById(id)
      console.log(deleteRes)

      // 2.重新发送网络请求
      this.postUsersListAction({ offset: 0, size: 10 })
    },

    async newUserDataAction(userInfo: any) {
      // 1.新建用户
      const newResult = await newUserData(userInfo)
      console.log(newResult)

      // 2.重新发送网络请求
      this.postUsersListAction({ offset: 0, size: 10 })
    },

    async updataUserAction(id: number, userInfo: any) {
      // 1.更新用户数据
      const updataRes = await updateUserData(id, userInfo)
      console.log(updataRes)

      // 2.重新发送网络请求
      this.postUsersListAction({ offset: 0, size: 10 })
    },

    /**
     * 针对页面的数据：增删改查
     */
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListRes = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListRes.data

      this.pageList = list
      this.pageTotalCount = totalCount
    },

    /**
     * 删除页面数据
     * @param pageName 页面名称
     * @param id 页面数据id
     */
    async deletePageListByIdAction(pageName: string, id: number) {
      // 1.删除用户
      const deletePageListRes = await deletePageListById(pageName, id)
      console.log(deletePageListRes)

      // 2.重新获取网络请求
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },

    /**
     *  新建页面数据
     * @param pageName 页面名称
     * @param pageInfo 新建数据
     */
    async newPageDataAction(pageName: string, pageInfo: any) {
      // 1.新建页面数据
      const newResult = await newPageData(pageName, pageInfo)
      console.log(newResult)

      // 2.重新获取网络请求
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },

    /**
     *  更新页面数据
     * @param pageName 页面名称
     * @param id 数据id
     * @param pageInfo 编辑数据
     */
    async updataPageAction(pageName: string, id: number, pageInfo: any) {
      // 1.更新页面数据
      const updataRes = await updatePageData(pageName, id, pageInfo)
      console.log(updataRes)

      // 2.重新获取网络请求
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    }
  }
})

export default useSystemStore
