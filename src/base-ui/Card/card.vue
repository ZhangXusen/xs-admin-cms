<!--
 * new page
 * @author: ZhangXusen
 * @since: 2023-01-14
 * card.vue
-->
<template>
  <el-card class="box-card" :header="props.title">
    <div class="item">
      <slot></slot>
    </div>
  </el-card>
</template>

<script setup lang="ts">
interface Props {
  title: string;
}
const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.box-card {
  &:deep(.el-card__header) {
    padding: 10px 20px !important;
  }
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
}
.item {
  margin-bottom: 10px;
  // border: 1px solid red;
}
</style>
