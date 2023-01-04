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

interface IProps {
  pieData: IEchartValueType[]
}

const props = defineProps<IProps>()

const option = computed<EChartsOption>(() => {
  return {
    // 手指放上去显示的文本
    tooltip: {
      trigger: 'item'
    },
    // 图例
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})



</script>

<style lang="less" scoped>
.pie-echart {}
</style>
