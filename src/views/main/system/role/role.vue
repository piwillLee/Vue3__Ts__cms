<template>
  <div class="role">
    <page-search :searchConfig="searchConfig"></page-search>
  </div>
</template>

<script setup lang="ts" name="role">
import PageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'
</script>

<style scoped>
.role {
  padding: 20px;
}
</style>
