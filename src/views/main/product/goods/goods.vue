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
      page-name="goods"
    />
    <page-table
      ref="tableRef"
      :TableConfig="tableConfig"
      page-name="goods"
      @create-data="handleCreateData"
      @edit-data="handleEditData"
    >
      <template #img="scoped">
        <div style="display: flex; align-items: center">
          <el-image
            :preview-src-list="scoped.row.imgUrl"
            :src="scoped.row.imgUrl"
          />
        </div>
      </template>
    </page-table>
    <PageModal
      :ModalConfig="ModalConfigPlus"
      createTit="新建商品"
      editTit="编辑商品"
      width="30%"
      page-name="goods"
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
      label: "商品名称",
      placeholder: "请输入查询的商品名称",
    },
    {
      type: "input",
      prop: "oldPrice",
      label: "原价格",
      placeholder: "根据原价查询",
    },
    {
      type: "input",
      prop: "newPrice",
      label: "原价格",
      placeholder: "根据原价查询",
    },
    {
      type: "input",
      prop: "desc",
      label: "商品描述",
      placeholder: "根据商品描述查询",
    },
    {
      type: "select",
      prop: "status",
      label: "状态",
      placeholder: "根据状态查询",
    },
    {
      type: "input",
      prop: "inventoryCount",
      label: "库存",
      placeholder: "根据库存查询",
    },
    {
      type: "input",
      prop: "saleCount",
      label: "销量",
      placeholder: "根据销量查询",
    },
    {
      type: "input",
      prop: "favorCount",
      label: "收藏",
      placeholder: "根据收藏量查询",
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
  title: "商品列表",
  btnText: "新建商品",
  List: [
    { type: "selection", label: "选择", width: "80px" },
    { type: "index", label: "序号", width: "50px" },
    { type: "normal", label: "商品名称", width: "120px", prop: "name" },
    { type: "normal", label: "原价", width: "80px", prop: "oldPrice" },
    { type: "normal", label: "现价", width: "80px", prop: "newPrice" },
    { type: "normal", label: "描述", width: "120px", prop: "desc" },
    {
      type: "custom",
      label: "图片",
      width: "120px",
      prop: "imgUrl",
      slotName: "img",
    },
    { type: "normal", label: "状态", width: "80px", prop: "status" },
    { type: "normal", label: "销量", width: "80px", prop: "saleCount" },
    { type: "normal", label: "库存", width: "80px", prop: "inventoryCount" },
    { type: "normal", label: "收藏", width: "80px", prop: "inventoryCount" },
    { type: "normal", label: "地址", width: "100px", prop: "address" },
    {
      type: "date",
      label: "创建日期",
      prop: "createAt",
      width: "150px",
    },
    {
      type: "date",
      label: "更新日期",
      prop: "updateAt",
      width: "150px",
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
