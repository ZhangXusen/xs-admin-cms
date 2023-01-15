<!--
 * new page
 * @author: ZhangXusen
 * @since: 2023-01-10
 * userSearch.vue
-->
<template>
  <div class="user-search">
    <el-form ref="formRef" :model="searchForm" label-width="80px" size="large">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input
              placeholder="请输入查询的用户名"
              v-model="searchForm.name"
            ></el-input> </el-form-item
        ></el-col>
        <el-col :span="8"
          ><el-form-item label="真实姓名" prop="realname">
            <el-input
              v-model="searchForm.realname"
              placeholder="请输入真实姓名"
            ></el-input> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item label="电话号码" prop="cellphone">
            <el-input
              v-model="searchForm.cellphone"
              placeholder="请输入手机号码"
            ></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select
              placeholder="请输入状态"
              v-model="searchForm.enable"
              style="width=100%"
            >
              <el-option label="启用" :value="1"></el-option
              ><el-option label="禁用" :value="0"></el-option
            ></el-select> </el-form-item
        ></el-col>
        <el-col :span="8"
          ><el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              unlink-panels
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束日期" /></el-form-item
        ></el-col>
      </el-row>
    </el-form>
    <div class="btns">
      <el-button size="large" icon="Refresh" @click="handleReset()"
        >重置</el-button
      >
      <el-button
        type="primary"
        size="large"
        icon="Search"
        @click="handleSearch()"
        >搜索</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from "element-plus";
import { reactive, ref } from "vue";
const searchForm = reactive({
  name: "",
  realname: "",
  cellphone: "",
  enable: 1,
  createAt: "",
});

//重置表单
const formRef = ref<InstanceType<typeof ElForm>>();
function handleReset() {
  formRef.value?.resetFields();
  emit("resetInfo", searchForm);
}

const emit = defineEmits(["searchInfo", "resetInfo"]);
function handleSearch() {
  emit("searchInfo", searchForm);
}
</script>

<style scoped lang="scss">
.user-search {
  background-color: #fff;
  padding: 10px;
  .el-form-item {
    padding: 10px;
    margin-bottom: 0;
  }
  .btns {
    text-align: right;
    padding: 0 50px 10px 0;
  }
}
</style>
