<template>
  <div class="dashboard">
    <!-- 1.顶部数据 -->
    <el-row :gutter="20">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :xs="24" :sm="12" :md="12" :lg="6">
          <count-card v-bind="item" />
        </el-col>
      </template>

    </el-row>

    <!-- 2.中间图表 -->
    <el-row :gutter="20">
      <el-col :sm="24" :md="24" :lg="7">
        <chart-card header='分类商品数量(饼图)'>
          <!-- 基本饼图 -->
          <pie-echart :pieData="showGoodsGategoryCount"></pie-echart>
        </chart-card>
      </el-col>
      <el-col :sm="24" :md="24" :lg="10">
        <chart-card header="不同城市商品销量">
          <map-echart :mapData="showGoodsAddressSale"></map-echart>
        </chart-card>
      </el-col>
      <el-col :md="24" :lg="7">
        <chart-card header='分类商品数量(玫瑰图)'>
          <rose-echart :roseData="showGoodsGategoryCount"></rose-echart>
        </chart-card>
      </el-col>
    </el-row>

    <!-- 3.底部图表 -->
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12">
        <chart-card header='分类商品销量'>
          <line-echart v-bind="showGoodsGategorySale"></line-echart>
        </chart-card>
      </el-col>
      <el-col :sm="24" :lg="12">
        <chart-card header='分类商品的收藏'>
          <bar-echart v-bind="showGoodsGategorySale"></bar-echart>

        </chart-card>
      </el-col>
    </el-row>

  </div>
</template>

<script setup lang="ts" name="dashboard">
import CountCard from './cpns/count-card.vue'
import ChartCard from '@/components/chart-card/chart-card.vue'
import useAnalysisStore from '@/stores/main/analysis/analysis'
import { storeToRefs } from 'pinia';

import { PieEchart, LineEchart, BarEchart, RoseEchart, MapEchart } from '@/components/page-echarts';
import { computed } from '@vue/reactivity';

// 1.发送网络请求获取数据
const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()

// 2.从store获取数据
const { amountList, goodsGategoryCount, goodsCategorySale, goodsAddressSale } = storeToRefs(analysisStore)

// 3.处理数据
const showGoodsGategoryCount = computed(() => {
  return goodsGategoryCount.value.map(item => ({
    name: item.name,
    value: item.goodsCount
  }))
})
const showGoodsGategorySale = computed(() => {
  const labels = goodsCategorySale.value.map(item => item.name)
  const values = goodsCategorySale.value.map(item => item.goodsCount)

  return { labels, values }
})
const showGoodsAddressSale = computed(() => {
  return goodsAddressSale.value.map(item => ({
    name: item.address,
    value: item.count
  }))

})
</script>

<style lang="less" scoped>
.dashboard {
  padding: 20px;

  .el-row {
    // margin-bottom: 10px;

    .el-col {
      margin-bottom: 10px;
    }
  }
}
</style>
