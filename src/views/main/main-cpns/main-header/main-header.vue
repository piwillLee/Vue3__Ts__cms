<template>
  <div class="main-header">
    <div class="menu-icon" @click="onMenuIconClick">
      <el-icon size="32px">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb">
        <header-crumb></header-crumb>
      </div>
      <div class="info">
        <div class="message">
          <el-icon class="info-icon" size="large">
            <Message />
          </el-icon>
          <el-icon class="info-icon" size="large">
            <Star />
          </el-icon>
          <el-icon class="info-icon" size="large">
            <Search />
          </el-icon>
        </div>
        <el-dropdown :hide-on-click="false">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="onExitClick">
                <el-icon>
                  <CircleClose></CircleClose>
                </el-icon>
                <span>退出登录</span>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <el-icon>
                  <InfoFilled></InfoFilled>
                </el-icon>
                <span>个人信息</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-icon>
                  <Unlock />
                </el-icon>
                <span>修改密码</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span class="user">{{ userLogin.userInfo.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderCrumb from './header-cpns/header-crumb.vue'
import { ref } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'
import useLoginStore from '@/stores/login/login'

// 内部自定义事件
const emit = defineEmits(['foldChange'])

const userLogin = useLoginStore()

const isFold = ref(false)

const onMenuIconClick = () => {
  // 1.改变内部的值
  isFold.value = !isFold.value

  // 2.将事件和值传递给父组件
  emit('foldChange', isFold.value)
}

// 退出登录
const onExitClick = () => {
  localCache.removeCache(LOGIN_TOKEN)

  router.push('/login')
}
</script>

<style lang="less" scoped>
.main-header {
  width: 100%;
  display: flex;
  // justify-content: space-between;
  align-items: center;

  .menu-icon {
    margin-right: 10px;
  }

  .content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .info {
      display: flex;
      align-items: center;

      :global(.el-dropdown-menu__item) {
        line-height: 36px !important;
        padding: 6px 22px;
      }

      .message {
        display: flex;
        margin-right: 5px;

        .info-icon {
          width: 40px;
          height: 40px;
        }

        .info-icon:hover {
          background-color: rgb(240, 240, 240);
          cursor: pointer;
        }
      }

      .user {
        font-size: 16px;
        line-height: 40px;
        color: #363636;
        margin-left: 10px;
      }
    }
  }
}
</style>
