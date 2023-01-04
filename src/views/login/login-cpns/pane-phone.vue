<template>
  <div class="pane-phone">
    <el-form label-width="80px" :rules="rules" :model="account" status-icon>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="account.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="验证码" prop="verifyCode">
        <div class="verify-code">
          <el-input v-model="account.verifyCode" placeholder="验证码" />
          <el-button type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { ElForm, FormRules } from 'element-plus'

// 1.定义account数据
const account = reactive({
  phone: '',
  verifyCode: ''
})
// 2.定义校验规则

const rules = reactive<FormRules>({
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { min: 11, max: 11, message: '请输入11位手机号', trigger: 'change' }
  ],
  verifyCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    {
      min: 6,
      max: 6,
      message: '请输入6位验证码',
      trigger: 'change'
    }
  ]
})
</script>

<style lang="less" scoped>
.pane-phone {
  width: 100%;
}

.verify-code {
  display: flex;

  .el-button {
    margin-left: 5px;
  }
}
</style>
