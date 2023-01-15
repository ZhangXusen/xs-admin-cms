<!--
 * new page
 * @author: ZhangXusen
 * @since: 2023-01-09
 * user.vue
-->
<template>
  <div class="user">
    <div class="search">
      <UserSearch @search-info="handleSearch" @resetInfo="handleResetList" />
    </div>
    <div class="content">
      <UserTable
        ref="contentRef"
        @createUser="handleCreateUser"
        @edit-user="handleEditUser"
      />
    </div>
    <UserModal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import type userModal from "@/components/UerSearch/userModal.vue";
import UserSearch from "@/components/UerSearch/userSearch.vue";
import type userTable from "@/components/UerSearch/userTable.vue";
import { ref } from "vue";

const contentRef = ref<InstanceType<typeof userTable>>();
const modalRef = ref<InstanceType<typeof userModal>>();

function handleSearch(searchForm: any) {
  contentRef.value?.getUserList(searchForm);
}
function handleResetList(searchForm: any) {
  contentRef.value?.getUserList(searchForm);
}
function handleCreateUser() {
  modalRef.value?.changeDialogVisible();
}
function handleEditUser(itemData: any) {
  modalRef.value?.changeDialogVisible(true, itemData);
}
</script>

<style scoped lang="scss"></style>
