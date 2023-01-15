<!--
 * header
 * @author: ZhangXusen
 * @since: 2023-01-09
 * NavHeader.vue
-->
<template>
  <div class="header">
    <div class="menu-icon" @click="handleMenuIcon">
      <el-icon :size="25">
        <component :is="isFold ? 'Expand' : 'Fold'"></component>
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb"><HeaderBeard /></div>
      <div class="info"><HeaderInfo /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isFold = ref(false);
const emit = defineEmits(["foldChange"]);
const handleMenuIcon = () => {
  isFold.value = !isFold.value;

  // 2.传递给父组件
  emit("foldChange", isFold.value);
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
