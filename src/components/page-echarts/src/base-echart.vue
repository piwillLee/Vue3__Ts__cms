<template>
  <div class="base-echart">
    <!-- echart 必须要设置宽高 -->
    <div class="echart" ref="echartRef"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref, watchEffect } from 'vue';
import type { EChartsOption } from 'echarts';
import ChinaJSON from '../data/china.json';

// 注册地图
echarts.registerMap('china', ChinaJSON as any)

interface IProps {
  option: EChartsOption
}

const props = defineProps<IProps>()

const echartRef = ref<HTMLElement>()
onMounted(() => {
  // 1.DOM 加载完成后，初始化echarts实例
  const echartInstance = echarts.init(echartRef.value!, 'light', { renderer: 'canvas' })

  // 2.第一次进行setOption
  // watchEffect监听option变化，重新执行
  watchEffect(() => echartInstance.setOption(props.option))

  // 3.监听window缩放
  window.addEventListener("resize", () => {
    echartInstance.resize()
  })
})
</script>

<style lang="less" scoped>
.echart {
  background-color: #fff;
  height: 300px;
}
</style>
