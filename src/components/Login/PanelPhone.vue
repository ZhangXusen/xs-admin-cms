<!--
 * new page
 * @author: ZhangXusen
 * @since: 2023-01-08
 * PanelPhone.vue
-->
<template>
  <el-form :rules="rules" :model="phoneInfo" label-width="68px">
    <el-form-item label="账号" prop="username">
      <el-input v-model="phoneInfo.phoneNumber" />
    </el-form-item>
    <el-form-item label="验证码" prop="captcha">
      <div class="captcha">
        <el-input v-model="phoneInfo.captcha"></el-input>
        <el-button type="primary" @click="btnClick" :disabled="isDisable">{{
          isDisable ? time + " 秒" : "发送验证码"
        }}</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type { FormRules } from "element-plus";
import { reactive, ref, watch } from "vue";
const phoneInfo = reactive({
  phoneNumber: "",
  captcha: "",
});
const rules = reactive<FormRules>({
  phoneInfo: [
    {
      required: true,
      message: "请输入手机号",
    },
    {
      pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
      message: "请输入正确的手机号！",
    },
  ],
});
function btnClick() {
  isDisable.value = true;
}
const time = ref(10);
const isDisable = ref(false);
watch(isDisable, (newVal) => {
  if (isDisable.value) {
    time.value = 10;
    const timeInterval = setInterval(() => {
      time.value--;
      console.log(time.value);
      if (time.value == 0) {
        clearInterval(timeInterval);
        isDisable.value = false;
      }
    }, 1000);
  }
});
</script>

<style scoped lang="scss">
.captcha {
  display: flex;
  align-items: center;
  justify-content: center;
  .el-button {
    margin-left: 20px;
  }
}
</style>
