<!--
 * new page
 * @author: ZhangXusen
 * @since: 2023-01-08
 * login.vue
-->
<template>
  <div class="login">
    <LoginPanel />
  </div>
</template>

<script setup lang="ts">
import LoginPanel from "@/components/Login/LoginPanel.vue";
</script>

<style scoped lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url("../../assets/images/login-bg.svg");
}
</style>
