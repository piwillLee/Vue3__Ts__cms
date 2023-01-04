<template>
  <div class="pie-echart">
    <base-echart :option="option"></base-echart>
  </div>
</template>

<script setup lang="ts">
import BaseEchart from './base-echart.vue';
import type { EChartsOption } from 'echarts';
import type { IEchartValueType } from '../types'
import { computed } from '@vue/reactivity';

const props = defineProps<{
  labels: string[],
  values: string[],
}>()


const option = computed<EChartsOption>(() => {
  return {
    xAxis: {
      type: 'category',
      data: props.labels
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.values,
        type: 'bar'
      }
    ]
  };
})



</script>

<style lang="less" scoped>
.pie-echart {}
</style>
