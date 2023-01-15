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
      page-name="role"
    />
    <page-table
      ref="tableRef"
      :TableConfig="tableConfig"
      page-name="role"
      @create-data="handleCreateData"
      @edit-data="handleEditData"
    >
    </page-table>
    <PageModal
      :ModalConfig="ModalConfig"
      createTit="新建角色"
      editTit="编辑角色"
      width="30%"
      page-name="role"
      ref="modalRef"
      :otherInfo="otherInfo"
    >
      <template #Menulist>
        <el-tree
          ref="treeRef"
          :data="Menus"
          show-checkbox
          node-key="id"
          :props="{
            children: 'children',
            label: 'name',
          }"
          @check="handleTree"
        /> </template
    ></PageModal>
  </div>
</template>

<script setup lang="ts">
import PageModal from "@/components/Page/PageModal.vue";
import type PageTable from "@/components/Page/PageTable.vue";
import usePage from "@/hooks/usePage";
import useMainStore from "@/stores/main/main";
import { ElTree } from "element-plus";
import { storeToRefs } from "pinia";
import { nextTick, reactive, ref } from "vue";
const mainStore = useMainStore();
const { Menus } = storeToRefs(mainStore);

const ModalConfig = {
  FormItems: [
    {
      type: "input",
      prop: "name",
      label: "角色名称",
      placeholder: "请输入角色名称",
    },
    {
      type: "input",
      prop: "intro",
      label: "角色权限",
      placeholder: "请输入角色权限",
    },
    {
      type: "custom",
      prop: "",
      label: "菜单列表",
      slotName: "Menulist",
    },
  ],
};
const SearchConfig = {
  FormItems: [
    {
      type: "input",
      prop: "name",
      label: "角色名称",
      placeholder: "请输入查询的角色名称",
    },
    {
      type: "input",
      prop: "intro",
      label: "角色权限",
      placeholder: "请输入查询的角色权限",
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
  title: "角色列表",
  btnText: "新建角色",
  List: [
    { type: "selection", label: "选择", width: "80px" },
    { type: "index", label: "序号", width: "80px" },
    { type: "normal", label: "角色名称", width: "100px", prop: "name" },
    { type: "normal", label: "角色权限", width: "120px", prop: "intro" },

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
const otherInfo = ref({});
function handleTree(data1: any, data2: any) {
  const menuList = { ...data2.checkedKeys, ...data2.halfCheckedKeys };
  console.log(menuList);
  otherInfo.value = { menuList };
}
const treeRef = ref<InstanceType<typeof ElTree>>();

function editCallback(itemData: any) {
  nextTick(() => {
    treeRef.value?.setCheckedKeys(getMenuListId(itemData.menuList));
  });
}
function createCallBack() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([]);
  });
}
function getMenuListId(menuList: any[]) {
  const id: number[] = [];
  function recurseGetId(menu: any[]) {
    for (const item of menu) {
      if (item.children) {
        recurseGetId(item.children);
      } else {
        id.push(item.id);
      }
    }
  }
  recurseGetId(menuList);
  return id;
}
//搜索-重置
//新建用户-编辑用户
const {
  handleCreateData,
  handleEditData,
  handleResetList,
  handleSearch,
  modalRef,
  tableRef,
} = usePage(editCallback);
</script>

<style scoped lang="scss"></style>
