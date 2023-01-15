<!--
 * new page
 * @author: ZhangXusen
 * @since: 2023-01-14
 * lineEchaets.vue
-->
<template>
  <div class="line-charts"><BaseEcharts :options="options" /></div>
</template>

<script setup lang="ts">
import type { EChartsOption } from "echarts";
import { computed } from "vue";
import BaseEcharts from "./baseEcharts.vue";
const props = withDefaults(
  defineProps<{
    title?: string;
    Labels: string[];
    values: string[];
  }>(),
  {
    title: "",
  }
);

const options = computed<EChartsOption>(() => ({
  title: {
    text: props.title,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  legend: {},
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: props.Labels,
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
    {
      name: "分别销量",
      type: "line",
      stack: "总量",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      data: props.values,
    },
  ],
}));
</script>

<style scoped lang="scss"></style>
