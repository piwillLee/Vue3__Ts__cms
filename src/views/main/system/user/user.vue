<template>
  <div class="user">
    <user-search @searchClick="handleSearchClick" @resetClick="handleResetClick"></user-search>
    <user-content ref="contentRef" @newUserBtnClick="handleNewUserClick" @editUserBtnClick="handleEditUserClick" />
    <user-modal ref="modalRef"></user-modal>
  </div>
</template>

<script setup lang="ts" name="user">
import UserSearch from './cpns/user-search.vue'
import UserContent from './cpns/user-content.vue'
import UserModal from './cpns/user-modal.vue'
import { ref } from 'vue'
// 对content组件的操作
const contentRef = ref<InstanceType<typeof UserContent>>()
const handleSearchClick = (searchForm: any) => {
  console.log(searchForm)
  contentRef.value?.fetchUserListData(searchForm)
}
const handleResetClick = () => {
  contentRef.value?.fetchUserListData()
}

const modalRef = ref<InstanceType<typeof UserModal>>()
function handleNewUserClick() {
  modalRef.value?.setModalVisible()
}

function handleEditUserClick(formData) {
  modalRef.value?.setModalVisible(false, formData)
  console.log(formData)
}
</script>

<style scoped>
.user {
  border-radius: 10px;
  overflow: hidden;
  padding: 20px;
}

.content {
  margin-top: 16px;
  background-color: #fff;
}
</style>
