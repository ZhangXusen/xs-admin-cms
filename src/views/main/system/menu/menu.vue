<!--
 * new page
 * @author: ZhangXusen
 * @since: 2023-01-10
 * department.vue
-->
<template>
  <div class="department">
    <page-table
      ref="tableRef"
      :TableConfig="tableConfig"
      page-name="menu"
      @create-data="handleCreateData"
      @edit-data="handleEditData"
    >
    </page-table>
    <PageModal
      :ModalConfig="ModalConfig"
      createTit="新建商品"
      editTit="编辑商品"
      width="30%"
      page-name="menu"
      ref="modalRef"
    >
    </PageModal>
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
    {
      type: "input",
      prop: "url",
      label: "URL",
      placeholder: "请输入URL",
    },
    {
      type: "input",
      prop: "type",
      label: "级别",
      placeholder: "请输入菜单级别",
    },
  ],
};

const tableConfig = reactive({
  title: "菜单列表",
  btnText: "新建菜单",
  List: [
    {
      label: "菜单名称",
      width: "120px",
      prop: "name",
    },
    { label: "级别", width: "80px", prop: "type" },
    { label: "URL", width: "150px", prop: "url" },
    { label: "图标", width: "150px", prop: "icon" },
    { label: "排序", width: "80px", prop: "sort" },
    { label: "权限", width: "100px", prop: "permission" },

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
  childrenProps: {
    rowKey: "id",
    treeProps: {
      children: "children",
    },
  },
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
