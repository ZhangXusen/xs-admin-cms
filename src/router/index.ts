import { localCache } from "@/utils/local";
import { firstMenu } from "@/utils/map-menu";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    //404
    {
      path: "/:pathMatch(.*)",
      component: () => import("../views/NotFound/index.vue"),
    },
    {
      path: "/login",
      component: () => import("../views/login/login.vue"),
    },
    {
      path: "/main",
      name: "main",
      component: () => import("../views/main/Main.vue"),
    },
  ],
});

router.beforeEach((to) => {
  if (to.path.startsWith("/main") && !localCache.getCatch("token")) {
    return "/login";
  }

  if (to.path === "/main") {
    return firstMenu?.url;
  }
});

export default router;
