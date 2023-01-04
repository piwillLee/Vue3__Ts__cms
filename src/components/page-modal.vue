<template>
  <div class="user-modal">
    <el-dialog v-model="centerDialogVisible" :title="isNewRef ? '新建部门' : '编辑部门'" width="30%" center>
      <el-form ref="formRef" label-width="120px" :model="formData">
        <el-form-item label="部门名称" size="large" prop="name">
          <el-input v-model="formData.name" placeholder="请输入部门名称" />
        </el-form-item>

        <el-form-item label="领导名称" size="large" prop="leader">
          <el-input v-model="formData.leader" placeholder="请输入领导名称" />
        </el-form-item>

        <el-form-item label="上级部门" size="large" prop="parentId">
          <el-select v-model="formData.parentId" placeholder="请选择上级部门" style="width: 100%">
            <template v-for="item in entireRoles" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleComfirmClick"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useMainStore from '@/stores/main/main'
import useSystemStore from '@/stores/main/system/system'
import { storeToRefs } from 'pinia'
// 1.定义内部属性
const centerDialogVisible = ref(false)
const mianStore = useMainStore()
const systemStore = useSystemStore()

const { entireRoles } = storeToRefs(mianStore)

const formRef = ref()
const isNewRef = ref(false)
const editData = ref()

const formData = reactive({
  name: '',
  parentId: '',
  leader: ''
})

// 2.定义设置dialog方法
function setModalVisible(isNew: boolean = true, itemData?: any) {
  centerDialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    // 编辑数据
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    // 新建数据
    for (const key in formData) {
      formData[key] = ''
    }

    editData.value = null
  }
}

// 3.点击确定
function handleComfirmClick() {
  centerDialogVisible.value = false

  if (!isNewRef.value && editData.value) {
    // 编辑用户
    systemStore.updataPageAction('department', editData.value.id, formData)
  } else {
    // 创建新用户
    systemStore.newPageDataAction('department', formData)

    formRef.value.resetFields()
  }
}
// 暴露属性和方法
defineExpose({ setModalVisible })
</script>

<style lang="less" scoped>
// .user-modal {}
</style>
