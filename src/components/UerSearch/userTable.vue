<!--
 * table
 * @author: ZhangXusen
 * @since: 2023-01-10
 * userTable.vue
-->
<template>
  <div class="container">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" size="large" @click="HandleCreate()"
        >新建用户</el-button
      >
    </div>
    <div class="table">
      <el-table border :data="usersList" style="width: 100%">
        <el-table-column type="selection" width="50px"></el-table-column>
        <el-table-column
          label="序号"
          type="index"
          width="50px"
        ></el-table-column>

        <el-table-column
          label="用户名"
          prop="name"
          width="120px"
        ></el-table-column>
        <el-table-column
          label="真实姓名"
          prop="realname"
          width="120px"
        ></el-table-column>
        <el-table-column
          label="手机号"
          prop="cellphone"
          width="140px"
        ></el-table-column>
        <el-table-column label="状态" width="80px" prop="enable">
          <template #default="scoped">
            <el-button
              size="small"
              :type="scoped.row.enable === 1 ? 'primary' : 'danger'"
              plain
              >{{ scoped.row.enable === 1 ? "启用" : "禁用" }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createAt" align="center"
          ><template #default="scoped">
            {{ formatDate(scoped.row.createAt) }}
          </template></el-table-column
        >
        <el-table-column label="更新时间" prop="updateAt" align="center"
          ><template #default="scoped">
            {{ formatDate(scoped.row.updateAt) }}
          </template></el-table-column
        >
        <el-table-column label="操作" prop="">
          <template #default="scoped">
            <el-button
              icon="Edit"
              type="primary"
              @click="handleEdit(scoped.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="Delete"
              @click="handleDelete(scoped.row.id)"
              >删除</el-button
            ></template
          >
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout=" sizes, prev, pager, next, jumper,total"
        :total="usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from "@/stores/system/system";
import { storeToRefs } from "pinia";
import { formatDate } from "@/utils/format";
import { ref } from "vue";
const systemStore = useSystemStore();
const currentPage = ref(1);
const pageSize = ref(10);
function getUserList(searchInfo: any = {}) {
  const size = pageSize.value;
  const offset = (currentPage.value - 1) * size;
  const pageInfo = { size, offset };
  const queryInfo = { ...pageInfo, ...searchInfo };
  console.log(queryInfo);
  systemStore.postUserListAction(queryInfo);
}
getUserList();
const { usersList, usersTotalCount } = storeToRefs(systemStore);

function handleSizeChange(val: number) {
  getUserList();
}
function handleCurrentChange(val: number) {
  getUserList();
}

const emit = defineEmits(["createUser", "editUser"]);
function handleEdit(scoped: any) {
  emit("editUser", scoped);
}
function handleDelete(id: number) {
  systemStore.deleteUserListAction(id);
}

//新增用户

function HandleCreate() {
  emit("createUser");
}

defineExpose({ getUserList });
</script>

<style scoped lang="scss">
.container {
  margin-top: 20px;
  padding: 10px;
  background-color: #fff;
  .header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .table {
  }
  .page {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
