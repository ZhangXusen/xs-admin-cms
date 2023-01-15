<!--
 * new page
 * @author: ZhangXusen
 * @since: 2023-01-09
 * HeaderBeard.vue
-->
<template>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      :to="item.path"
      v-for="item in bread"
      :key="item.name"
      >{{ item.name }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLoginStore from "@/stores/login/login";
import { mapPathToBread } from "@/utils/map-menu";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const userMenus = useLoginStore().userMenu;
const bread = computed(() => {
  return mapPathToBread(route.path, userMenus);
});
</script>

<style scoped lang="scss"></style>
