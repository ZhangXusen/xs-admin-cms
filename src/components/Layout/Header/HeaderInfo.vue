<!--
 * headerinfo
 * @author: ZhangXusen
 * @since: 2023-01-09
 * HeaderInfo.vue
-->
<template>
  <div class="header-info">
    <div class="operation">
      <span
        ><el-icon><Message /></el-icon
      ></span>
      <span
        ><el-icon><ChatDotRound /> </el-icon
      ></span>
      <span
        ><el-icon><Search /> </el-icon
      ></span>
    </div>
    <div class="info">
      <el-dropdown>
        <div class="user-info">
          <el-avatar :size="30" />
          <span>{{ loginStore.userInfo.name }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出系统</el-dropdown-item>

            <el-dropdown-item divided> 个人信息</el-dropdown-item>
            <el-dropdown-item> 修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from "@/stores/login/login";
import { ChatDotRound, Search, Message } from "@element-plus/icons-vue";
const loginStore = useLoginStore();
</script>

<style scoped lang="scss">
.header-info {
  display: flex;
  align-items: center;
  .operation {
    display: inline-flex;
    margin-right: 10px;
    span {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 35px;
    }
  }
  .user-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    span {
      margin-left: 5px;
    }
  }
}
</style>
