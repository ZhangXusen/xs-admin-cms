import type { EChartsOption } from "echarts";
import * as echarts from "echarts";

// 注册中国地图
import chinaJson from "../data/china.json";
echarts.registerMap("china", chinaJson as any);

export function useEcharts(DomEl: HTMLElement, theme = "light") {
  const chartsInstance = echarts.init(DomEl, theme, { renderer: "svg" });

  const setOptions = (options: EChartsOption) => {
    chartsInstance.setOption(options);
  };
  window.addEventListener("resize", () => {
    chartsInstance.resize();
  });
  return [setOptions];
}
