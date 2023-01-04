<template>
  <div class="main-aside">
    <div class="logo">
      <img src="@/assets/img/B端后台管理图标.png" alt="" />
      <h2 v-show="!isFold" class="title">后台管理系统</h2>
    </div>
    <div class="menu">
      <el-menu :default-active="defaultActive" :collapse="isFold" text-color="#b7bdc3" active-text-color="#fff"
        background-color="#001529">
        <!-- 遍历菜单 -->

        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <!-- 字符串：el-icon-moitor => 组件 component 动态组件 -->
                <component :is="item.icon.split('-icon-')[1]"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="handleItemClick(subitem)">{{ subitem.name }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/stores/login/login'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

import { mapPathToMenu } from '@/utils/map-menus'
import { computed, ref } from 'vue'

defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

// 1.获取动态菜单
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

// 2.监听item的点击
const router = useRouter()
function handleItemClick(item: any) {
  const url = item.url
  router.push(url)
}

// 3.ElMenu的默认菜单
const route = useRoute()
const pathMenu = mapPathToMenu(route.path, userMenus)
const defaultActive = ref(pathMenu.id + '')

</script>

<style lang="less" scoped>
.main-aside {
  color: #fff;
  background-color: #001529;
  height: 100%;

  .logo {
    display: flex;
    align-items: center;
    padding: 10px 12px;

    img {
      width: 40px;
      margin-right: 16px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
      white-space: nowrap;
    }
  }

  .el-menu {
    user-select: none;
    border-right: none;
  }

  .el-sub-menu {
    .el-menu-item {
      color: #fff;
      background-color: #0c2135;
    }

    .el-menu-item:hover {
      color: rgb(255, 255, 255);
      background-color: #0a61bd69;
    }

    .el-menu-item.is-active {
      background-color: #0a60bd;
    }
  }
}
</style>
