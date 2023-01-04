<template>
  <div class="pane-account">
    <el-form ref="elFormRef" label-width="60px" :rules="rules" :model="account" status-icon>
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" type="password" placeholder="请输入密码" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { ElForm, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { IAccount } from '@/types'
import useLoginStore from '@/stores/login/login'
import { localCache } from '@/utils/cache'

const loginStore = useLoginStore()

const CACHE_NAME = 'login/name'
const CACHE_PASSWORD = 'login/password'

// 1.定义account数据
const account = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})

// 2.定义校验规则
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,20}$/, message: '必须由6~20个字母或数字组成', trigger: 'change' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,}$/,
      message: '必须输入6位以上的字母或数字组成',
      trigger: 'change'
    }
  ]
})

// 3.执行帐号的登录逻辑
const elFormRef = ref<InstanceType<typeof ElForm>>()
const loginAction = (isRememberPwd: boolean) => {
  // form表单通过验证
  elFormRef.value?.validate((valid) => {
    if (valid) {
      // 1.获取用户输入的帐号和密码
      const name = account.name
      const password = account.password

      // 2.发送网络请求
      loginStore.loginAccountAction({ name, password })

      // 3.判断是否需要记住账号密码
      if (isRememberPwd) {
        localCache.setCache(CACHE_NAME, name)
        localCache.setCache(CACHE_PASSWORD, password)
        localCache.setCache('isRememberPwd', true)
      } else {
        localCache.removeCache(CACHE_NAME)
        localCache.removeCache(CACHE_PASSWORD)
        localCache.removeCache('isRememberPwd')
      }
    } else {
      ElMessage({
        showClose: true,
        message: '请输入正确的账号密码格式',
        type: 'error',
        duration: 1000
      })
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.pane-account {
  width: 100%;
}
</style>
