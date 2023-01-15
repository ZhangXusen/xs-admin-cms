<!--
 * table
 * @author: ZhangXusen
 * @since: 2023-01-10
 * userTable.vue
-->
<template>
  <page-table :TableConfig="tableConfig" page-name="department"> </page-table>
</template>

<script setup lang="ts">
import { reactive } from "vue";

interface Props {
  pageName: string;
  TableConfig: {
    title: string;
    btnText: string;
    List: [
      {
        label: string;
        prop: string;
        type: string;
        width?: string;
        slotName?: string;
        parentId?: string;
      }
    ];
  };
}
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
</script>

<style scoped lang="scss"></style>
