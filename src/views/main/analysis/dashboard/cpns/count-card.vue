<template>
  <div class="count-card">
    <div class="header">
      <span class="title">{{ title }}</span>

      <el-tooltip :content="tips" placement="top" effect="light">
        <el-icon>
          <Warning />
        </el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <span class="count" ref="countupRef1">{{ number1 }}</span>
    </div>
    <div class="footer">
      <span>{{ subtitle }}</span>
      <span ref="countupRef2">{{ number2 }}</span>
    </div>

  </div>
</template>

<script setup lang="ts">
import { CountUp } from 'countup.js';
import { onMounted, ref } from 'vue';

interface IProps {
  amount?: string,
  title?: string
  tips?: string
  number1?: number
  number2?: number
  subtitle?: string
}

const props = withDefaults(defineProps<IProps>(), {
  amount: 'inventory',
  title: '商品总销量',
  tips: '所有的商品总销量',
  number1: 50000,
  number2: 50000,
  subtitle: '商品总销量'
})

const countupRef1 = ref<HTMLElement>()
const countupRef2 = ref<HTMLElement>()
const countOptions = {
  prefix: props.amount === 'saleroom' ? '￥' : ''
}
// 数字增长动画
onMounted(() => {
  const countup1 = new CountUp(countupRef1.value!, props.number1, countOptions);
  const countup2 = new CountUp(countupRef2.value!, props.number2, countOptions);
  countup1.start()
  countup2.start()
})


</script>

<style lang="less" scoped>
.count-card {
  background-color: #fff;
  padding: 16px;
  border-radius: 6px;
  font-size: 12px;
  // width: 100%;

  .header {
    display: flex;
    justify-content: space-between;
    color: #8a8a8a;
  }

  .content {
    font-size: 24px;
    font-weight: 500;
    margin: 16px 0;
  }


  .footer {
    border-top: 1px solid var(--el-border-color);
    padding-top: 16px;
    display: flex;
    gap: 10px;
  }
}
</style>
