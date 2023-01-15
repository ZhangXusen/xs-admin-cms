<!--
 * new page
 * @author: ZhangXusen
 * @since: 2023-01-10
 * department.vue
-->
<template>
  <div class="department">
    <PageSearch
      :searchConfig="SearchConfig"
      @search-info="handleSearch"
      @resetInfo="handleResetList"
      page-name="category"
    />
    <page-table
      ref="tableRef"
      :TableConfig="tableConfig"
      page-name="category"
      @create-data="handleCreateData"
      @edit-data="handleEditData"
    >
    </page-table>
    <PageModal
      :ModalConfig="ModalConfig"
      createTit="新建商品"
      editTit="编辑商品"
      width="30%"
      page-name="category"
      ref="modalRef"
    />
  </div>
</template>

<script setup lang="ts">
import PageModal from "@/components/Page/PageModal.vue";
import type PageTable from "@/components/Page/PageTable.vue";
import usePage from "@/hooks/usePage";
import { reactive } from "vue";

const ModalConfig = {
  FormItems: [
    {
      type: "input",
      prop: "name",
      label: "商品名称",
      placeholder: "请输入商品名称",
    },
  ],
};
const SearchConfig = {
  FormItems: [
    {
      type: "input",
      prop: "name",
      label: "商品名称",
      placeholder: "请输入查询的商品名称",
    },

    {
      type: "date-picker",
      prop: "createAt",
      label: "创建时间",
      placeholder: "请输入查询的创建时间",
    },
  ],
};
const tableConfig = reactive({
  title: "类别列表",
  btnText: "新建",
  List: [
    { type: "selection", label: "选择", width: "80px" },
    { type: "index", label: "序号", width: "80px" },
    { type: "normal", label: "类别名称", width: "120px", prop: "name" },
    {
      type: "date",
      label: "创建日期",
      prop: "createAt",
    },
    {
      type: "date",
      label: "更新日期",
      prop: "updateAt",
    },
    { type: "operate", label: "操作" },
  ],
});

//搜索-重置
//新建用户-编辑用户
const {
  handleCreateData,
  handleEditData,
  handleResetList,
  handleSearch,
  modalRef,
  tableRef,
} = usePage();
</script>

<style scoped lang="scss"></style>
