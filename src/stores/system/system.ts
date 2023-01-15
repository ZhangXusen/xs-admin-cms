import {
  createPageData,
  createUserData,
  deletePageData,
  deleteUserData,
  getPageListData,
  postPageListData,
  postUserListData,
  updatePageData,
  updateUserData,
} from "@/service/system/system";
import { ElMessage } from "element-plus";
import { defineStore } from "pinia";

const useSystemStore = defineStore("system", {
  state: () => ({
    usersList: [],
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0,
  }),
  actions: {
    async postUserListAction(queryInfo: any) {
      const usersList = await postUserListData(queryInfo);
      const { totalCount, list } = usersList.data;
      this.usersList = list;
      this.usersTotalCount = totalCount;
    },
    async deleteUserListAction(id: number) {
      const deleteRes = await deleteUserData(id);
      this.postUserListAction({ offset: 0, size: 10 });
    },
    async createUserDataAction(UserInfo: any) {
      const createRes = await createUserData(UserInfo);
      this.postUserListAction({ offset: 0, size: 10 });
    },
    async updateUserDataAction(id: number, UserInfo: any) {
      const editRes = await updateUserData(id, UserInfo);
      console.log(editRes.data);
      this.postUserListAction({ offset: 0, size: 10 });
    },

    //根据页面写请求
    //获取所有数据
    async getPageListDataAction(page: string) {
      const pageRes = await getPageListData(page);
      this.pageList = pageRes.data;
    },
    async postPageListDataAction(page: string, query: any) {
      const pageRes = await postPageListData(page, query);
      const { totalCount, list } = pageRes.data;
      this.pageList = list;
      this.pageTotalCount = totalCount;
    },

    async deletePageListDataAction(page: string, id: number) {
      const deleteRes = await deletePageData(page, id);
      console.log("删除结果", deleteRes);
      this.postPageListDataAction(page, { offset: 0, size: 10 });
    },
    async createPageListDataAction(page: string, query: any) {
      const createRes = await createPageData(page, query);
      console.log("新建结果", createRes);
      this.postPageListDataAction(page, { offset: 0, size: 10 });
    },
    async updatePageListDataAction(page: string, id: number, query: any) {
      const updateRes = await updatePageData(page, id, query);
      console.log("更新结果", updateRes);
      this.postPageListDataAction(page, { offset: 0, size: 10 });
    },
  },
});
export default useSystemStore;
