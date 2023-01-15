<!--
 * new page
 * @author: ZhangXusen
 * @since: 2023-01-11
 * userModal.vue
-->
<template>
  <div class="modal">
    <el-dialog
      :title="isCreate ? props.createTit : props.editTit"
      :width="props.width ?? '30%'"
      center
      v-model="dialogVisible"
    >
      <el-form :model="formData" :label-width="props.ModalConfig.labelWidth">
        <template v-for="item in props.ModalConfig?.FormItems" :key="item.prop">
          <el-form-item :label="item.label" :prop="item.prop">
            <!-- input -->
            <template v-if="item.type === 'input'">
              <el-input
                v-model="formData[item.prop]"
                :placeholder="item.placeholder"
              ></el-input
            ></template>
            <!-- 日期 -->
            <template v-else-if="item.type === 'date-picker'">
              <el-date-picker
                v-model="formData[item.prop]"
                :placeholder="item.placeholder"
              ></el-date-picker
            ></template>
            <!-- 选择 -->
            <template v-else-if="item.type === 'select'">
              <el-select
                v-model="formData[item.prop]"
                :placeholder="item.placeholder"
                style="width: 100%"
              >
                <template v-for="option in item.options" :key="option.value">
                  <el-option
                    :label="option.label"
                    :value="option.value"
                  ></el-option>
                </template> </el-select
            ></template>
            <!-- 自定义 -->
            <template v-else-if="item.type === 'custom'">
              <slot :name="item.slotName"> </slot>
            </template>
          </el-form-item>
        </template>
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
import useSystemStore from "@/stores/system/system";
import { reactive, ref } from "vue";

interface Props {
  pageName: string;
  createTit: string;
  editTit: string;
  width?: string;
  ModalConfig: {
    FormItems: any;
    labelWidth: string;
  };
  otherInfo: any;
}
const props = defineProps<Props>();

//表单逻辑
const initialForm: any = {};
for (const item of props.ModalConfig.FormItems) {
  initialForm[item.prop] = item.initialValue ?? "";
}
const formData = reactive(initialForm);

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
  let infoData = { ...formData };
  if (props.otherInfo) {
    infoData = { ...formData, ...props.otherInfo };
  }
  if (isCreate.value) {
    systemStore.createPageListDataAction(props.pageName, infoData);
  } else {
    systemStore.updatePageListDataAction(
      props.pageName,
      editData.value.id,
      infoData
    );
  }
}

defineExpose({ changeDialogVisible });
</script>

<style scoped lang="scss"></style>
