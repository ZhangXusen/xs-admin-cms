<!--
 * new page
 * @author: ZhangXusen
 * @since: 2023-01-09
 * NavMenu.vue
-->
<template>
  <div class="sidebar">
    <div class="logo">
      <img src="@/assets/images/logo.svg" alt="" />
      <h2 v-show="!isFold">XS-CMS</h2>
    </div>
    <div class="menu">
      <el-menu
        :default-active="defaultActive"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        :collapse="isFold"
      >
        <template v-for="item in userMenu" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('el-icon-')[1]"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleItemClick(subitem.url)"
                >{{ subitem.name }}</el-menu-item
              >
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from "@/stores/login/login";
import { localCache } from "@/utils/local";
import { firstMenu } from "@/utils/map-menu";
import { Message, ShoppingBag, type Monitor } from "@element-plus/icons-vue";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
defineProps({
  isFold: {
    type: Boolean,
    default: false,
  },
});
const loginStore = useLoginStore();
const userMenu = loginStore.userMenu;
const route = useRoute();

const defaultActive = computed(() => {
  return userMenu.id + "";
});
const router = useRouter();
function handleItemClick(url: string) {
  router.push(url);
}
</script>

<style scoped lang="scss">
.sidebar {
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    img {
      height: 100%;
      margin: 0 10px;
    }
    h2 {
      font-style: 16px;
      font-weight: 700;
      color: #fff;
    }
  }
  .menu {
    .el-menu {
      border-right: none;
      user-select: none;
      .el-sub-menu {
        .el-menu-item {
          padding-left: 50px !important;
          background-color: #0c2135;
        }
        .el-menu-item:hover {
          color: #fff;
        }
        .el-menu-item.is-active {
          background-color: #0a60bd;
        }
      }
    }
  }
}
</style>
