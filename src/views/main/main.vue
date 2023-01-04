<template>
  <div class="main">
    <el-container>
      <el-aside :width="isCollapse ? '60px' : '200px'">
        <main-aside :isFold="isCollapse" />
      </el-aside>
      <el-container>
        <el-header>
          <main-header @fold-change="handleFoldChange" />
        </el-header>
        <el-main>
          <el-scrollbar height="100%">
            <router-view></router-view>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainAside from './main-cpns/main-aside/main-aside.vue'
import MainHeader from './main-cpns/main-header/main-header.vue'
import { ref } from 'vue'

const isCollapse = ref(false)
const handleFoldChange = (isFold: boolean) => {
  isCollapse.value = isFold
}
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;

  .el-container {
    width: 100%;
    height: 100%;

    .el-aside {
      transition: width 0.3s ease;

      overflow-y: auto;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .el-header {
      padding: 10px;
      height: 50px;
      display: flex;
      align-items: center;
    }

    .el-main {
      background-color: #f5f5f5;
      padding: 0;
    }
  }
}
</style>
