<template>
  <div class="user-modal">
    <el-dialog v-model="centerDialogVisible" :title="isNewRef ? '新建用户' : '编辑用户'" width="30%" center>
      <el-form ref="formRef" label-width="120px" :model="formData">
        <el-form-item label="用户名" size="large" prop="name">
          <el-input v-model="formData.name" placeholder="请输入用户名" />
        </el-form-item>

        <el-form-item label="真实姓名" size="large" prop="realname">
          <el-input v-model="formData.realname" placeholder="请输入真实姓名" />
        </el-form-item>

        <el-form-item v-if="isNewRef" label="密码" size="large" prop="password">
          <el-input v-model="formData.password" placeholder="请输入手机号码" show-password />
        </el-form-item>
        <el-form-item label="手机号码" size="large" prop="cellphone">
          <el-input v-model="formData.cellphone" placeholder="请输入手机号码" />
        </el-form-item>

        <el-form-item label="选择角色" size="large" prop="roleId">
          <el-select v-model="formData.roleId" placeholder="请选择角色" style="width: 100%">
            <template v-for="item in entireRoles" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门" size="large" prop="departmentId">
          <el-select v-model="formData.departmentId" placeholder="请选择部门" style="width: 100%">
            <template v-for="item in entireDepartments" :key="item.id">
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

const { entireRoles, entireDepartments } = storeToRefs(mianStore)

const formRef = ref()
const isNewRef = ref(false)
const editData = ref()

const formData = reactive({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
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
    systemStore.updataUserAction(editData.value.id, formData)
  } else {
    // 创建新用户
    systemStore.newUserDataAction(formData)

    formRef.value.resetFields()
  }
}
// 暴露属性和方法
defineExpose({ setModalVisible })
</script>

<style lang="less" scoped>
.user-modal {}
</style>
