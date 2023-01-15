<!--
 * new page
 * @author: ZhangXusen
 * @since: 2023-01-14
 * pieEcharts.vue
-->
<template>
  <div class="pie-echart">
    <BaseEcharts :options="options" />
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption } from "echarts";
import { computed } from "vue";
import BaseEcharts from "./baseEcharts.vue";
const props = defineProps<{
  Data: [];
}>();
const options = computed<EChartsOption>(() => ({
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "horizontal",
    left: "left",
  },
  series: [
    {
      name: "分类数据",
      type: "pie",
      radius: "50%",
      data: props.Data,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
}));
</script>

<style scoped lang="scss"></style>
