<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="newUserBtnClick">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="80" />
        <el-table-column align="center" type="index" label="序号" width="80" />
        <el-table-column align="center" prop="name" label="用户名" width="180" />
        <el-table-column align="center" prop="realname" label="真实姓名" width="180" />
        <el-table-column align="center" prop="cellphone" label="手机号码" width="180" />
        <el-table-column align="center" prop="enable" label="状态" width="150">
          <template #default="scope">
            <el-button :type="scope.row.enable ? 'success' : 'danger'" plain>
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="编辑" width="180">
          <template #default="scope">
            <el-button class="el-btn" type="primary" icon="Edit" text @click="handleEditUser(scope.row)">编辑</el-button>
            <el-button class="el-btn" type="danger" icon="Delete" text @click="handleDeleteUser(scope.row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper" :total="usersTotalCount"
        @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import userSystemStore from '@/stores/main/system/system'
import { storeToRefs } from 'pinia'

import { formatUTC } from '@/utils/format'
import { ref } from 'vue'

const emit = defineEmits(['newUserBtnClick', 'editUserBtnClick'])

const pageSize = ref(10)
const currentPage = ref(1)

// 1.请求userslist的数据
const systemStore = userSystemStore()
fetchUserListData()

// 2.获取userslist数据，进行展示
const { usersList, usersTotalCount } = storeToRefs(systemStore)

// 3.页码相关逻辑
function handleCurrentChange() {
  fetchUserListData()
}

// 4.定义函数用于发送网络请求
function fetchUserListData(formData: any = []) {
  // 1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  const queryInfo = { ...pageInfo, ...formData }

  // 2.发送网络请求
  systemStore.postUsersListAction(queryInfo)
}

// 5.删除用户
function handleDeleteUser(id: number) {
  systemStore.deleteUserById(id)
}
// 6.编辑用户
function handleEditUser(formData) {
  emit('editUserBtnClick', formData)
}

// 6.新建用户
function newUserBtnClick() {
  emit('newUserBtnClick')
}

defineExpose({ fetchUserListData })
</script>

<style lang="less" scoped>
.content {
  padding: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .table {
    margin-top: 20px;
  }

  .el-btn {
    padding: 4px 8px;
    margin: 0;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;

    padding-top: 16px;
  }
}
</style>
