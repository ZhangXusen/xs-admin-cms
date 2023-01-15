<!--
 * table
 * @author: ZhangXusen
 * @since: 2023-01-10
 * userTable.vue
-->
<template>
  <div class="container">
    <div class="header">
      <h3 class="title">{{ Prop.TableConfig?.title }}</h3>
      <el-button
        v-if="CreateAble"
        type="primary"
        size="large"
        @click="handleCreate"
        >{{ Prop.TableConfig?.btnText ?? "新建" }}</el-button
      >
    </div>
    <div class="table">
      <el-table
        border
        :data="pageList"
        style="width: 100%"
        v-bind="Prop.TableConfig.childrenProps"
      >
        <template v-for="col in Prop.TableConfig?.List" :key="col.prop">
          <!-- 普通 -->
          <el-table-column
            v-if="col.type === 'normal'"
            :label="col.label"
            :prop="col.prop"
            :width="col.width ?? '120px'"
            align="center"
          ></el-table-column>
          <!-- 日期 -->
          <el-table-column
            v-else-if="col.type === 'date'"
            :label="col.label"
            :prop="col.prop"
            :width="col.width ?? ''"
            align="center"
            ><template #default="scoped">
              {{ formatDate(scoped.row.prop) }}
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column
            v-else-if="col.type === 'operate' && UpdateAble && DeleteAble"
            :label="col.label"
            :prop="col.prop"
            :width="col.width ?? '220px'"
            align="center"
          >
            <template #default="scoped">
              <el-button
                icon="Edit"
                type="primary"
                @click="handleEdit(scoped.row)"
                v-if="UpdateAble"
                >编辑</el-button
              >
              <el-button
                type="danger"
                icon="Delete"
                @click="handleDelete(scoped.row.id)"
                v-if="DeleteAble"
                >删除</el-button
              ></template
            >
          </el-table-column>
          <!-- 自定义 -->
          <el-table-column
            v-else-if="col.type === 'custom'"
            :label="col.label"
            :prop="col.prop"
            :width="col.width ?? '120px'"
            align="center"
          >
            <template #default="scoped">
              <slot :name="col?.slotName" v-bind="scoped"></slot>
            </template>
          </el-table-column>
          <!-- 其他 -->
          <el-table-column
            show-overflow-tooltip
            v-else
            :label="col.label"
            :prop="col.prop"
            :width="col.width ?? '120px'"
            :type="col.type"
            align="center"
          >
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout=" sizes, prev, pager, next, jumper,total"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePermissions } from "@/hooks/usePermissions";
import useLoginStore from "@/stores/login/login";
import useSystemStore from "@/stores/system/system";
import { formatDate } from "@/utils/format";
import { storeToRefs } from "pinia";
import { ref } from "vue";
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
      }
    ];
    childrenProps: {
      rowKey: string;
      treeProps: {
        children: string;
      };
    };
  };
}
const Prop = defineProps<Props>();
const systemStore = useSystemStore();
const currentPage = ref(1);
const pageSize = ref(10);
//获取对应增删改查的权限

const CreateAble = usePermissions(`${Prop.pageName}:create`);
const DeleteAble = usePermissions(`${Prop.pageName}:delete`);
const UpdateAble = usePermissions(`${Prop.pageName}:update`);
const QueryAble = usePermissions(`${Prop.pageName}:query`);
//新建，删除，跟新数据后跳到第一页
systemStore.$onAction(({ name }) => {
  if (
    name === "createUserDataAction" ||
    name === "deletePageListDataAction" ||
    name === "updatePageListDataAction"
  ) {
    currentPage.value = 1;
  }
});
//获取页面数据
function getPageList(searchInfo: any = {}) {
  if (!QueryAble) return; //无查询权限
  const size = pageSize.value;
  const offset = (currentPage.value - 1) * size;
  const pageInfo = { size, offset };
  const queryInfo = { ...pageInfo, ...searchInfo };
  console.log(queryInfo);
  systemStore.postPageListDataAction(Prop.pageName, queryInfo);
}
getPageList();
const { pageList, pageTotalCount } = storeToRefs(systemStore);

const emit = defineEmits(["create-data", "edit-data"]);
function handleEdit(scoped: any) {
  emit("edit-data", scoped);
}
function handleCreate() {
  emit("create-data");
  console.log("handleCreate");
}
function handleDelete(id: number) {
  systemStore.deletePageListDataAction(Prop.pageName, id);
}

// 分页

function handleSizeChange(val: number) {
  getPageList();
}
function handleCurrentChange(val: number) {
  getPageList();
}
defineExpose({
  getPageList,
});
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
    width: 100%;
  }
  .page {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
