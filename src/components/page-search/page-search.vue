<template>
  <div class="page-search">
    <!-- 1.form -->
    <el-form ref="formRef" label-width="120px" :model="searchForm">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" size="large" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder" />
              </template>

              <template v-if="item.type === 'date-picker'">
                <el-date-picker v-model="searchForm[item.prop]" type="daterange" range-separator="-"
                  start-placeholder="开始时间" end-placeholder="结束时间" />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <!-- 2.重置和搜素按钮 -->
    <div class="btns">
      <el-button icon="Refresh" size="large" @click="handleReset">重置</el-button>
      <el-button icon="Search" size="large" type="primary" @click="handleSearch">查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElForm } from 'element-plus'
import { ref, reactive } from 'vue'

// props接受的属性
interface IProps {
  searchConfig: {
    formItems: any[]
  }
}
const props = defineProps<IProps>()

// 定义自定义事件
const emit = defineEmits(['searchClick', 'resetClick'])

// 定义form 的数据
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const searchForm = reactive(initialForm)

// 重置form
const formRef = ref<InstanceType<typeof ElForm>>()
const handleReset = () => {
  formRef.value?.resetFields()
  emit('resetClick', searchForm)
}

const handleSearch = () => {
  console.log('object')
  emit('searchClick', searchForm)
}
</script>

<style lang="less" scoped>
.page-search {
  background-color: #fff;
  padding: 16px;
}

.btns {
  text-align: right;

  .el-button {
    height: 36px;
  }
}
</style>
