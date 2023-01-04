<template>
  <div class="line-echart">
    <base-echart :option="option"></base-echart>
  </div>
</template>

<script setup lang="ts">
import BaseEchart from './base-echart.vue';
import type { EChartsOption } from 'echarts';

import { computed } from '@vue/reactivity';



const props = defineProps<{
  labels: string[],
  values: string[],
}>()

const option = computed<EChartsOption>(() => {
  return {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.labels
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.values,
        type: 'line',
        areaStyle: {}
      }
    ]
  }

})


</script>

<style lang="less" scoped>
.line-echart {}
</style>
