<!--
 * new page
 * @author: ZhangXusen
 * @since: 2023-01-11
 * userModal.vue
-->
<template>
  <div class="modal">
    <el-dialog title="新增用户" width="30%" center v-model="dialogVisible">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="formData.realname"></el-input>
        </el-form-item>
        <el-form-item v-if="isCreate" label="密码" prop="password">
          <el-input v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="cellphone">
          <el-input v-model="formData.cellphone"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="departmenId">
          <el-select
            placeholder="请输入部门"
            v-model="formData.departmentId"
            style="width: 100%"
          >
            <template v-for="item in deptsData" :key="item.id">
              <el-option :label="item.name" :value="item.id"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="用户角色" prop="roleId">
          <el-select
            placeholder="请输入角色"
            v-model="formData.roleId"
            style="width: 100%"
          >
            <template v-for="item in rolesData" :key="item.id">
              <el-option :label="item.name" :value="item.id"></el-option>
            </template>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelDialog">取消</el-button>
          <el-button @click="confirmDialog" type="primary">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useMainStore from "@/stores/main/main";
import useSystemStore from "@/stores/system/system";
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";
//表单逻辑
const formData = reactive<any>({
  name: "",
  realname: "",
  password: "",
  cellphone: "",
  departmentId: "",
  roleId: "",
});
const mainStore = useMainStore();
const rolesData = storeToRefs(mainStore).Roles;
const deptsData = storeToRefs(mainStore).Depts;
//改变显示状态
const dialogVisible = ref(false);
const isCreate = ref(false);
const editData = ref();
function changeDialogVisible(isEdit: boolean = false, itemData?: any) {
  dialogVisible.value = !dialogVisible.value;
  isCreate.value = !isEdit;
  //编辑弹窗
  if (isEdit && itemData) {
    for (const key in formData) {
      formData[key] = itemData[key];
    }
    editData.value = itemData;
  } else {
    //新增用户
    for (const key in formData) {
      formData[key] = "";
    }
    editData.value = null;
  }
}

function cancelDialog() {
  changeDialogVisible();
}
const systemStore = useSystemStore();
function confirmDialog() {
  dialogVisible.value = !dialogVisible.value;
  if (isCreate.value) {
    systemStore.createUserDataAction(formData);
  } else {
    systemStore.updateUserDataAction(editData.value.id, formData);
  }
}

defineExpose({ changeDialogVisible });
</script>

<style scoped lang="scss"></style>
