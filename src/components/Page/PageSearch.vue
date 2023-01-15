<!--
 * new page
 * @author: ZhangXusen
 * @since: 2023-01-10
 * userSearch.vue
-->
<template>
  <div class="user-search" v-if="QueryAble">
    <el-form
      ref="formRef"
      :model="searchForm"
      :label-width="props.searchConfig.labelWidth ?? '80px'"
      size="large"
    >
      <el-row :gutter="20">
        <template v-for="item in props.searchConfig.FormItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                ></el-input
              ></template>
              <template v-else-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                ></el-date-picker
              ></template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <el-option
                    v-for="option in item.options"
                    :label="option.label"
                    :value="option.value"
                    :key="option.value"
                  >
                  </el-option> </el-select
              ></template> </el-form-item
          ></el-col>
        </template>
      </el-row>
    </el-form>
    <div class="btns">
      <el-button size="large" icon="Refresh" @click="handleReset()"
        >重置</el-button
      >
      <el-button
        type="primary"
        size="large"
        icon="Search"
        @click="handleSearch()"
        >搜索</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePermissions } from "@/hooks/usePermissions";
import type { ElForm } from "element-plus";
import { reactive, ref } from "vue";
interface FormItems {
  type: string;
  prop: string;
  label: string;
  placeholder?: string;
}
interface Props {
  pageName: string;
  searchConfig: {
    FormItems: any;
    labelWidth?: string;
  };
}
const props = defineProps<Props>();

//判断是否有查询权限
const QueryAble = usePermissions(`${props.pageName}:query`);

const initialForm: any = {};
for (const item of props.searchConfig.FormItems) {
  initialForm[item.prop] = item.initialValue ?? "";
}
const searchForm = reactive(initialForm);

//重置表单
const formRef = ref<InstanceType<typeof ElForm>>();
function handleReset() {
  formRef.value?.resetFields();
  emit("resetInfo", searchForm);
}

const emit = defineEmits(["searchInfo", "resetInfo"]);
function handleSearch() {
  emit("searchInfo", searchForm);
}
</script>

<style scoped lang="scss">
.user-search {
  background-color: #fff;
  padding: 10px;
  .el-form-item {
    padding: 10px;
    margin-bottom: 0;
  }
  .btns {
    text-align: right;
    padding: 0 50px 10px 0;
  }
}
</style>
