<template>
  <div class="user-search">
    <!-- 1.form -->
    <el-form ref="formRef" label-width="120px" :model="searchForm">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" size="large" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入用户名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" size="large" prop="realname">
            <el-input v-model="searchForm.realname" placeholder="请输入真实姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" size="large" prop="cellphone">
            <el-input v-model="searchForm.cellphone" placeholder="请输入手机号码" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" size="large" prop="enable">
            <el-select v-model="searchForm.enable" placeholder="请选择状态" style="width: 100%">
              <el-option label="启用" value="1" />
              <el-option label="禁用" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" size="large" prop="createAt ">
            <el-date-picker v-model="searchForm.createAt" type="daterange" range-separator="-" start-placeholder="开始时间"
              end-placeholder="结束时间" />
          </el-form-item>
        </el-col>
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

// 定义自定义事件
const emit = defineEmits(['searchClick', 'resetClick'])

const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: '',
  createAt: ''
})

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
.user-search {
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
