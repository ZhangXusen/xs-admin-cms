<!--
 * new page
 * @author: ZhangXusen
 * @since: 2023-01-14
 * pieEcharts.vue
-->
<template>
  <div class="rose-chart">
    <BaseEcharts :options="options" />
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption } from "echarts";
import { computed } from "vue";
import type { EchartValueData } from "../types";
import BaseEcharts from "./baseEcharts.vue";
const props = defineProps<{
  Data: EchartValueData[];
}>();
const options = computed<EChartsOption>(() => ({
  tooltip: {
    trigger: "item",
  },
  // legend: {
  //   left: "center",
  //   top: "bottom",
  //   data: [
  //     "rose1",
  //     "rose2",
  //     "rose3",
  //     "rose4",
  //     "rose5",
  //     "rose6",
  //     "rose7",
  //     "rose8",
  //   ],
  // },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  series: [
    {
      name: "访问来源",
      type: "pie",
      radius: [10, 160],
      center: ["50%", "50%"],
      bottom: "-15%",
      roseType: "area",
      itemStyle: {
        borderRadius: 8,
      },
      label: {
        show: false,
      },
      emphasis: {
        label: {
          show: true,
        },
      },
      data: props.Data,
    },
  ],
}));
</script>

<style scoped lang="scss"></style>
