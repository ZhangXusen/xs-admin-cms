import hyRequest from "..";

export function postUserListData(queryInfo: any) {
  return hyRequest.post({
    url: "/users/list",
    data: queryInfo,
  });
}

export function deleteUserData(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`,
  });
}

export function createUserData(UserInfo: any) {
  return hyRequest.post({
    url: "/users",
    data: UserInfo,
  });
}

export function updateUserData(id: number, userInfo: any) {
  return hyRequest.patch({
    url: `/users/${id}`,
    data: userInfo,
  });
}

//部门
export function getDeptListData() {
  return hyRequest.post({
    url: "/department/list",
  });
}

export function postDeptListData(deptInfo: any) {
  return hyRequest.post({
    url: "/department/list",
    data: deptInfo,
  });
}

export function deleteDeptData(id: number) {
  return hyRequest.delete({
    url: `/department/${id}`,
  });
}

export function updateDeptData(id: number, deptInfo: any) {
  return hyRequest.patch({
    url: `/departments/${id}`,
    data: deptInfo,
  });
}

export function createDeptData(deptInfo: any) {
  return hyRequest.post({
    url: "/department",
    data: deptInfo,
  });
}
//角色

export function getRoleListData() {
  return hyRequest.post({
    url: "/role/list",
  });
}

export function postRoleListData(roleInfo: any) {
  return hyRequest.post({
    url: "/role/list",
    data: roleInfo,
  });
}

export function deleteRoleData(id: number) {
  return hyRequest.delete({
    url: `/role/${id}`,
  });
}

export function updateRoleData(id: number, roleInfo: any) {
  return hyRequest.patch({
    url: `/role/${id}`,
    data: roleInfo,
  });
}

export function createRoleData(roleInfo: any) {
  return hyRequest.post({
    url: "/role",
    data: roleInfo,
  });
}
//菜单

export function getMenuListData() {
  return hyRequest.post({
    url: "/menu/list",
  });
}

export function postMenuListData(menuInfo: any) {
  return hyRequest.post({
    url: "/menu/list",
    data: menuInfo,
  });
}

export function deleteMenusData(id: number) {
  return hyRequest.delete({
    url: `/menu/${id}`,
  });
}

export function updateMenuData(id: number, menuInfo: any) {
  return hyRequest.patch({
    url: `/menu/${id}`,
    data: menuInfo,
  });
}

export function createMenuData(menuInfo: any) {
  return hyRequest.post({
    url: "/menu",
    data: menuInfo,
  });
}

//通用
export function getPageListData(page: string) {
  return hyRequest.post({
    url: `/${page}/list`,
  });
}

export function postPageListData(page: string, query: any) {
  return hyRequest.post({
    url: `/${page}/list`,
    data: query,
  });
}

export function deletePageData(page: string, id: number) {
  return hyRequest.delete({
    url: `/${page}/${id}`,
  });
}

export function updatePageData(page: string, id: number, query: any) {
  return hyRequest.patch({
    url: `/${page}/${id}`,
    data: query,
  });
}

export function createPageData(page: string, query: any) {
  return hyRequest.post({
    url: `/${page}`,
    data: query,
  });
}
