export function getPermissionInMenus(MenuList: any) {
  const permissions: string[] = [];
  function getPermissions(Menus: any[]) {
    for (const item of Menus) {
      if (item.type === 3) {
        permissions.push(item.permission);
      } else {
        getPermissions(item.children ?? []);
      }
    }
  }
  getPermissions(MenuList);
  return permissions;
}
