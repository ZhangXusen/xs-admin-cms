<!--
 * new page
 * @author: ZhangXusen
 * @since: 2023-01-14
 * echarts.vue
-->
<template>
  <div
    class="chart"
    ref="chartRef"
    :style="{ width: props.width, height: props.height }"
  ></div>
</template>

<script setup lang="ts">
import type { EChartsOption } from "echarts";
import * as echarts from "echarts";
import { onMounted, ref, watchEffect } from "vue";
import { useEcharts } from "../hooks/useEcharts";
// 定义props
const props = withDefaults(
  defineProps<{
    options: EChartsOption;
    width?: string;
    height?: string;
  }>(),
  {
    options: () => ({}),
    width: "100%",
    height: "360px",
  }
);
const chartRef = ref<HTMLElement>();
onMounted(() => {
  const [setOptions] = useEcharts(chartRef.value!);
  watchEffect(() => {
    setOptions(props.options);
  });
});
</script>

<style scoped lang="scss"></style>
