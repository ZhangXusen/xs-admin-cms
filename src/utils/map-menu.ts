import router from "@/router";
import type { RouteRecordRaw } from "vue-router";

export let firstMenu: any = null;

export function mapMenuToRoutes(userMenu: any[]) {
  //动态添加路由
  const localRoutes: RouteRecordRaw[] = [];
  // 1.读取router/main里所有文件
  const routeFiles: Record<string, any> = import.meta.glob(
    "../router/**/*.ts",
    {
      eager: true,
    }
  );
  // console.log("文件里的路由", routeFiles);
  //2.放入localRoute
  for (const key in routeFiles) {
    const module = routeFiles[key];
    localRoutes.push(module.default);
  }
  console.log("本地注册的路由", localRoutes);
  //3.
  for (const menu of userMenu) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url);
      if (route) {
        router.addRoute({ path: menu.url, redirect: menu.children[0].url });
        router.addRoute("main", route);
        if (!firstMenu) {
          firstMenu = submenu;
        }
      }
    }
  }
}

export function mapPathToBread(path: string, userMenu: any[]) {
  const Bread: any[] = [];
  for (const menu of userMenu) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        Bread.push({ name: menu.name, path: menu.url });
        Bread.push({ name: submenu.name, path: submenu.url });
      }
    }
  }
  return Bread;
}
