<!--
 * new page
 * @author: ZhangXusen
 * @since: 2023-01-14
 * numberData.vue
-->
<template>
  <div class="number-data">
    <div class="title">
      <span>{{ props.title }}</span>
      <el-tooltip :content="props.tips" placement="top">
        <el-icon><Warning /></el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <span class="number" ref="count1Ref">{{ props.number1 }}</span>
    </div>
    <div class="footer">
      <span>{{ props.subtitle }}</span>
      <span ref="count2Ref">{{ props.number2 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Warning } from "@element-plus/icons-vue";
import { CountUp } from "countup.js";
import { onMounted, ref } from "vue";
interface Props {
  title: string;
  subtitle: string;
  tips: string;
  number1: number;
  number2: number;
  amount?: string;
}

const props = withDefaults(defineProps<Props>(), {});
const count1Ref = ref<HTMLElement>();
const count2Ref = ref<HTMLElement>();
const countOption = {
  prefix: props.amount === "saleroom" ? "￥" : "",
};
onMounted(() => {
  const countup1 = new CountUp(count1Ref.value!, props.number1, countOption);
  const countup2 = new CountUp(count2Ref.value!, props.number2, countOption);

  countup1.start();
  countup2.start();
});
</script>

<style scoped lang="scss">
.number-data {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 20px;
  height: 130px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  .title {
    width: 100%;
    display: flex;
    height: 38px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    align-items: center;
    justify-content: space-between;
  }
  .content {
    width: 100%;

    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 0px;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
  }
  .footer {
    width: 100%;

    display: flex;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 0.85);
    border-top: 1px solid #f0f0f0;
  }
}
</style>
