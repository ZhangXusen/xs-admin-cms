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
      page-name="department"
    />
    <page-table
      ref="tableRef"
      :TableConfig="tableConfig"
      page-name="department"
      @create-data="handleCreateData"
      @edit-data="handleEditData"
    >
    </page-table>
    <PageModal
      :ModalConfig="ModalConfigPlus"
      createTit="新建部门"
      editTit="编辑部门"
      width="30%"
      page-name="department"
      ref="modalRef"
    />
  </div>
</template>

<script setup lang="ts">
import PageModal from "@/components/Page/PageModal.vue";
import type PageTable from "@/components/Page/PageTable.vue";
import usePage from "@/hooks/usePage";
import useMainStore from "@/stores/main/main";
import { computed, reactive, ref } from "vue";

const ModalConfig = {
  FormItems: [
    {
      type: "input",
      prop: "name",
      label: "部门名称",
      placeholder: "请输入部门名称",
    },
    {
      type: "input",
      prop: "leader",
      label: "部门领导",
      placeholder: "请输入领导名称",
    },
    {
      type: "select",
      prop: "parentId",
      label: "上级部门",
      placeholder: "请选择上级部门",
      options: [],
    },
  ],
};
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
const tableConfig = reactive({
  title: "部门列表",
  btnText: "新建部门",
  List: [
    { type: "selection", label: "选择", width: "80px" },
    { type: "index", label: "序号", width: "80px" },
    { type: "normal", label: "部门名称", width: "120px", prop: "name" },
    { type: "normal", label: "部门领导", width: "120px", prop: "leader" },
    { type: "normal", label: "上级部门", width: "120px", prop: "parentId" },

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

const ModalConfigPlus = computed(() => {
  const mainStore = useMainStore();
  const depts = mainStore.Depts.map((item: any) => {
    return { label: item.name, value: item.id };
  });
  ModalConfig.FormItems.forEach((item: any) => {
    if (item.prop === "parentId") {
      item.options.push(...depts);
    }
  });
  console.log(ModalConfig);
  return ModalConfig;
});
</script>

<style scoped lang="scss"></style>
