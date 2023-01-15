import { createApp } from "vue";
import "normalize.css";
import "./assets/styles/index.scss";
import App from "./App.vue";
import router from "./router";
import pinia from "./stores";
// import ElementPlus from 'element-plus'
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import useLoginStore from "./stores/login/login";
import registerStore from "./stores";

const app = createApp(App);

app.use(registerStore);

app.use(router);
//app.use(ElementPlus);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");
