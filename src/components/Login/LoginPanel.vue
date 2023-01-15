<!--
 * new page
 * @author: ZhangXusen
 * @since: 2023-01-08
 * LoginPanel.vue
-->
<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <el-tab-pane label="账号登陆" name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <div class="text">账号登录</div>
            </div>
          </template>
          <PanelAccount ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label
            ><div class="label">
              <el-icon><Iphone /></el-icon>
              <div class="text">手机登录</div>
            </div>
          </template>
          <PanelPhone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="control">
      <el-checkbox v-model="rememberPas" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <div class="login-btn">
      <el-button type="primary" size="large" @click="handleLoginClick"
        >立即登录</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { localCache } from "@/utils/local";
import { ref, watch } from "vue";
import type PanelAccount from "./PanelAccount.vue";

const rememberPas = ref<boolean>(localCache.getCatch("rememberPas") ?? false);
watch(rememberPas, (newVal: boolean) => {
  localCache.setCatch("rememberPas", newVal);
});

const activeName = ref("account");
const accountRef = ref<InstanceType<typeof PanelAccount>>();

const handleLoginClick = () => {
  if (activeName.value === "account") {
    accountRef.value?.loginAction(rememberPas.value);
  } else {
    console.log(2);
  }
};
</script>

<style scoped lang="scss">
.login-panel {
  width: 330px;
  margin-bottom: 15px;
  .label {
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      margin-left: 5px;
    }
  }
  .control {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    margin-top: 10px;
    width: 100%;
    .el-button {
      width: 100%;
    }
  }
}
</style>
