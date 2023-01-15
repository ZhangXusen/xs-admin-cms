<!--
 * new page
 * @author: ZhangXusen
 * @since: 2023-01-14
 * echarts.vue
-->
<template>
  <div class="">
    <div class="chart" ref="chartRef"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
const chartRef = ref<HTMLElement>();
onMounted(() => {
  const echartsInstance = echarts.init(chartRef.value!, "light", {
    renderer: "canvas",
  });
  echartsInstance.setOption({});
});
</script>

<style scoped lang="scss"></style>
