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
  roseData: IEchartValueType[]
}

const props = defineProps<IProps>()

const option = computed<EChartsOption>(() => {
  return {
    legend: {
      show: true,
      left: '0%',
      top: 'bottom',
      data: props.roseData
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: true },
        // restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Area Mode',
        type: 'pie',
        radius: [20, 140],
        roseType: 'area',
        label: {
          show: false
        },
        itemStyle: {
          borderRadius: 5
        },
        data: props.roseData
      }
    ]
  };
})



</script>

<style lang="less" scoped>
.pie-echart {}
</style>
