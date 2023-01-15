import {
  getDeptListData,
  getRoleListData,
  getMenuListData,
} from "@/service/system/system";
import { defineStore } from "pinia";

const useMainStore = defineStore("main", {
  state: () => ({
    Roles: [],
    Depts: [],
    Menus: [],
  }),
  actions: {
    async fetchRolesDeptsDataAction() {
      const rolesRes = await getRoleListData();
      const deptsRes = await getDeptListData();
      const menusRes = await getMenuListData();
      this.Roles = rolesRes.data.list;
      this.Depts = deptsRes.data.list;
      this.Menus = menusRes.data.list;
    },
  },
});
export default useMainStore;
