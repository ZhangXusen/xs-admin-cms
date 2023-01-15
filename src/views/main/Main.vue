<!--
 * new page
 * @author: ZhangXusen
 * @since: 2023-01-08
 * main.vue
-->
<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside :width="isCollapsed ? '60px' : '210px'"
        ><NavMenu :isFold="isCollapsed" />
      </el-aside>
      <el-container>
        <el-header height="60px"
          ><NavHeader @fold-change="handleFoldChange"
        /></el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import NavHeader from "@/components/Layout/Header/NavHeader.vue";
import NavMenu from "@/components/Layout/Sidebar/NavMenu.vue";
import { ref } from "vue";

//处理header的折叠
const isCollapsed = ref(false);
const handleFoldChange = (isFold: boolean) => {
  isCollapsed.value = isFold;
};
</script>

<style scoped lang="scss">
.main {
  height: 100%;
  width: 100%;
  .main-container {
    height: 100%;
    .el-aside {
      background-color: #0c2135;
      overflow-x: hidden;
      overflow-y: hidden;
      line-height: 200px;
      text-align: left;
      cursor: pointer;
      transition: width 0.3s linear;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    .el-header {
    }
    .el-main {
      background-color: rgb(246, 242, 242);
    }
  }
}
</style>
