import router from "@/router";
import {
  accountLogin,
  getUserInfo,
  getUserMenuByRoleID,
} from "@/service/loginService/login";
import type { LoginInfo, LoginState } from "@/types";
import { getPermissionInMenus } from "@/utils/getPermissionInMenus";
import { localCache } from "@/utils/local";
import { mapMenuToRoutes } from "@/utils/map-menu";
import { defineStore } from "pinia";
import type { RouteRecordRaw } from "vue-router";
import useMainStore from "../main/main";

const useLoginStore = defineStore("login", {
  state: (): LoginState => ({
    token: localCache.getCatch("token") ?? "",
    userInfo: localCache.getCatch("userInfo") ?? {},
    userMenu: localCache.getCatch("userMenus") ?? {},
    permissions: localCache.getCatch("permissions") ?? [],
  }),
  actions: {
    async loginAction(account: LoginInfo) {
      const loginRes = await accountLogin(account);
      console.log(loginRes);
      const id = loginRes.data.id;

      this.token = loginRes.data.token;
      localCache.setCatch("token", this.token);

      const userInfoRes = await getUserInfo(id);
      const userInfo = userInfoRes.data;
      console.log(this.userInfo);
      const userMenuRes = await getUserMenuByRoleID(this.userInfo.role.id);
      const userMenu = userMenuRes.data;
      console.log(this.userMenu);

      //过滤，获取按钮权限
      const permissionsRes = getPermissionInMenus(userMenu);
      this.permissions = permissionsRes;

      //本地缓存
      localCache.setCatch("userInfo", userInfo);
      localCache.setCatch("userMenus", userMenu);
      mapMenuToRoutes(userMenu);
      router.push("/main");
    },
    //加载本地的数据(路由，token，信息)
    async loadLocalData() {
      const token = localCache.getCatch("token");
      const userInfo = localCache.getCatch("userInfo");
      const userMenus = localCache.getCatch("userMenus");

      const mainStore = useMainStore();
      mainStore.fetchRolesDeptsDataAction();

      if (token && userInfo && userMenus) {
        //当前为登录状态
        this.token = token;
        this.userInfo = userInfo;
        this.userMenu = userMenus;
        const mainStore = useMainStore();
        mainStore.fetchRolesDeptsDataAction();

        //获取按钮权限
        const permissionsRes = getPermissionInMenus(userMenus);
        this.permissions = permissionsRes;

        //动态添加路由
        mapMenuToRoutes(userMenus);
      }
    },
  },
});

export default useLoginStore;
