import type PageModal from "@/components/Page/PageModal.vue";
import type PageTable from "@/components/Page/PageTable.vue";
import { ref } from "vue";

export default function usePage(treeCb?: Function) {
  const tableRef = ref<InstanceType<typeof PageTable>>();
  const modalRef = ref<InstanceType<typeof PageModal>>();

  //搜索-重置
  function handleSearch(searchForm: any) {
    tableRef.value?.getPageList(searchForm);
  }
  function handleResetList(searchForm: any) {
    tableRef.value?.getPageList(searchForm);
  }
  //新建用户-编辑用户
  function handleCreateData() {
    modalRef.value?.changeDialogVisible();
  }
  function handleEditData(itemData: any) {
    modalRef.value?.changeDialogVisible(true, itemData);
    if (treeCb) {
      treeCb(itemData);
    }
  }
  return {
    tableRef,
    modalRef,
    handleCreateData,
    handleEditData,
    handleResetList,
    handleSearch,
  };
}
