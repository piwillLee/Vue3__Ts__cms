<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <div class="tabs">
      <el-tabs v-model="activeName" type="border-card" stretch>
        <el-tab-pane label="帐号登录" name="account">
          <template #label>
            <div class="label">
              <el-icon>
                <Avatar />
              </el-icon>
              <span class="text">帐号登录</span>
            </div>
          </template>
          <pane-account ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <div class="label">
              <el-icon>
                <Iphone />
              </el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <pane-phone></pane-phone>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isRememberPwd" label="记住密码" size="large" />
      <el-link :underline="false" type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" size="large" @click="onLoginBtnClick">立即登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { localCache } from '@/utils/cache'
import { ref, watch } from 'vue'
import PaneAccount from './pane-account.vue'
import PanePhone from './pane-phone.vue'

const activeName = ref('account')
const isRememberPwd = ref<boolean>(localCache.getCache('isRememberPwd') ?? false)

watch(isRememberPwd, (newValue) => {
  localCache.setCache('isRememberPwd', newValue)
})

// 获取子组件实例
const accountRef = ref<InstanceType<typeof PaneAccount>>()

//  登录
const onLoginBtnClick = () => {
  if (activeName.value === 'account') {
    // 调用子组件实例上的方法
    accountRef.value!.loginAction(isRememberPwd.value)
  } else {
    console.log('手机登录')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;

  .title {
    margin: 16px 0;
  }

  .tabs {
    width: 100%;

    .label {
      display: flex;
      justify-content: center;
      align-items: center;

      .text {
        margin-left: 5px;
      }
    }
  }

  .controls {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
  }
}
</style>
