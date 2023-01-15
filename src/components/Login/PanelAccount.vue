<!--
 * new page
 * @author: ZhangXusen
 * @since: 2023-01-08
 * PanelAccount.vue
-->
<template>
  <el-form
    ref="formRef"
    :rules="rules"
    :model="loginInfo"
    status-icon
    size="large"
  >
    <el-form-item label="账号" prop="name">
      <el-input v-model="loginInfo.name" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input show-password v-model="loginInfo.password" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import useLoginStore from "@/stores/login/login";
import type { LoginInfo } from "@/types";
import { localCache } from "@/utils/local";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { reactive, ref } from "vue";

const formRef = ref<FormInstance>();
const loginInfo = reactive<LoginInfo>({
  name: localCache.getCatch("name") ?? "",
  password: localCache.getCatch("password") ?? "",
});
const rules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: "请输入账号",
    },
    {
      min: 6,
      max: 16,
      message: "账号长度要在6-16个字符",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
    },
    {
      pattern: /[A-Za-z0-9]{3,10}/, ///^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
      message: "密码要由8-16位的数字字母组成",
    },
  ],
});

//账号登录逻辑
const LoginStore = useLoginStore();
const loginAction = (rememberPas: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      const name = loginInfo.name;
      const password = loginInfo.password;
      LoginStore.loginAction({ name, password }).then((res) => {
        //记住密码
        if (rememberPas) {
          localCache.setCatch("name", name);
          localCache.setCatch("password", password);
        } else {
          localCache.removeCache("name");
          localCache.removeCache("password");
        }
      });
    } else {
      ElMessage.error("请输入正确的格式");
    }
  });
};

defineExpose({ loginAction });
</script>

<style scoped lang="scss"></style>
