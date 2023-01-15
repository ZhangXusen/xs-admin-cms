import { createPinia } from "pinia";
import type { App } from "vue";
import useLoginStore from "./login/login";
const pinia = createPinia();
function registerStore(app: App<Element>) {
  app.use(pinia);
  const loginStore = useLoginStore();
  //pinia加载完后将本地数据都挂载到pinia上
  loginStore.loadLocalData();
  //再加载路由
}

export default registerStore;
