import useLoginStore from "@/stores/login/login";

export function usePermissions(permissionId: string) {
  //获取对应增删改查的权限
  const loginStore = useLoginStore();
  const { permissions } = loginStore;
  return Boolean(permissions.find((item: any) => item.includes(permissionId)));
}
