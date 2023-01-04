<template>
  <div class="department">
    <page-search :searchConfig="searchConfig" @search-click="handleSearchClick" @reset-click="handleResetClick" />

    <page-content ref="contentRef" @newUserBtnClick="handleNewPageClick" @editUserBtnClick="handleEditPageClick">
    </page-content>
    <page-modal ref="modalRef"></page-modal>
  </div>
</template>

<script setup lang="ts" name="department">
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content.vue'
import PageModal from '@/components/page-modal.vue'
import { ref } from 'vue'

import searchConfig from './config/search.config'

const contentRef = ref<InstanceType<typeof PageContent>>()

// 点击搜索
function handleSearchClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
}

// 点击重置
function handleResetClick() {
  contentRef.value?.fetchPageListData()
}

const modalRef = ref<InstanceType<typeof PageModal>>()
function handleNewPageClick() {
  modalRef.value?.setModalVisible()
}

function handleEditPageClick(formData) {
  modalRef.value?.setModalVisible(false, formData)
  console.log(formData)
}
</script>

<style scoped>
.department {
  border-radius: 10px;
  overflow: hidden;
  padding: 20px;
}

.content {
  margin-top: 16px;
  background-color: #fff;
}
</style>
