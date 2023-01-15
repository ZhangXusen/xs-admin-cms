<!--
 * new page
 * @author: ZhangXusen
 * @since: 2023-01-10
 * userSearch.vue
-->
<template>
  <PageSearch :searchConfig="SearchConfig" />
</template>

<script setup lang="ts">
const SearchConfig = {
  FormItems: [
    {
      type: "input",
      prop: "name",
      label: "部门名称",
      placeholder: "请输入查询的部门名称",
    },
    {
      type: "input",
      prop: "leader",
      label: "部门领导",
      placeholder: "请输入查询的领导名称",
    },
    {
      type: "date-picker",
      prop: "createAt",
      label: "创建时间",
      placeholder: "请输入查询的创建时间",
    },
  ],
};
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
